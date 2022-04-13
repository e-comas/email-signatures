import { createInterface } from "readline";
import TOML from "@aduh95/toml";
import phone from "phone";

const info = ["Name", "Title", "Mail", "Phone"];
const urls = ["LinkedIn", "Medium", "YouTube", "Twitter"];

const garbageLines = [];

const users = {};
let currentUser = { url: {} };
for await (const line of createInterface({ input: process.stdin })) {
  if (line === "") {
    currentUser = { url: {} };
    continue;
  }
  if (line.startsWith("Mail:") && !line.endsWith("xxx@e-comas.com")) {
    users[line.substring(line.indexOf(":") + 1).trim()] = currentUser;
    continue;
  }
  if (line.startsWith("Phone:")) {
    currentUser["Phone"] = phone(line.substring(line.indexOf(":") + 1).trim());
    continue;
  }
  const lineInfo = info.find((info) => line.startsWith(`${info}:`));
  if (lineInfo) {
    currentUser[lineInfo] = line.substring(line.indexOf(":") + 1).trim();
    continue;
  }
  const lineURL =
    urls.find((info) => line.startsWith(`${info}:`)) ||
    (line.startsWith("Youtube:") && "YouTube") ||
    (line.startsWith("Linkedin:") && "LinkedIn");
  if (lineURL) {
    currentUser.url[lineURL] = line.substring(line.indexOf(":") + 1).trim();
    continue;
  }
  garbageLines.push(line);
}

function* betterStringify(obj) {
  const toml = TOML.stringify(obj).split("\n");

  const NORMAL = Symbol("normal mode");
  const URL = Symbol("url mode");

  yield "# This file was autogenerated by signature.e-comas.com.";
  yield "# Please refrain from modifying this document.";

  let mode = NORMAL;
  for (const line of toml) {
    if (line === "") {
      mode = NORMAL;
      continue;
    }
    if (line.endsWith(".url]")) {
      mode = URL;
      continue;
    } else if (line[0] === "[") {
      yield ""; // empty line to separate sections
    }
    switch (mode) {
      case URL:
        yield "url." + line;
        break;

      case NORMAL:
        yield line;
    }
  }
}

process.stdout.write(Array.from(betterStringify(users)).join("\n"));