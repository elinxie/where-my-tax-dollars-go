# California FY 2025-26 spending drill-down

Status: implementation research, not an audited financial statement. Amounts are nominal dollars and generally rounded to the nearest million for UI display. Source-table amounts are in thousands unless noted.

## The accounting boundary that the UI must show

The chart's denominator is the enacted FY 2025-26 **state-funds** budget: **$321.050481 billion**, comprising $228.366 billion General Fund, $88.799 billion special funds, and $3.886 billion selected bond funds. It excludes federal funds, reimbursements, and certain non-governmental cost funds. Source: [Department of Finance, enacted Budget Detail](https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail) and [Budget Overview](https://ebudget.ca.gov/publication/e/2025-26/BudgetOverview).

Department and program documents often show **all funds** instead. Those figures can be much larger because they add federal funds, reimbursements, local property tax, university enterprise funds, and other non-state sources. Do not make all-funds children sum to a state-funds parent. Give each node a `basis` badge and use a parallel "funding sources" view where useful.

The enacted budget is authority/planned expenditure, not proof that cash was paid. Vendor examples below use posted Open FI$Cal expenditure transactions and are not contract ceilings. California says Open FI$Cal is raw, unaudited and unconsolidated and does not necessarily reconcile to audited statements or the budget. See [Open FI$Cal](https://open.fiscal.ca.gov/) and its [terms](https://open.fiscal.ca.gov/terms-of-use.html).

## Level 1: exact enacted state-funds categories

| UI category | Composition in DOF detail | FY 2025-26 state funds | Share of $321.050bn | Current UI |
|---|---|---:|---:|---:|
| Health & human services | HHS agency area | $132.876bn | 41.39% | 41.4% |
| K-12 education | K thru 12 Education | $82.151bn | 25.59% | 25.6% |
| Higher education | Higher Education | $23.456bn | 7.31% | 7.3% |
| Transportation | Transportation | $19.810bn | 6.17% | 6.2% |
| Corrections | Corrections and Rehabilitation | $17.516bn | 5.46% | 5.5% |
| Government operations | General Government + Government Operations | $17.178bn | 5.35% | 5.3% |
| Courts & elected branches | Legislative, Judicial, and Executive | $10.813bn | 3.37% | 3.4% |
| Natural resources | Natural Resources | $7.972bn | 2.48% | 2.5% |
| Housing, labor & environment | Business, Consumer Services, and Housing + Labor and Workforce Development + Environmental Protection | $9.278bn | 2.89% | 2.8% |

The nine exact shares total 100%. The displayed one-decimal shares total 100.0 only after intentional rounding/normalization; store the source dollars and calculate percentages rather than treating the displayed percentages as primary data.

## Health & human services

### Recommended drill-down

- **Medi-Cal — $196.7bn all funds, $44.9bn General Fund**. This is California Medicaid: coverage for about 14.9 million people, not Medicare. Medicare is federal and belongs under the federal chart. Source: [FY 2025-26 enacted HHS Budget Summary, p. 37](https://ebudget.ca.gov/2025-26/pdf/Enacted/BudgetSummary/HealthandHumanServices.pdf).
  - DHCS medical benefits (care and services): **$189.273bn all funds**.
  - County and other local-assistance administration: **$7.460bn all funds**.
  - DHCS Medical Care Services administration: **$0.853bn all funds**.
  - Other care services: **$4.853bn all funds**; Children's Medical Services **$0.282bn**; primary/rural/Indian health **$0.026bn**. These department-program lines overlap the broader Medi-Cal presentation differently; do not force them to sum to $196.7bn without a reconciliation table.
  - DHCS as a whole: **$202.746bn all funds**, including **$45.604bn General Fund** and **$120.368bn federal**. Source: [DHCS enacted department detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4260.pdf).
- **Social services — $56.098bn all funds**.
  - Social services and licensing **$33.790bn** (includes locally delivered services such as child care, child welfare, and IHSS-related activity).
  - Welfare programs **$21.920bn** (CalWORKs and other income/food supports).
  - Disability evaluation and other services **$0.388bn**.
  - Funding context: **$24.534bn General Fund**, $11.640bn federal, and $19.870bn reimbursements. Source: [Department of Social Services detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/5180.pdf).
- **Developmental services — $18.669bn all funds**.
  - Community services through 21 regional centers **$18.196bn**.
  - State-operated residential/community facilities **$0.310bn**; administration **$0.163bn**.
  - Funding context: **$12.163bn General Fund** and $6.445bn reimbursements. Source: [Department of Developmental Services detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4300.pdf).
- **Public health — $5.209bn all funds**.
  - Family health **$1.931bn**; infectious diseases **$1.676bn**; healthy communities **$0.548bn**; health facilities regulation **$0.489bn**; emergency preparedness **$0.254bn**; environmental/lab/data programs are the remainder.
  - Funding context: $0.799bn General Fund and $2.327bn federal. Source: [Department of Public Health detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4265.pdf).
- **State hospitals — $3.111bn all funds**.
  - Five hospitals: Patton **$0.487bn**, Napa **$0.456bn**, Coalinga **$0.444bn**, Atascadero **$0.382bn**, Metropolitan **$0.344bn**.
  - Community-based incompetent-to-stand-trial programs **$0.381bn**; jail-based treatment **$0.194bn**; conditional release programs about **$0.093bn**.
  - Source: [Department of State Hospitals detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4440.pdf).

### What "goes to health plans" means

Medi-Cal managed care primarily pays health plans a per-member-per-month capitation rate; plans then pay clinicians, hospitals, pharmacies, and other providers. A rate is not the same thing as total payment. The state publishes rate datasets by model at the [California HHS Open Data portal](https://data.chhs.ca.gov/dataset/medi-cal-managed-care-capitation-rates-by-managed-care-plan-models-consolidated). A future plan-level dollar view needs enrollment-member-months multiplied by the applicable rate cells and reconciled to DHCS financial reports. Until that is done, show plan names/rates as context, not as paid totals.

## K-12 education

Top-level parent remains **$82.151bn state funds**. The Department of Education's all-funds delivery view is **$112.664bn**, because it includes $29.382bn local property tax, $8.134bn federal, and other sources.

- Instruction/local assistance: **$101.379bn all funds**. This is chiefly funding passed to school districts rather than CDE payroll or vendors.
- Special programs: **$8.900bn**.
- Instructional support: **$2.107bn**.
- State-mandated local programs: **$0.273bn**; net administration about **$0.060bn**.
- Funding-source view: **$71.985bn Proposition 98 General Fund**, $1.388bn other General Fund, $29.382bn local property tax, $8.134bn federal, and $1.635bn lottery.

Source: [Department of Education enacted detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6100.pdf). Important UX wording: money largely flows to local education agencies, which then employ staff and buy services; a state vendor list is not a complete account of classroom spending.

## Higher education

The parent is **$23.456bn state funds**. Institution all-funds budgets are broader and should be a separately badged view.

- University of California: **$56.220bn all funds**; about $4.942bn General Fund and $45.443bn university funds. UC includes teaching hospitals and research enterprises. Source: [UC detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6440.pdf).
- California State University: **$12.950bn all funds**; $4.958bn General Fund, $6.261bn CSU Trust Fund, and $1.729bn federal funds outside the State Treasury. Source: [CSU detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6610.pdf).
- California Community Colleges: **$14.248bn all funds**: apportionments **$11.379bn**, special services/operations **$2.830bn**, mandates **$0.039bn**. Funding includes $8.471bn Proposition 98 General Fund and $4.438bn local property tax. Source: [Community Colleges detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6870.pdf).
- Gap: Student Aid Commission and other smaller higher-education entities have not yet been decomposed in this pass.

## Transportation

Parent: **$19.810bn state funds**.

- Caltrans: **$18.742bn all funds**.
  - Capital projects **$6.137bn**; capital-outlay support **$2.516bn**.
  - Local assistance **$3.684bn**; highway maintenance **$1.985bn**.
  - Intercity passenger rail **$1.485bn**; mass transit **$1.062bn**.
  - Equipment services **$0.524bn**; operations/admin/planning/legal and aeronautics are the remainder.
  - Funding includes $6.761bn federal, $4.711bn State Highway Account, $2.918bn Road Maintenance and Rehabilitation Account, and $2.625bn reimbursements. Source: [Caltrans detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf).
- California Highway Patrol: **$3.479bn all funds**: traffic management **$3.033bn**, regulation/inspection **$0.368bn**, vehicle-ownership security **$0.077bn**. Source: [CHP detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2720.pdf).
- DMV: **$1.481bn all funds**: vehicle/vessel identification **$0.817bn**, driver licensing/ID **$0.413bn**, driver safety **$0.173bn**, occupational licensing/investigations **$0.077bn**. Source: [DMV detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2740.pdf).
- High-Speed Rail Authority operations: **$0.117bn all funds** (capital construction appropriations are separately presented in infrastructure/capital-outlay schedules). Source: [HSR detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2665.pdf).

Do not sum these all-funds departments to the state-funds parent; interdepartmental reimbursements and federal receipts create a different perimeter.

## Corrections

Parent: **$17.516bn state funds**. CDCR's operating/program view is **$13.635bn all funds**:

- Adult prison security **$4.687bn**; inmate support **$1.821bn**; institution administration **$0.743bn**.
- Adult medical care **$2.720bn**; mental health **$0.729bn**; ancillary care **$0.434bn**; dental **$0.179bn**; health administration **$0.074bn**.
- Administration/selection/legal **$0.799bn**; parole **$0.723bn**; education/rehabilitation/reentry **$0.650bn**.
- Board of State and Community Corrections: **$0.353bn all funds**, chiefly corrections planning and grants **$0.283bn**.

Sources: [CDCR detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5225.pdf) and [BSCC detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5227.pdf). Gap: reconcile the agency parent to CDCR/BSCC and capital/infrastructure/other boards before displaying a department-share pie.

## Government operations

This UI category intentionally combines DOF's **General Government ($14.245bn)** and **Government Operations ($2.933bn)** agency areas, totaling **$17.178bn state funds**. That composition must appear in the tooltip.

Representative departments/programs:

- Department of General Services **$1.472bn all funds**: facilities management **$0.642bn**, statewide support **$0.617bn**, building regulation **$0.120bn**, real estate **$0.101bn**. [DGS detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/7500/7760.pdf).
- Franchise Tax Board **$1.225bn all funds**: tax programs **$1.181bn**; collection/legal/contract work are the remainder. [FTB detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/7500/7730.pdf).
- Department of Human Resources **$0.662bn all funds**: benefit payments **$0.527bn**, HR management **$0.094bn**, benefits administration **$0.036bn**. [CalHR detail](https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/7500/7501.pdf).
- Gap: the large General Government side (debt service, tax relief, statewide items, and other entities) needs its own decomposition before a complete pie is shipped.

## Remaining parents: safe first-release children

Use these source-aligned agency children now, explicitly marked as state funds, and defer program detail until the underlying department PDFs are reconciled:

- Courts & elected branches, **$10.813bn**: judicial branch/courts; Department of Justice; Governor and constitutional officers; Legislature. Source-of-truth landing page: [Budget Detail](https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail). Gap: amounts by department.
- Natural resources, **$7.972bn**: wildfire and forest resilience (CAL FIRE); water resources; parks and recreation; fish and wildlife; conservation/agency administration. Gap: amounts by child.
- Housing, labor & environment, **$9.278bn**:
  - Business, Consumer Services and Housing **$2.804bn** (housing/community development, homelessness, consumer/business regulation).
  - Labor and Workforce Development **$2.189bn** (EDD workforce services/administration, industrial relations, workforce board).
  - Environmental Protection **$4.285bn** (air resources, water quality, toxics, recycling, pesticides).

These three top amounts come directly from [DOF Budget Detail](https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail). Do not invent vendor children for the gaps.

## Representative DHCS vendors: posted expenditures, not awards

Source record: Open FI$Cal department vendor transaction file [`Vendor_4260_StateDeptHlthCareServices_FY25.csv`](https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionFiles/Vendor_4260_StateDeptHlthCareServices_FY25.csv), discoverable from the [official department-file pointer](https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionPointer/DepartmentVendorTransactionPointer.csv). Here `fiscal_year_begin=2025`, meaning FY 2025-26. The aggregates below sum `monetary_amount` for the named vendor across accounting dates through March 2026; negative corrections/interfaces are included. Paying department is DHCS (business unit 4260).

| Vendor as recorded | Exact posted net expenditure | Accounting-date coverage | What the record says / payment status |
|---|---:|---|---|
| Advocates for Human Potential | **$303,364,643.13** | 2025-07-01 to 2026-03-30; 54 documents | Mostly Medi-Cal benefits/other-care entries, including $248.335m miscellaneous expense and $41.774m grants/subventions. This is a net total of posted expenditure transactions, not a contract ceiling; Open FI$Cal does not prove bank settlement. |
| Prime Therapeutics State | **$118,778,973.29** | 2025-07-01 to 2026-03-26; 143 documents | Primarily Children's Medical Services grants/subventions, net of a negative SCO interface adjustment. Posted expenditure, not award value or a managed-care capitation total. |
| Amneal Pharmaceuticals LLC | **$31,312,800.00** | 2025-07-16 to 2026-03-10; 17 documents | Drugs/medical supplies and other goods under Other Care Services. Posted expenditure, not contract ceiling. |
| Deloitte Consulting LLP | **$21,498,786.10** | 2025-07-11 to 2026-03-24; 254 documents | Consulting and IT entries, net of a negative SCO interface adjustment. Posted expenditure, not obligated/awarded value. |
| Boston Consulting Group Inc. | **$9,240,000.00** | 2025-08-22 to 2026-03-16; 13 documents | External consulting under Health Care Services/Other Care Services, net of a negative interface entry. Posted expenditure, not contract ceiling. |

These are representative records, **not the largest Medi-Cal recipients**: Open FI$Cal covers only part of state expenditure activity, and managed-care/provider payments may travel through other financial paths. The UI label should be “Examples in Open FI$Cal” rather than “top contractors.”

### Company financial context

- Amneal is public. Link users to its [official SEC filings page](https://investors.amneal.com/financial-information/sec-filings) and label company-wide revenue separately from the $31.313m DHCS posted expenditure. Never calculate “share of state budget” using corporate revenue.
- Deloitte Consulting LLP, Boston Consulting Group, Prime Therapeutics, and Advocates for Human Potential are not comparable public issuers with a directly attributable SEC 10-K for the named California payee. Their parent/global annual reports, where available, are not the revenue of the legal payee. Mark “private/nonprofit; no comparable 10-K linked” rather than presenting a misleading company-wide number.

## Proposed TypeScript hierarchy

```ts
type Basis =
  | "state-funds-budget-authority"
  | "general-fund-budget-authority"
  | "all-funds-budget-authority"
  | "posted-expenditure";

type SpendNode = {
  id: string;
  label: string;
  amount: number;
  fiscalYear: "2025-26";
  basis: Basis;
  status?: "enacted-budget" | "posted-not-proof-of-cash-settlement";
  sourceUrl: string;
  note?: string;
  children?: SpendNode[];
};

const california: SpendNode = {
  id: "ca-fy25",
  label: "California state funds",
  amount: 321_050_481_000,
  fiscalYear: "2025-26",
  basis: "state-funds-budget-authority",
  status: "enacted-budget",
  sourceUrl: "https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail",
  children: [
    {
      id: "ca-hhs",
      label: "Health & human services",
      amount: 132_875_970_000,
      fiscalYear: "2025-26",
      basis: "state-funds-budget-authority",
      status: "enacted-budget",
      sourceUrl: "https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail",
      note: "All-funds program details below are a different accounting perimeter.",
      children: [
        {
          id: "ca-hhs-medi-cal",
          label: "Medi-Cal",
          amount: 196_700_000_000,
          fiscalYear: "2025-26",
          basis: "all-funds-budget-authority",
          status: "enacted-budget",
          sourceUrl: "https://ebudget.ca.gov/2025-26/pdf/Enacted/BudgetSummary/HealthandHumanServices.pdf",
          note: "California Medicaid; Medicare is federal.",
          children: [
            // medical benefits 189.273bn; local administration 7.460bn;
            // state administration 0.853bn. Keep the reconciliation warning.
          ],
        },
        // social services 56.098bn all funds; developmental services 18.669bn;
        // public health 5.209bn; state hospitals 3.111bn.
      ],
    },
    // K-12 82.151357bn; higher ed 23.455629bn; transportation 19.810046bn;
    // corrections 17.515888bn; combined government operations 17.177676bn;
    // courts/elected 10.813274bn; natural resources 7.972246bn;
    // housing/labor/environment 9.278395bn.
  ],
};
```

Implementation rules:

1. Render `basis` beside every amount; never silently mix a parent and child basis.
2. Calculate a tax-dollar illustration only from the nine state-funds parents. For deeper all-funds nodes, switch to “program budget context,” not “your dollar split.”
3. A posted vendor expenditure is neither an award ceiling nor necessarily proof of cash settlement. Preserve negative transactions in net totals and offer the source download.
4. Add `asOf` to vendor nodes (currently 2026-03-30 for the DHCS extract) and do not imply a completed fiscal year.
5. Label Medicare as federal; Medi-Cal as California-administered Medicaid jointly funded by state and federal sources.

## Research gaps before calling the drill-down exhaustive

- Reconcile every agency's state-funds parent to its departments; current department examples often use all funds.
- Add the detailed Proposition 98/Local Control Funding Formula schedule below K-12.
- Build a plan-level Medi-Cal payment model from DHCS capitation rates, enrollment member-months, and audited/financial reports; rates alone are not payments.
- Decompose courts/elected branches, Natural Resources, and the three combined housing/labor/environment agencies from enacted department PDFs.
- Locate Cal eProcure contract records for representative vendors and show ceiling/term in a separate field from Open FI$Cal posted expenditure. No contract ceiling is asserted in this file.
- Verify corporate legal entity/parent before adding annual-report revenue; state payment to a subsidiary is not parent-company revenue from California.
