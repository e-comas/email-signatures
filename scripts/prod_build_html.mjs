#!/usr/bin/env node
import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import readline from "node:readline";

import inlineCSS from "./prod_build_css.mjs";
import inlineJS from "./prod_build_js.mjs";

const INPUT_FOLDER = new URL("../public/", import.meta.url);
const OUTPUT_FOLDER = new URL("../build/", import.meta.url);
const HTML_INDEX = new URL("./index.html", INPUT_FOLDER);

const NON_SUPPORTED_LINE_WITH_MULTIPLE_DEF =
  /\<(link|script)[^>]+>.*\<(link|script)[^>]+>.*/;
const CSS_FILE = /\<link rel="stylesheet" href="([^"]+)"[^/>]*\/?>/;
const NON_SUPPORTED_CSS_LINK = /\<link[^>]+rel="stylesheet"[^/>]*\/?>/;
const JS_FILE = /\<script defer src="([^"]+)" type="module"[^/>]*><\/script>/;
const NON_SUPPORTED_JS_LINK = /\<script[^>]+type="module"[^/>]*\/?>/;
const END_OF_HEAD_TAG = /\<\/head>/i;

function normalizeRelativeUrl(url, base) {
  const fullUrl = new URL(url, base);
  return "./" + fullUrl.pathname.slice(INPUT_FOLDER.pathname.length);
}

await fs.rm(OUTPUT_FOLDER, { force: true, recursive: true });
await fs.mkdir(OUTPUT_FOLDER);

const input = await createReadStream(HTML_INDEX);
const output = await createWriteStream(new URL("./index.html", OUTPUT_FOLDER));

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});

const CSSFiles = [];
const JSFiles = [];

let lineNb = 0;
for await (const line of rl) {
  lineNb++;
  let result;
  if (NON_SUPPORTED_LINE_WITH_MULTIPLE_DEF.test(line)) {
    throw new Error(
      `Unsupported syntax at line ${lineNb}: this tool supports only one tag per line`
    );
  } else if ((result = CSS_FILE.exec(line))) {
    CSSFiles.push({
      url: new URL(`./${result[1]}`, INPUT_FOLDER),
      column: result.index,
      lineNb,
    });
  } else if (NON_SUPPORTED_CSS_LINK.test(line)) {
    throw new Error(`Unsupported CSS link at line ${lineNb}`);
  } else if ((result = JS_FILE.exec(line))) {
    JSFiles.push({
      url: new URL(`./${result[1]}`, INPUT_FOLDER),
      column: result.index,
      lineNb,
    });
  } else if (NON_SUPPORTED_JS_LINK.test(line)) {
    throw new Error(`Unsupported JS module tag at line ${lineNb}`);
  } else if (END_OF_HEAD_TAG.test(line)) {
    output.write(await inlineCSS(CSSFiles));
    Object.freeze(CSSFiles);
    output.write("\n");
    output.write(await inlineJS(JSFiles, normalizeRelativeUrl));
    Object.freeze(JSFiles);
    output.write("\n");
    output.write(line);
    output.write("\n");
  } else {
    output.write(line);
    output.write("\n");
  }
}

console.log({ CSSFiles, JSFiles });
const getURL = ({ url }) => url;
const alreadyCopiedFiles = [
  HTML_INDEX,
  ...CSSFiles.map(getURL),
  ...JSFiles.map(getURL),
];

const recursiveFileCopy = async (inputDirUrl, outputDirUrl) => {
  const dir = await fs.opendir(inputDirUrl);
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      const inputUrl = new URL(`./${dirent.name}/`, inputDirUrl);
      const outputUrl = new URL(`./${dirent.name}/`, outputDirUrl);
      await fs.mkdir(outputUrl);
      await recursiveFileCopy(inputUrl, outputUrl);
    } else {
      const inputUrl = new URL(`./${dirent.name}`, inputDirUrl);
      if (
        alreadyCopiedFiles.every((url) => url.pathname !== inputUrl.pathname)
      ) {
        const outputUrl = new URL(`./${dirent.name}`, outputDirUrl);
        await fs.copyFile(inputUrl, outputUrl);
      }
    }
  }
};
await recursiveFileCopy(INPUT_FOLDER, OUTPUT_FOLDER);
