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

test("official release totals and top-level spending values remain source-backed", () => {
  assert.deepEqual(
    spendingLayers.federal.children.map(({ id, amount }) => [id, amount]),
    [
      ["ss", 1_460_918_000_000], ["medicare", 874_133_000_000], ["interest", 879_879_000_000],
      ["defense", 873_523_000_000], ["health", 911_290_000_000], ["income", 670_548_000_000],
      ["veterans", 325_645_000_000], ["education", 306_370_000_000], ["transport", 136_582_000_000],
      ["other", 296_373_000_000],
    ],
  );
  assert.equal(spendingLayers.federal.amount, 6_735_261_000_000);

  assert.deepEqual(
    spendingLayers.state.children.map(({ id, amount }) => [id, amount]),
    [
      ["ca-hhs", 132_875_970_000], ["ca-k12", 82_151_357_000], ["ca-higher", 23_455_629_000],
      ["ca-transport", 19_810_046_000], ["ca-corrections", 17_515_888_000], ["ca-gov", 17_177_676_000],
      ["ca-courts", 10_813_274_000], ["ca-natural", 7_972_246_000], ["ca-housing", 9_278_395_000],
    ],
  );
  assert.equal(spendingLayers.state.amount, 321_050_481_000);

  assert.deepEqual(
    spendingLayers.county.children.map(({ id, amount }) => [id, amount]),
    [
      ["scc-health", 7_125_878_095], ["scc-finance", 2_750_431_233], ["scc-families", 1_376_597_543],
      ["scc-safety", 1_177_596_302], ["scc-land", 612_837_192],
    ],
  );
  assert.equal(spendingLayers.county.amount, 13_043_340_365);
});
