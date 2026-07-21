import assert from "node:assert/strict";
import test from "node:test";
import { calculateEstimate } from "../app/tax-estimator.mjs";

const defaults = { dependents: 0, spouseWages: 0, employer: "private", housing: "rent", propertyTax: 0 };

test("single-filer calculation has no spouse allocation", () => {
  const result = calculateEstimate({ ...defaults, income: 140000, status: "single" });
  assert.equal(result.spouse.total, 0);
  assert.equal(result.user.total, result.total);
});

test("one-income joint return allocates the whole burden to the earner", () => {
  const result = calculateEstimate({ ...defaults, income: 140000, status: "joint" });
  assert.equal(result.spouse.total, 0);
  assert.equal(result.user.total, result.total);
  assert.ok(result.total < calculateEstimate({ ...defaults, income: 140000, status: "single" }).total);
});

test("two-income joint allocations reconcile to every household component", () => {
  const result = calculateEstimate({ ...defaults, income: 240000, spouseWages: 90000, status: "joint", housing: "own", propertyTax: 12000 });
  for (const component of ["fed", "ca", "payroll", "property", "total"]) {
    assert.ok(Math.abs(result.user[component] + result.spouse[component] - result[component]) < 1e-8, `${component} should reconcile`);
  }
  assert.equal(result.user.income + result.spouse.income, result.householdIncome);
});

test("each worker receives a separate Social Security wage cap", () => {
  const oneEarner = calculateEstimate({ ...defaults, income: 300000, status: "joint" });
  const twoEarners = calculateEstimate({ ...defaults, income: 300000, spouseWages: 150000, status: "joint" });
  assert.ok(twoEarners.payroll > oneEarner.payroll);
});

