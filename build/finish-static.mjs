// Post-processes the static build so it is servable as a GitHub Pages site:
// - renames static.html -> index.html (Vite emits the input's basename)
// - writes 404.html (mirrors index.html so deep links resolve)
// - writes .nojekyll (so _-prefixed asset folders are served)

import { existsSync, renameSync, copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve("dist-static");
const built = resolve(out, "static.html");
const index = resolve(out, "index.html");

if (!existsSync(built) && !existsSync(index)) {
  console.error("[finish-static] Neither dist-static/static.html nor index.html exists. Did the build run?");
  process.exit(1);
}
if (existsSync(built)) renameSync(built, index);
copyFileSync(index, resolve(out, "404.html"));
writeFileSync(resolve(out, ".nojekyll"), "");
console.log("[finish-static] Wrote dist-static/index.html, 404.html, .nojekyll");
