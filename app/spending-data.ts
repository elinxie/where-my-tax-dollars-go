export type LayerKey = "federal" | "state" | "county";

export type MoneyStatus =
  | "actual-outlay"
  | "gross-program-cost"
  | "budget-authority"
  | "posted-expenditure"
  | "reported-award-outlay"
  | "reported-actual-expenditure"
  | "obligation"
  | "contract-value"
  | "encumbrance"
  | "company-revenue"
  | "service-only";

export type PaymentRecord = {
  name: string;
  payer: string;
  period: string;
  status: MoneyStatus;
  amount: number;
  amountLabel?: string;
  secondaryAmount?: number;
  secondaryLabel?: string;
  note: string;
  source: string;
  sourceLabel: string;
  financialContext?: string;
  financialSource?: string;
};

export type SpendNode = {
  id: string;
  name: string;
  amount?: number;
  note: string;
  description?: string;
  basis: string;
  status: MoneyStatus;
  source: string;
  sourceLabel: string;
  allocationEligible?: boolean;
  childrenCoverage?: "complete" | "context" | "partial";
  coverageNote?: string;
  children?: SpendNode[];
  services?: string[];
  payments?: PaymentRecord[];
};

export type SpendingLayer = SpendNode & {
  label: string;
  shortLabel: string;
  personalAllocation: boolean;
  caveat: string;
};

const omb = "https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/";
const countyBudget = "https://files.santaclaracounty.gov/exjcpb1271/2025-10/fiscal-year-2025-2026-adopted-budget_1.pdf";
const caBudget = "https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail";

const federalContractors: PaymentRecord[] = [
  {
    name: "Lockheed Martin — F-35 production",
    payer: "U.S. Navy / Department of Defense",
    period: "2017-11-17 to 2031-03-31; lifetime-to-date snapshot retrieved 2026-07-21",
    status: "reported-award-outlay",
    amount: 933_036_846.29,
    amountLabel: "Reported paid/outlay",
    secondaryAmount: 35_135_514_910.2,
    secondaryLabel: "Cumulative obligated",
    note: "USAspending reports about $933.0M disbursed on this award and $35.1B legally committed. Neither figure is FY2024-only or the contract ceiling.",
    source: "https://www.usaspending.gov/award/CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-",
    sourceLabel: "USAspending award",
    financialContext: "Lockheed Martin reported $71.043B of total 2024 net sales; 73% came from the U.S. government. That company-wide revenue is not this award.",
    financialSource: "https://www.sec.gov/Archives/edgar/data/936468/000093646825000009/lmt-20241231.htm",
  },
  {
    name: "Boeing — KC-46 modernization",
    payer: "U.S. Air Force / Department of Defense",
    period: "2011-02-24 to 2027-07-31; lifetime-to-date snapshot retrieved 2026-07-21",
    status: "reported-award-outlay",
    amount: 271_607_247.33,
    amountLabel: "Reported paid/outlay",
    secondaryAmount: 31_972_918_249.03,
    secondaryLabel: "Cumulative obligated",
    note: "USAspending shows $271.6M disbursed and $32.0B obligated on this award. The obligation is a commitment, not cash paid.",
    source: "https://www.usaspending.gov/award/CONT_AWD_FA862511C6600_9700_-NONE-_-NONE-",
    sourceLabel: "USAspending award",
    financialContext: "Boeing reported $66.517B in total 2024 revenue across commercial and government businesses; that is not revenue from this award.",
    financialSource: "https://www.sec.gov/Archives/edgar/data/12927/000001292725000015/ba-20241231.htm",
  },
  {
    name: "General Dynamics Electric Boat — Columbia-class submarine",
    payer: "U.S. Navy / Department of Defense",
    period: "2017-09-21 to 2031-12-31; lifetime-to-date snapshot retrieved 2026-07-21",
    status: "reported-award-outlay",
    amount: 43_723_356.73,
    amountLabel: "Reported paid/outlay",
    secondaryAmount: 30_979_375_853,
    secondaryLabel: "Cumulative obligated",
    note: "USAspending reports $43.7M disbursed and $31.0B obligated on this design-completion award.",
    source: "https://www.usaspending.gov/award/CONT_AWD_N0002417C2117_9700_-NONE-_-NONE-",
    sourceLabel: "USAspending award",
    financialContext: "General Dynamics reported $10.392B of 2024 nuclear-submarine revenue and $14.343B for its full Marine Systems segment; neither equals this award's payments.",
    financialSource: "https://www.sec.gov/Archives/edgar/data/40533/000004053325000008/gd-20241231.htm",
  },
  {
    name: "Humana Government Business — TRICARE support",
    payer: "Defense Health Agency",
    period: "2016-08-01 to 2025-12-31; lifetime-to-date snapshot retrieved 2026-07-21",
    status: "obligation",
    amount: 51_269_205_263.03,
    amountLabel: "Cumulative obligated",
    note: "This is a TRICARE contract—not Medicare. USAspending shows no usable award-level outlay, so the amount is a legal commitment and must not be labeled paid.",
    source: "https://www.usaspending.gov/award/CONT_AWD_HT940216C0001_9700_-NONE-_-NONE-",
    sourceLabel: "USAspending award",
    financialContext: "Humana reported $117.761B total 2024 revenue. Company-wide revenue is not the amount paid on this contract.",
    financialSource: "https://www.sec.gov/Archives/edgar/data/49071/000004907125000007/hum-20241231.htm",
  },
];

