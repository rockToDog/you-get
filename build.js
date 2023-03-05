import esbuild from "esbuild";

import config from "./you-get.config.js";

const getBanner = (config) => {
  const formatLine = (key, val) =>
    `// @${key}${" ".repeat(20 - key.length)}${val}`;
  const res = Object.entries(config).reduce(
    (arr, [key, val]) => {
      if (Array.isArray(val)) {
        arr.push(...val.map((val) => `${formatLine(key, val)}`));
      } else {
        arr.push(formatLine(key, val));
      }
      return arr;
    },
    [`// ==UserScript==`]
  );
  res.push("// ==/UserScript==");
  return res.join("\n");
};

esbuild.buildSync({
  entryPoints: ["src/index.js"],
  banner: {
    js: getBanner(config),
  },
  bundle: true,
  outfile: "you-get.js",
});
