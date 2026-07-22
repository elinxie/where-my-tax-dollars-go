# 2025 source-freshness audit

Audit date: 2026-07-21

Release audited: `2025.1.0`

Scope: the currently implemented federal and California estimator plus the federal FY2024, California FY2025-26, and Santa Clara County FY2025-26 spending views.
Method: primary U.S., California, and Santa Clara County sources only. Values were compared to `app/tax-estimator.mjs` and `app/spending-data.ts`; this report does not authorize a correction or publication.

All linked official sources and mutable datasets were accessed 2026-07-21 unless a row states otherwise.

## Result

- The published bracket endpoints, standard deductions, nominal credit amounts, payroll rates/caps, and spending values all transcribe or derive correctly from the cited primary tables.
- Two confirmed calculation mismatches remain: the estimator does not use the mandatory federal and California tax tables in their applicable income ranges, and it does not phase down California exemption credits above the 2025 AGI thresholds.
- One source-inventory mismatch remains: `SOURCES.md` attributes the current federal standard deductions to Revenue Procedure 2024-40, whose original amounts were superseded for 2025. The app's amounts are correct, but the current Form 1040 instructions are the supporting source.
- No spending amount or accounting-status mismatch was found. All complete child sets and all three top-level totals reconcile exactly.

Confidence labels: **high** means an exact value was read from the named official table or a transparent sum/residual was recomputed; **medium** means a mutable official transaction/register snapshot matched on the access date.

## Federal estimator inventory