const federal: SpendingLayer = {
  id: "federal",
  name: "Federal outlays",
  label: "Federal FY2024 actual outlays",
  shortLabel: "Federal",
  amount: 6_735_261_000_000,
  note: "What the federal government actually spent in FY2024, grouped by OMB function.",
  description: "The top level uses a single reconciled OMB actual-outlay denominator. Some deeper program views use calendar-year or gross-cost data and are clearly marked when they no longer add to the parent.",
  basis: "FY2024 OMB actual outlay",
  status: "actual-outlay",
  source: omb,
  sourceLabel: "OMB Historical Table 3.2",
  personalAllocation: true,
  allocationEligible: true,
  caveat: "Your federal income tax is pooled. The personal dollar amounts are illustrative equivalents, not legal earmarks. Contractor award totals are separate records and are never subtracted from your estimate.",
  children: [
    {
      id: "ss", name: "Social Security", amount: 1_460_918_000_000,
      note: "Retirement, survivor and disability benefits.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true,
      description: "SSA's deeper cash-benefit view is calendar-year 2024, so it differs slightly from the federal fiscal-year total.",
      childrenCoverage: "context",
      coverageNote: "Calendar-year benefit context; not a 100% split of the FY2024 OMB parent.",
      children: [
        { id: "oasi", name: "Old-age & survivors benefits", amount: 1_316_400_000_000, note: "Retired workers, families and survivors.", basis: "CY2024 SSA cash benefits", status: "gross-program-cost", source: "https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html", sourceLabel: "SSA Statistical Supplement", allocationEligible: false },
        { id: "di", name: "Disability benefits", amount: 155_000_000_000, note: "Benefits for disabled workers and eligible family members.", basis: "CY2024 SSA cash benefits", status: "gross-program-cost", source: "https://www.ssa.gov/policy/docs/statcomps/supplement/2025/highlights.html", sourceLabel: "SSA Statistical Supplement", allocationEligible: false },
      ],
    },
    {
      id: "medicare", name: "Medicare", amount: 874_133_000_000,
      note: "Federal health coverage, mainly for people 65+ and some people with disabilities.", basis: "FY2024 OMB net actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true,
      description: "Medicare is federal. The service view below is CMS calendar-year gross cost—before premiums and other receipts—and therefore does not sum to the net OMB outlay.",
      childrenCoverage: "context",
      coverageNote: "How Medicare paid for care: CY2024 gross-cost context, not a split of the FY2024 net federal outlay.",
      children: [
        { id: "part-a", name: "Part A — hospital insurance", amount: 422_500_000_000, note: "$416.3B benefits plus $6.2B administration.", basis: "CY2024 CMS gross program expenditure", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "2025 Medicare Trustees Report", allocationEligible: false, childrenCoverage: "context", coverageNote: "Benefit-service examples plus separately stated administration; rounding means the examples are not a reconciled 100% chart.", children: [
          { id: "a-private", name: "Private-plan share of Part A", amount: 192_500_000_000, note: "Part C plan payments attributed to Part A services.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
          { id: "a-hospital", name: "Hospital services", amount: 144_400_000_000, note: "Hospital benefits outside the private-plan line.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
          { id: "a-skilled", name: "Skilled nursing", amount: 28_500_000_000, note: "Skilled nursing facility benefits.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
          { id: "a-other", name: "Home health & other", amount: 50_800_000_000, note: "Home health and other Part A benefit services.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
        ] },
        { id: "part-b", name: "Part B — medical insurance", amount: 553_400_000_000, note: "$547.8B benefits plus $5.6B administration.", basis: "CY2024 CMS gross program expenditure", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "2025 Medicare Trustees Report", allocationEligible: false, childrenCoverage: "context", coverageNote: "Benefit-service examples plus separately stated administration; not a reconciled 100% chart.", children: [
          { id: "b-private", name: "Private-plan share of Part B", amount: 301_600_000_000, note: "Part C plan payments attributed to Part B services.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
          { id: "b-outpatient", name: "Hospital outpatient", amount: 80_500_000_000, note: "Outpatient hospital services.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
          { id: "b-physician", name: "Physician-fee-schedule services", amount: 71_400_000_000, note: "Physician and practitioner services paid under the fee schedule.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
          { id: "b-other", name: "Home health & other", amount: 94_300_000_000, note: "Home health and other Part B benefits.", basis: "CY2024 CMS gross benefits", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "Medicare Trustees Report", allocationEligible: false },
        ] },
        { id: "part-d", name: "Part D — prescription drugs", amount: 146_200_000_000, note: "$145.7B benefits plus $0.5B administration.", basis: "CY2024 CMS gross program expenditure", status: "gross-program-cost", source: "https://www.cms.gov/oact/tr/2025", sourceLabel: "2025 Medicare Trustees Report", allocationEligible: false },
      ],
    },
    { id: "interest", name: "Net interest", amount: 879_879_000_000, note: "Interest on past federal borrowing, net of interest receipts.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, description: "Gross Treasury-security interest was $1.133T. Interest received by trust funds, other interest receipts and investment income reduce it to $879.9B net." },
    {
      id: "defense", name: "National defense", amount: 873_523_000_000,
      note: "Military, nuclear-security and other defense activity.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, payments: federalContractors,
      children: [
        { id: "dod-military", name: "Department of Defense — Military", amount: 826_275_000_000, note: "The main military-defense function.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, children: [
          { id: "om", name: "Operations & maintenance", amount: 332_047_000_000, note: "Readiness, bases, logistics and operations.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
          { id: "personnel", name: "Military personnel", amount: 191_947_000_000, note: "Pay and benefits for service members.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
          { id: "procurement", name: "Procurement", amount: 152_259_000_000, note: "Weapons, vehicles, equipment and supplies.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
          { id: "rdte", name: "Research, development, test & evaluation", amount: 137_959_000_000, note: "Defense research and acquisition development.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
          { id: "construction", name: "Construction, housing & other", amount: 12_063_000_000, note: "Military construction, family housing and net other items.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
        ] },
        { id: "atomic", name: "Atomic-energy defense", amount: 34_916_000_000, note: "Nuclear-security and atomic-energy defense programs.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
        { id: "other-defense", name: "Other defense-related", amount: 12_332_000_000, note: "Other defense-related activities.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      ],
    },
    { id: "health", name: "Medicaid & other health", amount: 911_290_000_000, note: "Medicaid, health-care services, research and safety.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, children: [
      { id: "health-services", name: "Health-care services", amount: 854_342_000_000, note: "Includes Medicaid, marketplace subsidies and other federal health services.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, description: "CBO separately identifies $618B of FY2024 Medicaid outlays within this broader line.", services: ["Medicaid — joint federal/state coverage for eligible low-income people", "Marketplace premium and cost-sharing support", "Other health financing and services"] },
      { id: "health-research", name: "Health research & training", amount: 50_647_000_000, note: "NIH and other health research and workforce activity.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "health-safety", name: "Consumer & occupational safety", amount: 6_301_000_000, note: "Health-related consumer and workplace protections.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
    ] },
    { id: "income", name: "Income security", amount: 670_548_000_000, note: "Food, housing, retirement, unemployment and other income supports.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, children: [
      { id: "other-income", name: "Other income security", amount: 210_867_000_000, note: "Refundable credits and other cash/support programs.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "fed-retirement", name: "Federal employee retirement & disability", amount: 179_924_000_000, note: "Civilian and related federal retirement systems.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "nutrition", name: "Food & nutrition assistance", amount: 149_146_000_000, note: "SNAP, child nutrition and related programs.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "housing", name: "Housing assistance", amount: 70_008_000_000, note: "Rental and other housing supports.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "unemployment", name: "Unemployment compensation", amount: 38_278_000_000, note: "Federal-state unemployment benefits and administration.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "other-retirement", name: "Other retirement & disability", amount: 22_325_000_000, note: "Non-Social-Security retirement and disability programs.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
    ] },
    { id: "veterans", name: "Veterans", amount: 325_645_000_000, note: "Veterans income support, health care and other benefits.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, children: [
      { id: "vet-income", name: "Income security", amount: 161_312_000_000, note: "Disability compensation, pensions and related support.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "vet-health", name: "Hospital & medical care", amount: 138_543_000_000, note: "VA hospitals, clinics and purchased care.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "vet-other", name: "Education, housing & other services", amount: 25_790_000_000, note: "Education, rehabilitation and other benefits, net of housing credit offsets.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
    ] },
    { id: "education", name: "Education, training & social services", amount: 306_370_000_000, note: "Higher education, K-12, job training and social services.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, children: [
      { id: "higher-ed", name: "Higher education", amount: 161_032_000_000, note: "Student aid and higher-education activity; loan accounting makes FY2024 unusual.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "k12", name: "Elementary, secondary & vocational", amount: 105_373_000_000, note: "Federal education aid and vocational education.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "social-services", name: "Social services", amount: 25_166_000_000, note: "Federal social-service programs.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "training", name: "Training, employment & other labor", amount: 14_799_000_000, note: "Employment training, research and other labor services.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
    ] },
    { id: "transport", name: "Transportation", amount: 136_582_000_000, note: "Highways, transit, aviation, water and other transportation.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, children: [
      { id: "ground", name: "Ground transportation", amount: 92_852_000_000, note: "Highways, transit and rail.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "air", name: "Air transportation", amount: 29_783_000_000, note: "Aviation systems and airports.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "water", name: "Water transportation", amount: 13_247_000_000, note: "Maritime and waterways programs.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
      { id: "other-transport", name: "Other transportation", amount: 700_000_000, note: "Other transportation activity.", basis: "FY2024 OMB actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true },
    ] },
    { id: "other", name: "Everything else (net)", amount: 296_373_000_000, note: "Science, diplomacy, justice, agriculture, disaster relief and more, net of offsets.", basis: "FY2024 OMB residual actual outlay", status: "actual-outlay", source: omb, sourceLabel: "OMB Table 3.2", allocationEligible: true, services: ["International affairs", "Science, space and technology", "Energy and environment", "Agriculture", "Community development and disaster relief", "Justice and general government", "Negative undistributed offsetting receipts reduce the net total"] },
  ],
};

const caVendors: PaymentRecord[] = [
  { name: "Advocates for Human Potential", payer: "California DHCS", period: "FY2025-26 transactions posted 2025-07-01 to 2026-03-30; 54 documents", status: "posted-expenditure", amount: 303_364_643.13, note: "Net Open FI$Cal expenditure entries, including grants/subventions and miscellaneous expense. This is not a contract ceiling; the raw ledger does not prove bank settlement.", source: "https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionFiles/Vendor_4260_StateDeptHlthCareServices_FY25.csv", sourceLabel: "Open FI$Cal DHCS vendor file" },
  { name: "Prime Therapeutics State", payer: "California DHCS", period: "FY2025-26 transactions through 2026-03-26; 143 documents", status: "posted-expenditure", amount: 118_778_973.29, note: "Net posted expenditure, largely Children's Medical Services grants/subventions and including a negative adjustment. It is not a managed-care capitation total.", source: "https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionFiles/Vendor_4260_StateDeptHlthCareServices_FY25.csv", sourceLabel: "Open FI$Cal DHCS vendor file" },
  { name: "Amneal Pharmaceuticals LLC", payer: "California DHCS", period: "FY2025-26 transactions through 2026-03-10; 17 documents", status: "posted-expenditure", amount: 31_312_800, note: "Posted drugs, medical-supplies and other-goods expenditure entries. Not a contract ceiling or audited cash-payment total.", source: "https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionFiles/Vendor_4260_StateDeptHlthCareServices_FY25.csv", sourceLabel: "Open FI$Cal DHCS vendor file", financialContext: "Amneal is public; its company filings describe the entire business, not revenue from California DHCS.", financialSource: "https://investors.amneal.com/financial-information/sec-filings" },
  { name: "Deloitte Consulting LLP", payer: "California DHCS", period: "FY2025-26 transactions through 2026-03-24; 254 documents", status: "posted-expenditure", amount: 21_498_786.1, note: "Net consulting and IT expenditure entries, including a negative adjustment. Posted expenditure is not an award value or proof of bank settlement.", source: "https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionFiles/Vendor_4260_StateDeptHlthCareServices_FY25.csv", sourceLabel: "Open FI$Cal DHCS vendor file" },
  { name: "Boston Consulting Group Inc.", payer: "California DHCS", period: "FY2025-26 transactions through 2026-03-16; 13 documents", status: "posted-expenditure", amount: 9_240_000, note: "Net external-consulting expenditure entries. Not a contract ceiling or proof of bank settlement.", source: "https://adwoutputfilesadlsstore.blob.core.windows.net/transparency/DepartmentVendorTransactionFiles/Vendor_4260_StateDeptHlthCareServices_FY25.csv", sourceLabel: "Open FI$Cal DHCS vendor file" },
];

const state: SpendingLayer = {
  id: "state", name: "California state funds", label: "California FY2025-26 enacted state funds", shortLabel: "California",
  amount: 321_050_481_000, note: "General Fund, special funds and selected bond funds in the enacted budget.",
  description: "The root excludes federal funds, reimbursements and certain non-governmental funds. Deeper department views often use all funds and are labeled as context rather than a continuation of your state-tax illustration.",
  basis: "FY2025-26 enacted state-funds budget authority", status: "budget-authority", source: caBudget, sourceLabel: "California enacted Budget Detail", personalAllocation: true, allocationEligible: true,
  caveat: "Top-level personal dollar equivalents use the enacted state-funds mix. When a deeper node changes to all funds, the interface stops tracing your estimated California income tax and shows program-budget context instead.",
  children: [
    { id: "ca-hhs", name: "Health & human services", amount: 132_875_970_000, note: "Medi-Cal, social services, developmental services, public health and state hospitals.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, childrenCoverage: "context", coverageNote: "Selected all-funds program views. They use a broader perimeter, may overlap, and are not a 100% split of the state-funds parent.", payments: caVendors, children: [
      { id: "medi-cal", name: "Medi-Cal", amount: 196_700_000_000, note: "California's Medicaid program—jointly funded health coverage for about 14.9 million people. It is not Medicare.", basis: "FY2025-26 enacted all-funds program budget", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/BudgetSummary/HealthandHumanServices.pdf", sourceLabel: "Enacted HHS Budget Summary", allocationEligible: false, childrenCoverage: "context", coverageNote: "DHCS program lines use a related but differently reconciled presentation; do not force them to sum to the $196.7B Medi-Cal estimate.", children: [
        { id: "medical-benefits", name: "Medical benefits", amount: 189_273_000_000, note: "Care and services financed through DHCS.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4260.pdf", sourceLabel: "DHCS enacted detail", allocationEligible: false },
        { id: "local-admin", name: "County & local administration", amount: 7_460_000_000, note: "Eligibility and other locally administered program work.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4260.pdf", sourceLabel: "DHCS enacted detail", allocationEligible: false },
        { id: "dhcs-admin", name: "State medical-care administration", amount: 853_000_000, note: "DHCS administration for medical-care services.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4260.pdf", sourceLabel: "DHCS enacted detail", allocationEligible: false },
      ], services: ["Managed-care plans receive per-member capitation payments and then pay providers", "Fee-for-service claims pay eligible clinicians, hospitals, pharmacies and suppliers", "Plan rates are not the same as total plan payments; a reconciled plan-level payment dataset is still needed"] },
      { id: "ca-social", name: "Social services", amount: 56_098_000_000, note: "Child care, child welfare, IHSS-related activity, CalWORKs and other supports.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/5180.pdf", sourceLabel: "Social Services enacted detail", allocationEligible: false, children: [
        { id: "social-licensing", name: "Social services & licensing", amount: 33_790_000_000, note: "Locally delivered social services and licensing.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/5180.pdf", sourceLabel: "Social Services detail", allocationEligible: false },
        { id: "welfare", name: "Welfare programs", amount: 21_920_000_000, note: "CalWORKs and other income and food supports.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/5180.pdf", sourceLabel: "Social Services detail", allocationEligible: false },
        { id: "disability-eval", name: "Disability evaluation & other", amount: 388_000_000, note: "Disability evaluation and other services.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/5180.pdf", sourceLabel: "Social Services detail", allocationEligible: false },
      ] },
      { id: "developmental", name: "Developmental services", amount: 18_669_000_000, note: "Regional-center community services and state-operated facilities.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4300.pdf", sourceLabel: "Developmental Services detail", allocationEligible: false, children: [
        { id: "regional-centers", name: "Community services", amount: 18_196_000_000, note: "Services through 21 regional centers.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4300.pdf", sourceLabel: "Developmental Services detail", allocationEligible: false },
        { id: "state-facilities", name: "State facilities & administration", amount: 473_000_000, note: "Residential/community facilities and administration.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4300.pdf", sourceLabel: "Developmental Services detail", allocationEligible: false },
      ] },
      { id: "ca-public-health", name: "Public health", amount: 5_209_000_000, note: "Family health, infectious disease, healthy communities and regulation.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4265.pdf", sourceLabel: "Public Health detail", allocationEligible: false, children: [
        { id: "family-health", name: "Family health", amount: 1_931_000_000, note: "Maternal, child and family health programs.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4265.pdf", sourceLabel: "Public Health detail", allocationEligible: false },
        { id: "infectious", name: "Infectious diseases", amount: 1_676_000_000, note: "Prevention, surveillance and response.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4265.pdf", sourceLabel: "Public Health detail", allocationEligible: false },
        { id: "healthy", name: "Healthy communities & other", amount: 1_602_000_000, note: "Community health, facility regulation, preparedness, labs and data.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4265.pdf", sourceLabel: "Public Health detail", allocationEligible: false },
      ] },
      { id: "state-hospitals", name: "State hospitals", amount: 3_111_000_000, note: "Five state hospitals plus community and jail-based treatment programs.", basis: "FY2025-26 all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/4000/4440.pdf", sourceLabel: "State Hospitals detail", allocationEligible: false },
    ] },
    { id: "ca-k12", name: "K-12 education", amount: 82_151_357_000, note: "State support for schools; deeper all-funds view also includes local property tax and federal funds.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, childrenCoverage: "context", coverageNote: "All-funds delivery context, including local property tax and federal funds; rounded examples are not a 100% state-funds split.", children: [
      { id: "instruction", name: "Instruction & local assistance", amount: 101_379_000_000, note: "Money chiefly passed to school districts and other local education agencies.", basis: "FY2025-26 education all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6100.pdf", sourceLabel: "Education enacted detail", allocationEligible: false },
      { id: "special-programs", name: "Special programs", amount: 8_900_000_000, note: "Targeted education programs.", basis: "FY2025-26 education all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6100.pdf", sourceLabel: "Education enacted detail", allocationEligible: false },
      { id: "instruction-support", name: "Instructional support", amount: 2_107_000_000, note: "Statewide and local instructional support.", basis: "FY2025-26 education all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6100.pdf", sourceLabel: "Education enacted detail", allocationEligible: false },
      { id: "mandates-admin", name: "Mandates & administration", amount: 333_000_000, note: "State-mandated local programs and net administration.", basis: "FY2025-26 education all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6100.pdf", sourceLabel: "Education enacted detail", allocationEligible: false },
    ] },
    { id: "ca-higher", name: "Higher education", amount: 23_455_629_000, note: "UC, CSU, community colleges and student aid.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, childrenCoverage: "partial", coverageNote: "Selected institution all-funds budgets; broader, partly overlapping perimeters and not a complete split of state funds.", children: [
      { id: "uc", name: "University of California", amount: 56_220_000_000, note: "All-funds view includes teaching hospitals, research and university enterprises.", basis: "FY2025-26 UC all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6440.pdf", sourceLabel: "UC enacted detail", allocationEligible: false },
      { id: "csu", name: "California State University", amount: 12_950_000_000, note: "All-funds CSU operating context.", basis: "FY2025-26 CSU all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6610.pdf", sourceLabel: "CSU enacted detail", allocationEligible: false },
      { id: "ccc", name: "Community colleges", amount: 14_248_000_000, note: "Apportionments, special services and mandates, including local property tax.", basis: "FY2025-26 community-college all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/6000/6870.pdf", sourceLabel: "Community Colleges detail", allocationEligible: false },
    ] },
    { id: "ca-transport", name: "Transportation", amount: 19_810_046_000, note: "Caltrans, CHP, DMV, rail and other transportation.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, childrenCoverage: "partial", coverageNote: "Selected department all-funds budgets; federal receipts and reimbursements make this a non-additive context view.", children: [
      { id: "caltrans", name: "Caltrans", amount: 18_742_000_000, note: "Capital projects, maintenance, local assistance, rail and transit.", basis: "FY2025-26 Caltrans all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf", sourceLabel: "Caltrans enacted detail", allocationEligible: false, children: [
        { id: "capital", name: "Capital projects", amount: 6_137_000_000, note: "State highway and related capital projects.", basis: "FY2025-26 Caltrans all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf", sourceLabel: "Caltrans detail", allocationEligible: false },
        { id: "local-assistance", name: "Local assistance", amount: 3_684_000_000, note: "Transportation funds passed to local projects and agencies.", basis: "FY2025-26 Caltrans all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf", sourceLabel: "Caltrans detail", allocationEligible: false },
        { id: "capital-support", name: "Capital-outlay support", amount: 2_516_000_000, note: "Planning, engineering and delivery support.", basis: "FY2025-26 Caltrans all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf", sourceLabel: "Caltrans detail", allocationEligible: false },
        { id: "maintenance", name: "Highway maintenance", amount: 1_985_000_000, note: "Maintaining the state highway system.", basis: "FY2025-26 Caltrans all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf", sourceLabel: "Caltrans detail", allocationEligible: false },
        { id: "rail-transit", name: "Rail, transit & other", amount: 4_420_000_000, note: "Passenger rail, mass transit, equipment and operations.", basis: "FY2025-26 Caltrans all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2660.pdf", sourceLabel: "Caltrans detail", allocationEligible: false },
      ] },
      { id: "chp", name: "California Highway Patrol", amount: 3_479_000_000, note: "Traffic management, inspection and vehicle security.", basis: "FY2025-26 CHP all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2720.pdf", sourceLabel: "CHP enacted detail", allocationEligible: false },
      { id: "dmv", name: "Department of Motor Vehicles", amount: 1_481_000_000, note: "Vehicle identification, licensing and driver safety.", basis: "FY2025-26 DMV all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/2500/2740.pdf", sourceLabel: "DMV enacted detail", allocationEligible: false },
    ] },
    { id: "ca-corrections", name: "Corrections", amount: 17_515_888_000, note: "Prisons, health care, parole, rehabilitation and corrections grants.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, childrenCoverage: "partial", coverageNote: "Selected CDCR all-funds program lines cover $13.635B of a broader $17.516B state-funds agency parent.", children: [
      { id: "prison-security", name: "Adult prison security", amount: 4_687_000_000, note: "Custody and security operations.", basis: "FY2025-26 CDCR all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5225.pdf", sourceLabel: "CDCR enacted detail", allocationEligible: false },
      { id: "correctional-health", name: "Prison health care", amount: 4_136_000_000, note: "Medical, mental-health, ancillary and dental care plus health administration.", basis: "FY2025-26 CDCR all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5225.pdf", sourceLabel: "CDCR enacted detail", allocationEligible: false },
      { id: "inmate-support", name: "Inmate support & administration", amount: 2_564_000_000, note: "Inmate support and institution administration.", basis: "FY2025-26 CDCR all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5225.pdf", sourceLabel: "CDCR enacted detail", allocationEligible: false },
      { id: "parole-rehab", name: "Parole, rehabilitation & other", amount: 2_248_000_000, note: "Parole, education, rehabilitation, reentry and department administration.", basis: "FY2025-26 CDCR all funds", status: "budget-authority", source: "https://ebudget.ca.gov/2025-26/pdf/Enacted/GovernorsBudget/5210/5225.pdf", sourceLabel: "CDCR enacted detail", allocationEligible: false },
    ] },
    { id: "ca-gov", name: "Government operations", amount: 17_177_676_000, note: "General Government plus Government Operations, including debt and statewide administration.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, services: ["General Government — $14.245B state funds", "Government Operations — $2.933B state funds", "Includes debt service, tax relief, statewide systems, facilities and administration"] },
    { id: "ca-courts", name: "Courts & elected branches", amount: 10_813_274_000, note: "Judicial branch, justice, constitutional officers and Legislature.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, services: ["Judicial branch and courts", "Department of Justice", "Governor and constitutional officers", "Legislature"] },
    { id: "ca-natural", name: "Natural resources", amount: 7_972_246_000, note: "Wildfire, water, parks, wildlife and conservation.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, services: ["CAL FIRE and forest resilience", "Water resources", "Parks and recreation", "Fish and wildlife", "Conservation and agency administration"] },
    { id: "ca-housing", name: "Housing, labor & environment", amount: 9_278_395_000, note: "Housing and consumer services, labor/workforce, and environmental protection.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true, children: [
      { id: "bcsh", name: "Business, consumer services & housing", amount: 2_803_889_000, note: "Housing, homelessness and business/consumer regulation.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true },
      { id: "labor", name: "Labor & workforce development", amount: 2_189_333_000, note: "Workforce services, industrial relations and employment administration.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true },
      { id: "environment", name: "Environmental protection", amount: 4_285_173_000, note: "Air, water, toxics, recycling and pesticide programs.", basis: "FY2025-26 enacted state funds", status: "budget-authority", source: caBudget, sourceLabel: "California Budget Detail", allocationEligible: true },
    ] },
  ],
};

const countyPayments = {
  behavioral: [
    { name: "Momentum for Health", payer: "Santa Clara County Behavioral Health Services", period: "2025-07-01 to 2026-06-30", status: "contract-value", amount: 63_579_299, note: "Active PO/contract value for health-care services. This is not verified as paid and may not be fully used.", source: "https://files.santaclaracounty.gov/exjcpb1596/2026-02/official-sa-bc-report-for-month-of-december-2025_0.pdf", sourceLabel: "County active-contract register" },
    { name: "Telecare Corporation", payer: "Santa Clara County Behavioral Health Services", period: "2025-07-01 to 2026-06-30", status: "contract-value", amount: 20_355_000, note: "Active PO/contract value for behavioral-health care. It is not verified cash paid.", source: "https://files.santaclaracounty.gov/exjcpb1596/2026-02/official-sa-bc-report-for-month-of-december-2025_0.pdf", sourceLabel: "County active-contract register" },
  ] satisfies PaymentRecord[],
  families: [
    { name: "Rebekah Children's Services", payer: "Santa Clara County Social Services Agency", period: "2024-07-01 to 2026-06-30", status: "contract-value", amount: 18_522_000, note: "Active PO value across a two-year term. The register does not show how much cash was paid.", source: "https://files.santaclaracounty.gov/exjcpb1596/2026-02/official-sa-bc-report-for-month-of-december-2025_0.pdf", sourceLabel: "County active-contract register" },
  ] satisfies PaymentRecord[],
  sheriff: [
    { name: "Motorola Inc.", payer: "Santa Clara County Sheriff's Office", period: "2012-09-27 to 2028-12-31", status: "contract-value", amount: 1_505_832.67, note: "Sheriff-unit PO value under a long multi-agency radio agreement. It is not verified as paid.", source: "https://files.santaclaracounty.gov/exjcpb1596/2026-02/official-sa-bc-report-for-month-of-december-2025_0.pdf", sourceLabel: "County active-contract register", financialContext: "Motorola Solutions reported $11.682B of worldwide 2025 net sales. That company revenue is unrelated to how much this County PO paid.", financialSource: "https://www.sec.gov/Archives/edgar/data/68505/000006850526000010/msi-20251231.htm" },
  ] satisfies PaymentRecord[],
  health: [
    { name: "Emergency Physicians Associates", payer: "Santa Clara Valley Healthcare", period: "Board-approved in 2023; FY2024-25 budget review", status: "encumbrance", amount: 10_700_000, amountLabel: "Encumbered in accounting review", secondaryAmount: 51_500_000, secondaryLabel: "Multi-year contract ceiling", note: "The audit found $10.7M encumbered against a $51.5M multi-year contract. Encumbered means reserved/committed—not confirmed cash paid.", source: "https://files.santaclaracounty.gov/exjcpb1666/2025-05/management-audit-division-review-of-fy-2025-26-recommended-budget.pdf", sourceLabel: "County Management Audit review" },
    { name: "South Bay Emergency Physicians — obsolete duplicate line", payer: "Santa Clara Valley Healthcare", period: "FY2024-25 review", status: "reported-actual-expenditure", amount: 0, amountLabel: "Actual expenditure reported", note: "The County audit explicitly reported $0 actual expenditure on this obsolete duplicate budget line and recommended removing its $12.97M budget line. This is a rare case where an actual amount is stated.", source: "https://files.santaclaracounty.gov/exjcpb1666/2025-05/management-audit-division-review-of-fy-2025-26-recommended-budget.pdf", sourceLabel: "County Management Audit review" },
  ] satisfies PaymentRecord[],
};

const county: SpendingLayer = {
  id: "county", name: "Santa Clara County", label: "Santa Clara County FY2025-26 adopted net expenditure", shortLabel: "County",
  amount: 13_043_340_365, note: "County spending authority after removing internal reimbursements to avoid double counting.",
  description: "This is an adopted appropriation view, not completed-year actual cash spending. It includes federal/state aid, service charges, transfers and fund balance as well as local taxes.",
  basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget book", personalAllocation: false, allocationEligible: true,
  caveat: "County percentages describe the full adopted net-expenditure budget, not your property-tax bill. Contractor values come from separate registers or audits and carry their own payment-status labels.",
  children: [
    { id: "scc-health", name: "County Health System", amount: 7_125_878_095, note: "Hospitals and clinics, Valley Health Plan, behavioral health and public health.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget", allocationEligible: true, payments: [...countyPayments.health, ...countyPayments.behavioral], children: [
      { id: "scvh", name: "Santa Clara Valley Healthcare", amount: 4_477_094_429, note: "Four hospitals and their clinics; a reconciled facility split is not yet available.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 921", allocationEligible: true, payments: countyPayments.health, services: ["Santa Clara Valley Medical Center", "O'Connor Hospital", "Saint Louise Regional Hospital", "Regional Medical Center", "Associated outpatient clinics"] },
      { id: "vhp", name: "Valley Health Plan", amount: 1_376_083_312, note: "County-operated health plan budget unit.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 725", allocationEligible: true },
      { id: "behavioral", name: "Behavioral Health Services", amount: 862_509_786, note: "Mental-health and substance-use services, crisis response and contracted providers.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 415", allocationEligible: true, payments: countyPayments.behavioral, services: ["Adult and older-adult services", "Children, youth and family services", "988, crisis and mobile response", "Substance-use treatment", "Forensic, diversion and reintegration", "Contracted community providers"] },
      { id: "public-health", name: "Public Health", amount: 186_967_131, note: "Disease control, family health, labs, epidemiology and vital records.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 410", allocationEligible: true, services: ["Communicable-disease control and immunization", "Sexual health, HIV and harm reduction", "Maternal, child and family health", "Public-health laboratory", "Pharmacy and vaccination", "Vital records, epidemiology and data"] },
      { id: "custody-health", name: "Custody Health", amount: 174_251_198, note: "Health services for people in County custody.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 414", allocationEligible: true },
      { id: "other-health", name: "Environmental Health, EMS & Maddy Fund", amount: 48_972_239, note: "Environmental-health regulation and emergency-medical-service units.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget units 261, 420 and 409", allocationEligible: true },
    ] },
    { id: "scc-finance", name: "Finance & government", amount: 2_750_431_233, note: "Facilities, technology, debt, libraries, elections and shared government functions.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget", allocationEligible: true, children: [
      { id: "facilities", name: "Facilities & Fleet", amount: 526_944_260, note: "Buildings, vehicles and related support.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 263", allocationEligible: true },
      { id: "technology", name: "Technology Services & Solutions", amount: 415_435_491, note: "Countywide technology systems and services.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 145", allocationEligible: true },
      { id: "debt", name: "County debt service", amount: 283_516_697, note: "Principal, interest and related debt costs.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 810", allocationEligible: true },
      { id: "libraries", name: "County Library District", amount: 200_072_306, note: "County library system services and operations.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 610", allocationEligible: true },
      { id: "risk", name: "Risk Management", amount: 164_010_963, note: "Insurance, claims and countywide risk functions.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 108", allocationEligible: true },
      { id: "executive", name: "Office of County Executive", amount: 114_603_868, note: "County executive leadership and coordination.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 107", allocationEligible: true },
      { id: "elections", name: "Registrar of Voters", amount: 56_916_509, note: "Election administration and voter services.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 140", allocationEligible: true },
      { id: "other-finance", name: "Other finance & government", amount: 988_931_139, note: "Remaining reconciled finance/government units, including offsets and transfers.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget", allocationEligible: true },
    ] },
    { id: "scc-families", name: "Children, seniors & families", amount: 1_376_597_543, note: "Social services, in-home support, categorical aid and child support.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget", allocationEligible: true, payments: countyPayments.families, children: [
      { id: "ssa", name: "Social Services Agency", amount: 764_831_464, note: "Adult, family, employment, benefit and veterans services.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 501", allocationEligible: true, payments: countyPayments.families, services: ["Aging and Adult Services", "Employment and Benefit Services", "Family and Children's Services", "Veterans Services", "Agency administration"] },
      { id: "ihss", name: "In-Home Supportive Services costs", amount: 360_126_999, note: "Program costs supporting eligible people in their homes.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 116", allocationEligible: true },
      { id: "aid", name: "Categorical aid payments", amount: 218_696_292, note: "Eligibility-based cash and other aid payments.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 511", allocationEligible: true },
      { id: "child-support", name: "Child Support Services", amount: 32_942_788, note: "Child-support establishment and enforcement.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 200", allocationEligible: true },
    ] },
    { id: "scc-safety", name: "Public safety & justice", amount: 1_177_596_302, note: "Sheriff, custody, probation, prosecution, defense and justice operations.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget", allocationEligible: true, payments: countyPayments.sheriff, children: [
      { id: "custody235", name: "Sheriff Custody Bureau — unit 235", amount: 244_163_041, note: "One of two separately reported custody budget units.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 235", allocationEligible: true },
      { id: "sheriff", name: "Office of the Sheriff", amount: 242_424_931, note: "Law-enforcement operations outside the separate custody units.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 230", allocationEligible: true, payments: countyPayments.sheriff },
      { id: "probation", name: "Probation", amount: 242_039_571, note: "Adult and juvenile probation services.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 246", allocationEligible: true },
      { id: "da", name: "District Attorney", amount: 185_240_371, note: "Prosecution and related services.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 202", allocationEligible: true },
      { id: "custody240", name: "Sheriff Custody Bureau — unit 240", amount: 95_101_667, note: "The second separately reported custody budget unit.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 240", allocationEligible: true },
      { id: "defender", name: "Public Defender", amount: 90_502_953, note: "Legal defense for eligible clients.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 204", allocationEligible: true },
      { id: "justice-other", name: "Systemwide, pretrial & medical examiner", amount: 78_123_768, note: "Justice-system costs, pretrial services and medical examiner.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget units 217, 210 and 293", allocationEligible: true },
    ] },
    { id: "scc-land", name: "Housing, land, environment & transportation", amount: 612_837_192, note: "Fire, housing, parks, roads, planning and environmental services.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget", allocationEligible: true, children: [
      { id: "central-fire", name: "Central Fire Protection District", amount: 184_229_673, note: "Fire protection and emergency response.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 904", allocationEligible: true },
      { id: "supportive-housing", name: "Office of Supportive Housing", amount: 112_079_895, note: "Housing programs and homelessness response.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 168", allocationEligible: true },
      { id: "parks", name: "Parks & Recreation", amount: 102_644_632, note: "County parks, trails and recreation.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 710", allocationEligible: true },
      { id: "roads", name: "Roads", amount: 98_106_513, note: "Unincorporated roads, expressways, bridges and signals.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County budget unit 603", allocationEligible: true, services: ["Administration and finance", "Infrastructure development", "Road and signal operations", "635 miles of unincorporated roads and 62 expressway miles", "168 bridges and 164 signalized intersections"] },
      { id: "land-other", name: "Environment, planning, districts & airports", amount: 115_776_479, note: "Environmental protection, planning, fire/vector/sanitation districts and airports.", basis: "FY2025-26 adopted net expenditure", status: "budget-authority", source: countyBudget, sourceLabel: "County adopted budget units", allocationEligible: true },
    ] },
  ],
};

export const spendingLayers: Record<LayerKey, SpendingLayer> = { federal, state, county };

export const moneyStatusLabels: Record<MoneyStatus, string> = {
  "actual-outlay": "Actual government outlay",
  "gross-program-cost": "Gross program cost",
  "budget-authority": "Budget authority / planned spending",
  "posted-expenditure": "Posted expenditure — settlement not confirmed",
  "reported-award-outlay": "Reported paid / award outlay",
  "reported-actual-expenditure": "Reported actual expenditure",
  obligation: "Obligated / legally committed",
  "contract-value": "Contract or PO value — not verified paid",
  encumbrance: "Encumbered / reserved — not verified paid",
  "company-revenue": "Company-wide revenue context",
  "service-only": "Service label — no amount assigned",
};
