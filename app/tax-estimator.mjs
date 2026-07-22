const federal = {
  single: { deduction: 15750, brackets: [[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[Infinity,.37]] },
  joint: { deduction: 31500, brackets: [[23850,.10],[96950,.12],[206700,.22],[394600,.24],[501050,.32],[751600,.35],[Infinity,.37]] },
  head: { deduction: 23625, brackets: [[17000,.10],[64850,.12],[103350,.22],[197300,.24],[250500,.32],[626350,.35],[Infinity,.37]] },
};

const california = {
  single: { deduction: 5706, brackets: [[11079,.01],[26264,.02],[41452,.04],[57542,.06],[72724,.08],[371479,.093],[445771,.103],[742953,.113],[Infinity,.123]] },
  joint: { deduction: 11412, brackets: [[22158,.01],[52528,.02],[82904,.04],[115084,.06],[145448,.08],[742958,.093],[891542,.103],[1485906,.113],[Infinity,.123]] },
  head: { deduction: 11412, brackets: [[22173,.01],[52530,.02],[67716,.04],[83805,.06],[98990,.08],[505208,.093],[606251,.103],[1010417,.113],[Infinity,.123]] },
};

function progressiveTax(taxable, brackets) {
  let total = 0;
  let floor = 0;
  for (const [ceiling, rate] of brackets) {
    const slice = Math.max(0, Math.min(taxable, ceiling) - floor);
    total += slice * rate;
    if (taxable <= ceiling) break;
    floor = ceiling;
  }
  return total;
}

function allocateJoint(value, userShare) {
  const user = value * userShare;
  return [user, value - user];
}

function employeePayroll(wages) {
  return {
    socialSecurity: Math.min(wages, 176100) * .062,
    medicare: wages * .0145,
    sdi: wages * .012,
  };
}

/** Calculate one household return and a transparent wage-share allocation. */
export function calculateEstimate({ income, status, dependents, spouseWages, employer, housing, propertyTax }) {
  const householdIncome = Math.max(0, income);
  const spouseIncome = status === "joint" ? Math.min(householdIncome, Math.max(0, spouseWages)) : 0;
  const userIncome = householdIncome - spouseIncome;
  const userShare = householdIncome ? userIncome / householdIncome : (status === "joint" ? .5 : 1);

  const fedTaxable = Math.max(0, householdIncome - federal[status].deduction);
  const caTaxable = Math.max(0, householdIncome - california[status].deduction);
  const creditThreshold = status === "joint" ? 400000 : 200000;
  const creditReduction = Math.ceil(Math.max(0, householdIncome - creditThreshold) / 1000) * 50;
  const childCredit = Math.min(progressiveTax(fedTaxable, federal[status].brackets), Math.max(0, dependents * 2200 - creditReduction));
  const fed = Math.max(0, progressiveTax(fedTaxable, federal[status].brackets) - childCredit);
  const caCredit = (status === "joint" ? 306 : 153) + dependents * 475;
  const ca = Math.max(0, progressiveTax(caTaxable, california[status].brackets) - caCredit + Math.max(0, caTaxable - 1000000) * .01);

  const baseUserPayroll = employeePayroll(userIncome);
  const baseSpousePayroll = employeePayroll(spouseIncome);
  const medicareThreshold = status === "joint" ? 250000 : 200000;
  const additionalMedicare = Math.max(0, householdIncome - medicareThreshold) * .009;
  const [userAdditionalMedicare, spouseAdditionalMedicare] = allocateJoint(additionalMedicare, userShare);
  const userPayroll = employer === "self" ? 0 : baseUserPayroll.socialSecurity + baseUserPayroll.medicare + baseUserPayroll.sdi + userAdditionalMedicare;
  const spousePayroll = employer === "self" ? 0 : baseSpousePayroll.socialSecurity + baseSpousePayroll.medicare + baseSpousePayroll.sdi + spouseAdditionalMedicare;
  const payroll = userPayroll + spousePayroll;
  const property = housing === "own" ? Math.max(0, propertyTax) : 0;

  const [userFed, spouseFed] = allocateJoint(fed, userShare);
  const [userCa, spouseCa] = allocateJoint(ca, userShare);
  const [userProperty, spouseProperty] = allocateJoint(property, userShare);
  const user = { income: userIncome, fed: userFed, ca: userCa, payroll: userPayroll, property: userProperty };
  const spouse = { income: spouseIncome, fed: spouseFed, ca: spouseCa, payroll: spousePayroll, property: spouseProperty };
  user.total = user.fed + user.ca + user.payroll + user.property;
  spouse.total = spouse.fed + spouse.ca + spouse.payroll + spouse.property;

  const total = user.total + spouse.total;
  return { fed, ca, payroll, property, total, rate: householdIncome ? total / householdIncome * 100 : 0, takeHome: Math.max(0, householdIncome - total), householdIncome, user, spouse };
}

