// Client-only (CSR) entry for the static build.
//
// vinext ships an RSC/hydration entry that fetches an RSC payload from a live
// server on boot — impossible on a static host. This entry instead mounts the
// existing client component tree directly with createRoot, no server, no RSC.
// `app/page.tsx` is already `"use client"` and computes everything in-browser,
// so it renders and stays fully interactive as pure CSR.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";

// Same stylesheets the vinext layout imports, in the same cascade order.
import "../app/globals.css";
import "../app/sources.css";
import "../app/a11y.css";
import "../app/drilldown.css";
import "../app/spouse.css";

const container = document.getElementById("app");
if (!container) {
  throw new Error("Static entry: #app container not found");
}
createRoot(container).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
