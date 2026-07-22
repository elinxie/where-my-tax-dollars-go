# Federal spending drill-down research

## Recommended basis

Use **FY2024 actual federal outlays** as the common top-level denominator: **$6.735261 trillion**. The source of record is OMB Historical Table 3.2, “Outlays by Function and Subfunction,” current release (values are millions of dollars): [OMB table landing page](https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/) and [Table 3.2 XLSX](https://www.whitehouse.gov/wp-content/uploads/2026/04/hist03z2_fy2027.xlsx). CBO independently reports about $6.8T of FY2024 outlays and explains the mandatory/discretionary split: [FY2024 budget results](https://www.cbo.gov/publication/61258), [mandatory infographic](https://www.cbo.gov/publication/61182), [discretionary infographic](https://www.cbo.gov/publication/61184).

Top-level percentages below are amount / $6.735261T, not shares of tax receipts. Federal receipts are pooled; an individual's income-tax payment is not legally earmarked to these functions.

| Site branch | FY2024 actual outlays | Share of all outlays | Defensible level-two drill-down |
|---|---:|---:|---|
| Social Security | $1,460.918B | 21.69% | CY2024 benefits: OASI $1,316.4B; DI $155.0B. OASI includes retired workers/families and survivors. The calendar-year total ($1,471.4B) differs slightly from the federal fiscal-year total. [SSA](https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html) |
| Medicare | $874.133B | 12.98% | See dedicated Medicare tree below. This OMB amount is **net federal-budget outlay**; do not compare it directly with CMS gross program expenditures. |
| Net interest | $879.879B | 13.06% | Gross interest on Treasury securities $1,133.019B; less interest received by on-budget trust funds $116.418B; less off-budget trust funds $67.420B; less other interest $64.902B; less other investment income $4.400B. |
| National defense | $873.523B | 12.97% | DoD-Military $826.275B; atomic-energy defense $34.916B; other defense-related $12.332B. DoD-Military: O&M $332.047B; personnel $191.947B; procurement $152.259B; RDT&E $137.959B; military construction $12.069B; family housing $1.547B; other −$1.553B. |
| Medicaid & other health | $911.290B | 13.53% | OMB: health-care services $854.342B; health research/training $50.647B; consumer/occupational safety $6.301B. CBO separately identifies **Medicaid $618B** in FY2024; it is the largest program within health-care services. [CBO FY2024 monthly budget summary](https://www.cbo.gov/publication/60843/html) |
| Income security | $670.548B | 9.96% | Other income security $210.867B; federal employee retirement/disability $179.924B; food/nutrition $149.146B; housing assistance $70.008B; unemployment compensation $38.278B; other non-SS retirement/disability $22.325B. |
| Veterans | $325.645B | 4.83% | Veterans income security $161.312B; hospital/medical care $138.543B; other benefits/services $15.748B; education/training/rehab $13.554B; housing −$3.512B (net credit/offset). |
| Education, training & social services | $306.370B | 4.55% | Higher education $161.032B; elementary/secondary/vocational $105.373B; social services $25.166B; training/employment $7.683B; research/general aids $4.723B; other labor services $2.393B. FY2024 higher-education outlays are unusually affected by student-loan accounting; preserve negative values and do not smooth across years. |
| Transportation | $136.582B | 2.03% | Ground $92.852B; air $29.783B; water $13.247B; other $0.700B. |
| Everything else (net residual) | $296.373B | 4.40% | Exact residual after the nine branches above. It contains international affairs, science/space, energy, environment, agriculture, community development/disaster relief, justice, general government, commerce/housing credit, and **negative undistributed offsetting receipts**. It is not one agency or program. |

### Medicare: deeper service-cost view

CMS reports **calendar-year 2024 gross Medicare expenditures of $1,122.1B**, funded partly by payroll taxes, beneficiary premiums, state payments and general revenue. This is a different basis from OMB's $874.133B net FY2024 budget outlay, so show it in a panel labeled “How Medicare paid for care,” not as children that must sum to the OMB number. [2025 Medicare Trustees Report, Table II.B1](https://www.cms.gov/oact/tr/2025).

- Part A / Hospital Insurance: $422.5B total expenditures; $416.3B benefits; $6.2B administration.
  - Benefit services: private plans (Part C share of Part A) $192.5B; hospital $144.4B; skilled nursing $28.5B; home health $5.9B; other $44.9B.
- Part B / Supplementary Medical Insurance: $553.4B total; $547.8B benefits; $5.6B administration.
  - Benefit services: private plans (Part C share of Part B) $301.6B; hospital outpatient $80.5B; physician-fee-schedule services $71.4B; home health $10.0B; other $84.3B.
- Part D / prescription drugs: $146.2B total; $145.7B benefits; $0.5B administration.
- Combined private-plan payments for Part A+B services: **$494.0B**. CMS says this was roughly 51% of total A+B benefit costs. CMS does not identify individual insurers in Table II.B1; do not assign this aggregate to Humana, UnitedHealth, CVS/Aetna, etc. without a separate CMS plan-payment dataset.

### Social Security: deeper beneficiary view

SSA's calendar-year 2024 cash-benefit view is $1,471.4B: OASI $1,316.4B (89.46%) and DI $155.0B (10.54%). At December 2024, 68.5M people received OASDI benefits: 54.3M Old-Age Insurance beneficiaries, 5.8M Survivors Insurance beneficiaries, and 8.3M Disability Insurance beneficiaries. Within that snapshot were 51.8M retired workers and 7.2M disabled workers. Use beneficiary counts as context, not as dollar shares. [SSA Annual Statistical Supplement 2025](https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html); [trust-fund cash operations](https://www.ssa.gov/oact/tr/2025/II_B_cyoper.html).

## Representative company/contract records

These examples are **award records, not allocations of the whole budget function**. USAspending's “Award Amount” is cumulative obligations (a legal promise to spend) over the award, while “Total Outlays” is cumulative cash disbursement reported for the award. Neither is an FY2024 amount. The records were selected because they had activity in the FY2024 search window, but the displayed totals are lifetime-to-date snapshots retrieved 2026-07-21. Zero or null outlay does **not** prove no vendor payment occurred; contract-level outlays are incomplete in USAspending. [USAspending data-source definitions](https://www.usaspending.gov/data/data-sources-download.pdf).

| Recipient / award | Paying/awarding agency; performance period | Cumulative obligated | Cumulative outlay shown | What the number means / financial context |
|---|---|---:|---:|---|
| Humana Government Business, [HT940216C0001](https://www.usaspending.gov/award/CONT_AWD_HT940216C0001_9700_-NONE-_-NONE-) | DoD / Defense Health Agency; 2016-08-01–2025-12-31 | $51,269,205,263.03 | $0.00 | TRICARE managed-care support contract. Obligated is not paid; USAspending shows no award-level outlay. This is **TRICARE, not Medicare**. Humana Inc. reported $117.761B total 2024 revenue; 85% of premiums/services revenue came from federal contracts, but that company revenue is not this award amount. [Humana 10-K](https://www.sec.gov/Archives/edgar/data/49071/000004907125000007/hum-20241231.htm) |
| Lockheed Martin, [N0001917C0001](https://www.usaspending.gov/award/CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-) | DoD / Department of the Navy; 2017-11-17–2031-03-31 | $35,135,514,910.20 | $933,036,846.29 | F-35 low-rate initial production advance acquisition. About $933.0M is shown as paid; $35.1B is the cumulative obligation, not a contract ceiling or FY2024 expense. Lockheed's total 2024 net sales were $71.043B; 73% came from the U.S. government, but not all from this award or even this program. [Lockheed 10-K](https://www.sec.gov/Archives/edgar/data/936468/000093646825000009/lmt-20241231.htm) |
| Boeing, [FA862511C6600](https://www.usaspending.gov/award/CONT_AWD_FA862511C6600_9700_-NONE-_-NONE-) | DoD / Department of the Air Force; 2011-02-24–2027-07-31 | $31,972,918,249.03 | $271,607,247.33 | KC-X/KC-46 modernization award. About $271.6M is shown as paid; $32.0B is cumulative obligated, not paid and not FY2024-only. Boeing reported $66.517B total 2024 revenue, including commercial businesses; it is not comparable one-for-one with this award. [Boeing 10-K](https://www.sec.gov/Archives/edgar/data/12927/000001292725000015/ba-20241231.htm) |
| Electric Boat, [N0002417C2117](https://www.usaspending.gov/award/CONT_AWD_N0002417C2117_9700_-NONE-_-NONE-) | DoD / Department of the Navy; 2017-09-21–2031-12-31 | $30,979,375,853.00 | $43,723,356.73 | Columbia-class submarine design-completion award. $43.7M is shown as paid; $31.0B is cumulative obligated. Electric Boat is a General Dynamics subsidiary; General Dynamics reported $10.392B of 2024 nuclear-submarine revenue and $14.343B for its full Marine Systems segment, neither equal to this award's government payments. [General Dynamics 10-K](https://www.sec.gov/Archives/edgar/data/40533/000004053325000008/gd-20241231.htm) |
| Health Net Federal Services, [HT940216C0002](https://www.usaspending.gov/award/CONT_AWD_HT940216C0002_9700_-NONE-_-NONE-) | DoD / Defense Health Agency; 2016-08-01–2026-05-01 | $23,482,808,066.07 | $0.00 | TRICARE managed-care support. Obligated is not paid; no award-level outlay is shown. This is also **TRICARE, not Medicare/Medicaid**. No company-financial comparison is included because the recipient is a subsidiary and a parent-company total would be too easy to misread as award revenue. |

Contract records can change as modifications and later DATA Act submissions arrive. Cache a dated snapshot if the site needs reproducible figures, and label each metric `obligated`, `outlay`, or `potential/ceiling` rather than the ambiguous word “awarded.”

## Proposed TypeScript hierarchy

```ts
type Basis = "FY2024 OMB actual outlay" | "CY2024 program expenditure" | "award lifetime snapshot";
type MetricKind = "outlay" | "grossExpenditure" | "obligation" | "reportedAwardOutlay" | "count";

type SpendNode = {
  id: string;
  label: string;
  amountB?: number;
  shareOfFederalOutlays?: number;
  basis: Basis;
  metric: MetricKind;
  sourceUrl: string;
  caveat?: string;
  children?: SpendNode[];
};

export const federalFY2024: SpendNode = {
  id: "federal", label: "Federal outlays", amountB: 6735.261,
  basis: "FY2024 OMB actual outlay", metric: "outlay",
  sourceUrl: "https://www.whitehouse.gov/wp-content/uploads/2026/04/hist03z2_fy2027.xlsx",
  caveat: "Illustrative allocation of pooled federal receipts; not earmarking.",
  children: [
    { id: "ss", label: "Social Security", amountB: 1460.918, shareOfFederalOutlays: 21.69,
      basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/",
      children: [
        { id: "ss-oasi", label: "Old-age & survivors benefits", amountB: 1316.4, basis: "CY2024 program expenditure", metric: "grossExpenditure", sourceUrl: "https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html", caveat: "Calendar year; does not sum exactly to FY OMB outlay." },
        { id: "ss-di", label: "Disability benefits", amountB: 155.0, basis: "CY2024 program expenditure", metric: "grossExpenditure", sourceUrl: "https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html" }
      ] },
    { id: "medicare", label: "Medicare", amountB: 874.133, shareOfFederalOutlays: 12.98,
      basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/",
      caveat: "Net budget outlay. Open a separately labeled CY2024 gross-cost view: Part A 422.5, Part B 553.4, Part D 146.2." },
    { id: "interest", label: "Net interest", amountB: 879.879, shareOfFederalOutlays: 13.06, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "defense", label: "National defense", amountB: 873.523, shareOfFederalOutlays: 12.97, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "health", label: "Medicaid & other health", amountB: 911.290, shareOfFederalOutlays: 13.53, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "income", label: "Income security", amountB: 670.548, shareOfFederalOutlays: 9.96, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "veterans", label: "Veterans", amountB: 325.645, shareOfFederalOutlays: 4.83, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "education", label: "Education, training & social services", amountB: 306.370, shareOfFederalOutlays: 4.55, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "transportation", label: "Transportation", amountB: 136.582, shareOfFederalOutlays: 2.03, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" },
    { id: "other", label: "Everything else (net)", amountB: 296.373, shareOfFederalOutlays: 4.40, basis: "FY2024 OMB actual outlay", metric: "outlay", sourceUrl: "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/", caveat: "Includes negative offsetting receipts." }
  ]
};
```

## Gaps to label rather than guess

- OMB function data does not name contractors; USAspending awards do not establish that a company belongs under a specific OMB function unless the Treasury account/program linkage is checked.
- Medicare Advantage and Part D plan-level payments need a dedicated CMS payment dataset. USAspending defense-health contracts are not a substitute.
- USAspending generally has better obligation than contract-level outlay coverage. Never render a null/zero award outlay as “government paid nothing.”
- FY2025 actuals are available in the current OMB workbook, but mixing them with FY2024 contractor or program tables would introduce an avoidable year mismatch. A later all-FY2025 refresh should update every branch together.
