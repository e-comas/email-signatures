import svelte from "rollup-plugin-svelte";
// import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import url from "@rollup/plugin-url";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const production = !process.env.ROLLUP_WATCH;

// @aduh95/format-phone-number fetches one JSON file per country code at
// runtime, relative to import.meta.url. That breaks in the production
// build, where the whole bundle is inlined into index.html:
// import.meta.url then points at the HTML document, so the data files
// (served under /build/data/) are requested from the site root and 404.
// Inline the data into the bundle instead so no runtime fetch is needed.
function inlinePhoneData() {
  const dataDir = path.join(
    __dirname,
    "node_modules",
    "@aduh95/format-phone-number",
    "data"
  );
  const entries = readdirSync(dataDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) =>
      `${JSON.stringify(file.replace(/\.json$/, ""))}: ${readFileSync(
        path.join(dataDir, file),
        "utf8"
      )}`
    );
  return {
    name: "inline-phone-data",
    resolveId(source) {
      if (source === "@aduh95/format-phone-number/getCountryData") {
        return "\0inline-phone-data";
      }
    },
    load(id) {
      if (id !== "\0inline-phone-data") return;
      return `const data = { ${entries.join(", ")} };\nexport default (countryCode) => data[countryCode];\n`;
    },
  };
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;

      // Find sirv's CLI script directly (bin.js in sirv 2.x, cli.js in 1.x)
      // and run it with node — avoids the .bin shims that break on Windows.
      const fs = require("fs");
      const path = require("path");
      const sirvDir = path.join(__dirname, "node_modules", "sirv-cli");
      const sirvCli = ["bin.js", "cli.js"]
        .map((name) => path.join(sirvDir, name))
        .find((p) => fs.existsSync(p));

      if (!sirvCli) {
        throw new Error(
          `Could not find sirv CLI in ${sirvDir} (looked for bin.js and cli.js)`
        );
      }

      server = require("child_process").spawn(
        process.argv0,
        [sirvCli, "--dev", "public"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: false,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "es",
    name: "app",
    dir: "public/build/",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),
    json(),

    inlinePhoneData(),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    url({
      include: "**/*.wasm",
      publicPath: "build/",
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
