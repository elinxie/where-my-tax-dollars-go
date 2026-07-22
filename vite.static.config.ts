// Standalone static (CSR) build — no vinext, no Cloudflare, no OpenAI.
// Produces a plain client-rendered SPA in dist-static/ that any static host
// (GitHub Pages, etc.) can serve. This is the agent-agnostic build path.

import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // publicDir defaults to "public" → favicon/og/svg assets copied to dist-static.
  build: {
    outDir: "dist-static",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(process.cwd(), "static.html"),
    },
  },
});
