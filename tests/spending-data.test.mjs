import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = fs.readFileSync(new URL("../app/spending-data.ts", import.meta.url), "utf8");
const javascript = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { spendingLayers, moneyStatusLabels } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);

function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

function find(root, id) {
  let match;
  walk(root, node => { if (node.id === id) match = node; });
  return match;
}

test("complete spending child sets reconcile to their declared parent", () => {
  for (const root of Object.values(spendingLayers)) {
    walk(root, node => {
      if (!node.children?.length || (node.childrenCoverage ?? "complete") !== "complete") return;
      const childrenTotal = node.children.reduce((sum, child) => sum + (child.amount ?? 0), 0);
      assert.equal(childrenTotal, node.amount, `${node.id} must reconcile or declare context/partial coverage`);
    });
  }
});

test("mixed-basis and partial child sets declare why percentages are suppressed", () => {
  for (const root of Object.values(spendingLayers)) {
    walk(root, node => {
      if (node.childrenCoverage === "context" || node.childrenCoverage === "partial") {
        assert.ok(node.coverageNote, `${node.id} needs a coverage note`);
      }
    });
  }
  assert.equal(find(spendingLayers.federal, "medicare").childrenCoverage, "context");
  assert.equal(find(spendingLayers.state, "ca-hhs").childrenCoverage, "context");
  assert.equal(find(spendingLayers.state, "ca-corrections").childrenCoverage, "partial");
});

test("contractor examples remain only at the source-supported agency level", () => {
  assert.ok(find(spendingLayers.federal, "defense").payments?.length);
  assert.equal(find(spendingLayers.federal, "procurement").payments, undefined);
  assert.ok(find(spendingLayers.state, "ca-hhs").payments?.length);
  assert.equal(find(spendingLayers.state, "medi-cal").payments, undefined);
});

test("reported zero actual expenditure has a distinct status", () => {
  const health = find(spendingLayers.county, "scvh");
  const zeroActual = health.payments.find(record => record.amount === 0);
  assert.equal(zeroActual.status, "reported-actual-expenditure");
  assert.equal(moneyStatusLabels[zeroActual.status], "Reported actual expenditure");
});
