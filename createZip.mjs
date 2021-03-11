#!/usr/bin/env node
import { execFileSync } from "child_process";
import { statSync } from "fs";
import { createInterface } from "readline";

const [, , template, pictureFile] = process.argv;

if (!template?.endsWith(".html")) {
  throw new Error("Please provide a .html file as first parameter");
}

const { size } = statSync(pictureFile);
if (size > 16 << 10) {
  throw new Error(`Picture file is too big (expected ≤16 kiB, got ${size})`);
}

const pictureInfo = execFileSync("/usr/bin/file", [pictureFile]).toString(
  "utf8"
);
if (!/JPEG image data/.test(pictureInfo)) {
  throw new Error("Please provide a JPEG image as second parameter");
}
const [IMG_WIDTH, IMG_HEIGHT] = pictureInfo
  .split(",")[7]
  .split("x")
  .map(Number);
if (IMG_HEIGHT !== 210) {
  throw new Error(
    `The picture file should have a height of 210px, got ${IMG_WIDTH}x${IMG_HEIGHT}`
  );
}

const info = ["Name", "Title", "Mail", "Phone", "LinkedIn"];

const replacements = {
  IMG_HEIGHT: 105,
  IMG_WIDTH: IMG_WIDTH / 2,
};

console.error("Paste in the filled up template and end with Ctrl+D:");

let surname;
for await (const line of createInterface({ input: process.stdin })) {
  if (!surname) {
    surname = line.trim().replaceAll(/\s/g, "-").toLowerCase();
    replacements["SURNAME"] = surname;
  }
  const lineInfo = info.find((info) => line.startsWith(`${info}:`));
  if (lineInfo) {
    replacements[lineInfo.toUpperCase()] = line
      .substring(line.indexOf(":") + 1)
      .trim();
  }
}

if ("PHONE" in replacements) {
  replacements["PHONE_NO_SPACES"] = replacements.PHONE.replace(/\s/g, "");
}

process.stdout.write(`mv "${pictureFile}" ${surname}.jpg\n`);
process.stdout.write(
  `sed '${Object.entries(replacements)
    .map(([search, replace]) => `s|{{ ${search} }}|${replace}|g`)
    .join(";")}' ${template} > ${surname}.html\n`
);
process.stdout.write(`zip ${surname}.zip ${surname}.html ${surname}.jpg\n`);
process.stdout.write(`echo "Zipped as ${surname}.zip"\n`);