| Publisher; official title and URL | Year; exact location | Value in source | Value in app | Result; derivation; confidence |
|---|---|---|---|---|
| IRS; [Federal income tax rates and brackets](https://www.irs.gov/filing/federal-income-tax-rates-and-brackets) | Tax year 2025; filing-status tables | Single endpoints $11,925 / 48,475 / 103,350 / 197,300 / 250,525 / 626,350; joint $23,850 / 96,950 / 206,700 / 394,600 / 501,050 / 751,600; head $17,000 / 64,850 / 103,350 / 197,300 / 250,500 / 626,350; rates 10% / 12% / 22% / 24% / 32% / 35% / 37% | Exact same arrays | **Match**, direct transcription; high |
| IRS; [2025 Instructions for Form 1040 and 1040-SR](https://www.irs.gov/instructions/i1040gi) | Tax year 2025; Standard Deduction Chart, p. 12 | $15,750 single; $31,500 joint; $23,625 head | Same | **Match**, direct; high. `SOURCES.md` citation is stale/incomplete because Rev. Proc. 2024-40 shows the pre-legislation amounts. |
| IRS; [2025 Instructions for Schedule 8812](https://www.irs.gov/instructions/i1040s8) and [Schedule 8812](https://www.irs.gov/pub/irs-prior/f1040s8--2025.pdf) | Tax year 2025; Schedule 8812 p. 1, lines 4-14 and Credit Limit Worksheet | $2,200 per qualifying child under 17; phaseout begins $400,000 joint / $200,000 other, rounds excess up to the next $1,000 and reduces $50 per step; nonrefundable credit limited by tax | Same for supported inputs | **Match**, direct/equivalent formula; high. Refundable ACTC and other eligibility rules remain outside release scope. |
| Social Security Administration; [2025 EFW2 tax facts](https://www.ssa.gov/employer/efw/25efw2.pdf) | Tax year 2025; p. ii | Employee Social Security 6.2%; wage base $176,100; maximum $10,918.20 | 6.2% capped at $176,100 per worker | **Match**, direct; high |
| IRS; [2025 Instructions for Form 8959](https://www.irs.gov/instructions/i8959) | Tax year 2025; Additional Medicare Tax and threshold table | Medicare employee rate 1.45%; Additional Medicare 0.9% over $200,000 single/head and $250,000 joint | Same; joint threshold applies to combined wages | **Match** for supported statuses; high. Married filing separately is not offered by the UI. |

### Confirmed federal Tax Table mismatch

The 2025 Form 1040 instructions, line 16, require the Tax Table when taxable income is **less than $100,000** and the Tax Computation Worksheet at **$100,000 or more**. The app applies the continuous rate schedule at every income.

- Affected supported statuses: single, married filing jointly, and head of household.
- Potential wage/AGI-proxy range: taxable income $1-$99,999, corresponding to app income $15,751-$115,749 single, $31,501-$131,499 joint, and $23,626-$123,624 head. Not every dollar produces a different rounded result.
- Representative example: single wages $50,000 produce app taxable income $34,250 and pre-credit tax $3,871.50; the official $34,250-$34,300 Tax Table row is $3,875, a $3.50 understatement before display rounding.
- Maximum impact on whole-dollar taxable incomes found by comparing every official table row to the continuous calculation: **$6.00 absolute** for each supported status. Examples occur at taxable income $48,500 single, $96,950 joint, and $64,850 head, where the table exceeds the continuous result by $6.
- Interpretation: this is a **confirmed mismatch with the required 2025 filing calculation**, but not a representation that the product prepares a return. The UI repeatedly says “practical estimate,” “not a tax return,” and “not for filing or tax planning.” A rate-schedule approximation of at most $6 can be defensible for an educational estimate only if that approximation is explicitly disclosed; the current general disclaimer does not identify it.

## California estimator inventory

| Publisher; official title and URL | Year; exact location | Value in source | Value in app | Result; derivation; confidence |
|---|---|---|---|---|
| California Franchise Tax Board; [2025 Form 540 Personal Income Tax Booklet](https://www.ftb.ca.gov/forms/2025/2025-540-booklet.html) | Tax year 2025; Tax Rate Schedules X/Y/Z, p. 75 | Single endpoints 11,079 / 26,264 / 41,452 / 57,542 / 72,724 / 371,479 / 445,771 / 742,953; joint 22,158 / 52,528 / 82,904 / 115,084 / 145,448 / 742,958 / 891,542 / 1,485,906; head 22,173 / 52,530 / 67,716 / 83,805 / 98,990 / 505,208 / 606,251 / 1,010,417; rates 1% / 2% / 4% / 6% / 8% / 9.3% / 10.3% / 11.3% / 12.3% | Exact same arrays | **Match**, direct; high |
| California FTB; same booklet | Tax year 2025; Standard Deduction Worksheet, p. 13 | $5,706 single; $11,412 joint/head | Same | **Match**, direct; high |
| California FTB; [2025 Form 540](https://www.ftb.ca.gov/forms/2025/2025-540.pdf) and booklet | Tax year 2025; Form p. 2, lines 7-10 and booklet p. 14, line 32 | Personal exemption credit $153 each; dependent exemption credit $475 each | $153 single/head, $306 joint, plus $475 per dependent | Nominal values **match**; high. Phaseout does not; see below. |
| California FTB; same booklet | Tax year 2025; p. 17, line 62 | Behavioral Health Services Tax is 1% of taxable income above $1,000,000 | Same | **Match**, direct; high |
| California EDD; [Rates, withholding schedules, and meals and lodging values](https://edd.ca.gov/en/payroll_taxes/rates_and_withholding) | Calendar year 2025; SDI table | Employee SDI 1.2%; no taxable wage limit | Same | **Match**, direct; high |

### Confirmed California Tax Table mismatch

The 2025 Form 540 booklet, line 31, requires the California Tax Table when taxable income is **$100,000 or less** and the rate schedule only when taxable income is **over $100,000**. The app applies the continuous schedule at every income.

- Affected supported statuses: single, married filing jointly, and head of household.
- Potential wage/AGI-proxy range: taxable income $1-$100,000, corresponding to app income $5,707-$105,706 single and $11,413-$111,412 joint/head. Not every dollar differs after rounding.
- Representative example: single wages $50,000 produce taxable income $44,294. The official $44,251-$44,350 row is $1,193; the continuous schedule is $1,192.53, a $0.47 difference before the same exemption credit is applied.
- Conservative maximum absolute impact, derived from the 100-dollar table bands, whole-dollar rounding, and the highest marginal rate reached below $100,000: **no more than $5.15 single, $3.50 joint, or $5.15 head**. Direct row comparison observed approximately $5.09 single, $3.16 joint, and $5.13 head.
- Interpretation: this is a **confirmed mismatch with the required 2025 filing calculation**. As with the federal table, the small continuous-schedule approximation may be acceptable only as a disclosed educational simplification under the current “not a tax return” claim; it is not filing-accurate.

### Confirmed California exemption-credit phaseout mismatch

The booklet p. 14 AGI Limitation Worksheet requires:

1. If federal AGI exceeds $252,203 single, $504,411 joint, or $378,310 head, subtract the threshold.
2. Divide the excess by $2,500 and round up to the next whole number. (The $1,250 divisor is only for married filing separately, which the app does not support.)
3. Multiply the step count by $6.
4. Multiply that reduction by the number of personal/senior exemption boxes and separately by the number of dependents; subtract each from the corresponding credit, floored at zero.

The app instead grants the full nominal credits at every income. Boundary and impact examples:

| Supported status | Boundary result required by FTB | Current-app overstatement |
|---|---|---:|
| Single, no dependent | $252,203: no reduction; $252,204: one step, credit $147 | $0 at boundary; **$6** one dollar above |
| Joint, no dependent | $504,411: no reduction; $504,412: one step applied to two personal exemptions, credit $294 | $0 at boundary; **$12** one dollar above |
| Head, no dependent | $378,310: no reduction; $378,311: one step, credit $147 | $0 at boundary; **$6** one dollar above |
| Single, no dependent, AGI $300,000 | `ceil((300000-252203)/2500)=20`; $153-$120=$33 | **$120** |
| Single, one dependent, AGI $300,000 | Same 20 steps reduce both credit groups by $120; official total $388 vs app $628 | **$240** |

Within the UI's 12-dependent input cap, the maximum overstatement after full phaseout is **$5,853** for single/head (`153 + 12×475`) and **$6,006** joint (`306 + 12×475`). For zero dependents, the personal credit reaches zero at the first whole-dollar AGI of $314,704 single, $566,912 joint, and $440,811 head; dependent credits reach zero at $449,704, $701,912, and $575,811 respectively. This is material and not merely a rounding approximation.

## Spending inventory

All values below were accessed 2026-07-21. Amount maps use app IDs and nominal dollars unless marked billions.

| Publisher; official title and URL | Fiscal/calendar period; exact table/page | Source values and app values | Result; basis/derivation; confidence |
|---|---|---|---|
| U.S. OMB; [Historical Tables](https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/) and [Table 3.2 XLSX](https://www.whitehouse.gov/wp-content/uploads/2026/04/hist03z2_fy2027.xlsx) | FY2024 actual; Table 3.2 “Outlays by Function and Subfunction,” FY2024 column (millions) | Root 6,735,261; ss 1,460,918; medicare 874,133; interest 879,879; defense 873,523; health 911,290; income 670,548; veterans 325,645; education 306,370; transport 136,582; residual other 296,373. App is identical after ×$1m. | **Match**; actual outlay. Residual recomputed from the common denominator; high. Landing URL is moving, so the exact workbook version should be pinned in future manifests. |
| U.S. OMB; same Table 3.2 | FY2024 actual; relevant function/subfunction rows | Defense: 826,275 / 34,916 / 12,332; DOD: 332,047 / 191,947 / 152,259 / 137,959 / derived 12,063. Health: 854,342 / 50,647 / 6,301. Income: 210,867 / 179,924 / 149,146 / 70,008 / 38,278 / 22,325. Veterans: 161,312 / 138,543 / derived 25,790. Education: 161,032 / 105,373 / 25,166 / derived 14,799. Transport: 92,852 / 29,783 / 13,247 / 700. App identical after ×$1m. | **Match**; actual-outlay rows and transparent grouped sums; high |
| Social Security Administration; [Annual Statistical Supplement 2025 highlights](https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html) | CY2024; program highlights | OASI $1,316.4B; DI $155.0B | **Match**; gross cash-benefit context, deliberately not forced to reconcile to FY OMB; high |
| CMS; [2025 Medicare Trustees Report](https://www.cms.gov/oact/tr/2025) | CY2024; Table II.B1, printed p. 10 (PDF p. 16) | Part A $422.5B (benefits 416.3 + admin 6.2; private 192.5, hospital 144.4, SNF 28.5, home/other derived 50.8); Part B $553.4B (benefits 547.8 + admin 5.6; private 301.6, outpatient 80.5, physician 71.4, home/other derived 94.3); Part D $146.2B | **Match**; CY gross program expenditure, not OMB net FY outlay; high |
| USAspending.gov; award summaries and official award API | Lifetime-to-date snapshot 2026-07-21; awards N0001917C0001, FA862511C6600, N0002417C2117, HT940216C0001 | F-35 outlay $933,036,846.29 / obligation $35,135,514,910.20; KC-46 $271,607,247.33 / $31,972,918,249.03; Columbia $43,723,356.73 / $30,979,375,853; TRICARE obligation $51,269,205,263.03 and no usable award outlay. App identical. | **Match**; mutable snapshot. Outlay and obligation remain distinct; medium |
| California Department of Finance; [FY2025-26 Enacted Budget Detail](https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail) and [Schedule 1](https://ebudget.ca.gov/2025-26/pdf/Enacted/BudgetSummary/BS_SCH1.pdf) | FY2025-26 enacted; Expenditures by Agency—State Funds and Schedule 1 | Root $321,050,481,000 = GF 228,365,854,000 + special 88,798,621,000 + bond 3,886,006,000. HHS 132,875,970,000; K12 82,151,357,000; higher 23,455,629,000; transportation 19,810,046,000; corrections 17,515,888,000; government derived 17,177,676,000; courts 10,813,274,000; natural 7,972,246,000; housing/labor/environment derived 9,278,395,000. App identical. | **Match**; enacted state-funds budget authority, excluding federal funds/reimbursements and other non-state-fund context; high |
| California DOF; [HHS Budget Summary](https://ebudget.ca.gov/2025-26/pdf/Enacted/BudgetSummary/HealthandHumanServices.pdf) and enacted department Program Expenditures schedules for [DHCS](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4260.pdf), [DSS](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/5180.pdf), [DDS](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4300.pdf), [DPH](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4265.pdf), and [State Hospitals](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4440.pdf) | FY2025-26 enacted; HHS Summary p. 37 and each department's Program Expenditures schedule | Medi-Cal $196.700B; DHCS children 189.273 / 7.460 / 0.853; social 56.098 with 33.790 / 21.920 / 0.388; developmental 18.669 with 18.196 / 0.473; public health 5.209 with 1.931 / 1.676 / 1.602; state hospitals 3.111. App identical. | **Match**; broader all-funds context, not additive to the state-funds parent; high |
| California DOF; enacted Program Expenditures schedules for [Education](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6100.pdf), [UC](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6440.pdf), [CSU](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6610.pdf), [CCC](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6870.pdf), [Caltrans](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf), [CHP](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2720.pdf), [DMV](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2740.pdf), and [CDCR](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5225.pdf) | FY2025-26 enacted; each PDF's Program Expenditures schedule | K12 101.379 / 8.900 / 2.107 / 0.333; higher 56.220 / 12.950 / 14.248; Caltrans 18.742 with 6.137 / 3.684 / 2.516 / 1.985 / derived 4.420; CHP 3.479; DMV 1.481; CDCR selected 4.687 / 4.136 / 2.564 / 2.248. App identical. | **Match**; all-funds context/partial coverage is correctly marked and percentages suppressed; high |
| California State Controller; [Open FI$Cal expenditure downloads](https://open.fiscal.ca.gov/download-expenditures.html), [terms](https://open.fiscal.ca.gov/terms-of-use.html), and DHCS FY25 vendor CSV | FY2025-26 transactions through stated March 2026 cutoffs; net `monetary_amount` by exact vendor | AHP $303,364,643.13 (54 docs); Prime $118,778,973.29 (143); Amneal $31,312,800 (17); Deloitte $21,498,786.10 (254); BCG $9,240,000 (13). Current CSV and app identical. | **Match**; mutable raw, unaudited, unconsolidated posted-expenditure data. Not contract ceilings or confirmed settlement; medium |
| County of Santa Clara; [FY2025-26 Adopted Budget](https://files.santaclaracounty.gov/exjcpb1271/2025-10/fiscal-year-2025-2026-adopted-budget_1.pdf) | FY2025-26 adopted; Funds Summary p. 24 and “Estimated Revenue and Appropriation for Expenditures by Budget Unit,” pp. 30-32 | Gross $13,670,954,996; reimbursements -$627,614,631; **net $13,043,340,365**; revenue $12,606,174,958; net cost $437,165,407. Top branches 7,125,878,095 / 2,750,431,233 / 1,376,597,543 / 1,177,596,302 / 612,837,192. Every displayed unit/residual in the app matches pp. 30-32 and each complete set reconciles. | **Match**; adopted net expenditure/budget authority, not actual expenditure. The app correctly prevents personal allocation; high |
| County of Santa Clara; [December 2025 Active Service Agreements and Board Contracts](https://files.santaclaracounty.gov/exjcpb1596/2026-02/official-sa-bc-report-for-month-of-december-2025_0.pdf) | December 2025 register; Momentum/Telecare p. 18, Rebekah p. 21, Motorola row for unit 230 | Momentum PO 4300024114 $63,579,299; Telecare 4300024279 $20,355,000; Rebekah 4300018124 $18,522,000; Motorola 4300008740 $1,505,832.67. App identical. | **Match**; active PO/contract values, not paid amounts; medium |
| County of Santa Clara Board of Supervisors Management Audit Division; [Review of FY2025-26 Recommended Budget](https://files.santaclaracounty.gov/exjcpb1666/2025-05/management-audit-division-review-of-fy-2025-26-recommended-budget.pdf) | FY2025-26 review; printed p. 24, budget unit 921 finding | EPA $51.5M multi-year contract ceiling; $10.7M encumbered. Obsolete South Bay line had $0 FY2024-25 actual expenditure; proposed removal $12,967,046. App shows $10.7M, secondary $51.5M, and actual $0 with distinct statuses. | **Match**; contract ceiling, encumbrance, proposed budget reduction, and actual expenditure remain separate; high |

County deep values verified from pp. 30-32 are, by branch: Health 4,477,094,429 / 1,376,083,312 / 862,509,786 / 186,967,131 / 174,251,198 / derived 48,972,239; Finance 526,944,260 / 415,435,491 / 283,516,697 / 200,072,306 / 164,010,963 / 114,603,868 / 56,916,509 / residual 988,931,139; Families 764,831,464 / 360,126,999 / 218,696,292 / 32,942,788; Safety 244,163,041 / 242,424,931 / 242,039,571 / 185,240,371 / 95,101,667 / 90,502,953 / derived 78,123,768; Land 184,229,673 / 112,079,895 / 102,644,632 / 98,106,513 / residual 115,776,479. Every value equals the app.

Top-level shares were independently recomputed from the source dollars and the exact common denominator used by the app. In display order they are: federal **21.691% / 12.978% / 13.064% / 12.969% / 13.530% / 9.956% / 4.835% / 4.549% / 2.028% / 4.400%**; California **41.388% / 25.588% / 7.306% / 6.170% / 5.456% / 5.350% / 3.368% / 2.483% / 2.890%**; County **54.632% / 21.087% / 10.554% / 9.028% / 4.698%**. Each unrounded set sums to 100%; UI formatting may round individual labels.

## Confirmed mismatches versus interpretation questions

Confirmed mismatches requiring a separately reviewed correction decision:

1. Federal Tax Table not used below $100,000 taxable income.
2. California Tax Table not used at or below $100,000 taxable income.
3. California exemption-credit AGI phaseout omitted.
4. `SOURCES.md` names a superseded source for the current federal standard-deduction values, although the values themselves are correct.

Interpretation questions, not source-value mismatches:

1. Whether the product owner accepts the federal/California continuous schedules as a disclosed educational approximation. They are not filing-accurate, but the measured differences are small and the UI disclaims filing use.
2. Whether mutable USAspending, Open FI$Cal, and County contract-register snapshots should be refreshed on every data release or pinned to immutable archived extracts. Current values match on the access date.
3. Whether `SOURCES.md` and the release manifest should pin the exact OMB workbook URL rather than only the moving Historical Tables landing page.

## Minimal correction proposal and independent review

No correction is implemented by this audit. The smallest reviewable follow-up would be:

1. Add 2025 federal and California table lookup data for their official ranges, retaining the rate schedules above the thresholds; add exact boundary tests at $99,999/$100,000 federal and $100,000/$100,001 California for all supported statuses.
2. Add the California p. 14 AGI-limitation worksheet exactly as written, using the app's AGI proxy and separately reducing personal and dependent exemption groups; add threshold, first-step, multi-step, and full-phaseout tests for all three statuses.
3. Update source copy/inventory to cite the 2025 Form 1040 instructions for the enacted standard deductions and disclose any remaining estimator simplification in the UI/methodology.
4. Independent reviewer should reproduce at least one example per status from each official tax table, verify all threshold sides and phaseout step rounding, confirm the UI's AGI-proxy wording, and rerun boundary, reconciliation, rendered, lint, and production-build gates. Because these changes affect high-stakes calculations, correction and publication should remain separate approvals.

## Validation evidence

Source-backed regression assertions were added only for the federal $100,000 computation-worksheet boundary, the Social Security wage cap/payroll-rate transition, and the three official spending roots/top-level arrays. They do not change production behavior.

Final gates, 2026-07-21:

- Boundary/calculation, reconciliation, rendered HTML, and source-backed invariant tests: **14 passed, 0 failed** with `node --test tests/*.test.mjs`.
- Lint: **passed** with ESLint.
- Production build: **passed** with vinext/Vite; all five build phases completed.

The first lint/build invocation did not reach project validation because package postinstall subprocesses could not resolve `node`/`npm` from PATH. The bounded retry succeeded after explicitly prepending the bundled Node and binary directories; the verbatim failure and exact successful commands are preserved in `RESUME-P2-DATA-VERIFICATION.md`.
