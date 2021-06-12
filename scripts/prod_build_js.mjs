import fs from "node:fs/promises";

const SIMPLE_REEXPORT_MODULE =
  /^export\{[^}]+\}from"([^"]+)";\n\/\/# sourceMappingURL=\S+\n?$/;

export default (JSFiles, normalizeRelativeUrl) =>
  Promise.all(
    JSFiles.map(({ url }) =>
      fs.readFile(url, "utf8").then((jsModule) => {
        const result = SIMPLE_REEXPORT_MODULE.exec(jsModule);
        return result === null
          ? jsModule
          : `import${JSON.stringify(normalizeRelativeUrl(result[1], url))}`;
      })
    )
  ).then(
    (jsModules) => `<script type="module">${jsModules.join(";")}</script>`
  );
