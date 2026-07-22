import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the tax explainer", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Where My Tax Dollars Go<\/title>/i);
  assert.match(html, /Why are my taxes/);
  assert.match(html, /Build your tax receipt/);
  assert.match(html, /Follow the money/);
  assert.match(html, /Obligated/);
  assert.match(html, /Budget \/ contract value/);
  assert.match(html, /FY2024 OMB actual outlay/);
  assert.match(html, /Medicare/);
  assert.match(html, /Medi-Cal/);
  assert.match(html, /Primary sources/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("publishes privacy and estimate limitations", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /answers stay on this device/i);
  assert.match(html, /Educational estimate only/i);
  assert.match(html, /not affiliated with or endorsed by any government agency/i);
  assert.match(html, /not a literal tracing of your payment/i);
  assert.match(html, /not legal earmarks/i);
});

test("joint-mode copy declares allocation and input limitations", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /Mixed W-2\/self-employed households are not supported/i);
  assert.match(source, /uses wages as an AGI proxy/i);
  assert.match(source, /recomputes one household return using joint brackets, deductions, and credits/i);
});
