import fs from "node:fs/promises";
import postcss from "postcss";
import cssnano from "cssnano";

export default (CSSFiles) =>
  Promise.all(CSSFiles.map(({ url }) => fs.readFile(url, "utf8")))
    .then((cssStrings) =>
      postcss([cssnano({ preset: ["default"] })]).process(
        cssStrings.join("\n"),
        { from: undefined, map: { annotation: false } }
      )
    )
    .then((result) => `<style>${result.css}</style>`);
