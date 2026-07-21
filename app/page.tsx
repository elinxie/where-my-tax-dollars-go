"use client";

import { useMemo, useState } from "react";

type FilingStatus = "single" | "joint" | "head";
type Bracket = [number, number];

const federal: Record<FilingStatus, { deduction: number; brackets: Bracket[] }> = {
  single: { deduction: 15750, brackets: [[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[Infinity,.37]] },
  joint: { deduction: 31500, brackets: [[23850,.10],[96950,.12],[206700,.22],[394600,.24],[501050,.32],[751600,.35],[Infinity,.37]] },
  head: { deduction: 23625, brackets: [[17000,.10],[64850,.12],[103350,.22],[197300,.24],[250500,.32],[626350,.35],[Infinity,.37]] },
};

const california: Record<FilingStatus, { deduction: number; brackets: Bracket[] }> = {
  single: { deduction: 5706, brackets: [[11079,.01],[26264,.02],[41452,.04],[57542,.06],[72724,.08],[371479,.093],[445771,.103],[742953,.113],[Infinity,.123]] },
  joint: { deduction: 11412, brackets: [[22158,.01],[52528,.02],[82904,.04],[115084,.06],[145448,.08],[742958,.093],[891542,.103],[1485906,.113],[Infinity,.123]] },
  head: { deduction: 11412, brackets: [[22173,.01],[52530,.02],[67716,.04],[83805,.06],[98990,.08],[505208,.093],[606251,.103],[1010417,.113],[Infinity,.123]] },
};

const spending = {
  federal: [
    ["Social Security",21,"Retirement & disability"], ["Medicare",14,"Health coverage for older adults"],
    ["Interest",14,"Past borrowing"], ["National defense",13,"Military & defense"], ["Medicaid & health",13,"Health programs"],
    ["Income security",8,"Food, housing & income aid"], ["Veterans",4,"Benefits & care"], ["Education",3,"Federal education programs"],
    ["Transportation",2,"Highways, transit & aviation"], ["Everything else",8,"Science, diplomacy, justice & more"],
  ],
  state: [
    ["Health & human services",41.4,"Medi-Cal, public health & support"], ["K–12 education",25.6,"Schools and education funding"],
    ["Higher education",7.3,"UC, CSU & community colleges"], ["Transportation",6.2,"Roads, rail & transit"],
    ["Corrections",5.5,"Prisons & rehabilitation"], ["Government operations",5.3,"Statewide administration"],
    ["Courts & elected branches",3.4,"Courts and state leadership"], ["Natural resources",2.5,"Parks, water & wildfire resilience"],
    ["Housing, labor & environment",2.8,"Housing, jobs & environmental protection"],
  ],
  county: [
    ["Health & hospitals",55,"Valley Health, behavioral & public health"], ["Finance & operations",21,"County operations and shared services"],
    ["Public safety & justice",12,"Sheriff, courts, jail & reentry"], ["Social services",7,"Children, families & safety net"],
    ["Land, environment & roads",3,"County roads, planning & environment"], ["Other services",2,"Libraries, elections & community programs"],
  ],
} as const;

function progressiveTax(taxable: number, brackets: readonly Bracket[]) {
  let total = 0, floor = 0;
  for (const [ceiling, rate] of brackets) {
    const slice = Math.max(0, Math.min(taxable, ceiling) - floor);
    total += slice * rate;
    if (taxable <= ceiling) break;
    floor = ceiling;
  }
  return total;
}

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const pct = (value: number) => `${value.toFixed(1)}%`;

export default function Home() {
  const [income, setIncome] = useState(140000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [dependents, setDependents] = useState(0);
  const [spouseWages, setSpouseWages] = useState(0);
  const [employer, setEmployer] = useState("private");
  const [employerState, setEmployerState] = useState("NJ");
  const [housing, setHousing] = useState("rent");
  const [propertyTax, setPropertyTax] = useState(0);
  const [city, setCity] = useState("San Jose");
  const [layer, setLayer] = useState<keyof typeof spending>("federal");

  const result = useMemo(() => {
    const fedTaxable = Math.max(0, income - federal[status].deduction);
    const caTaxable = Math.max(0, income - california[status].deduction);
    const creditThreshold = status === "joint" ? 400000 : 200000;
    const creditReduction = Math.ceil(Math.max(0, income - creditThreshold) / 1000) * 50;
    const childCredit = Math.min(progressiveTax(fedTaxable, federal[status].brackets), Math.max(0, dependents * 2200 - creditReduction));
    const fed = Math.max(0, progressiveTax(fedTaxable, federal[status].brackets) - childCredit);
    const caCredit = (status === "joint" ? 306 : 153) + dependents * 475;
    const ca = Math.max(0, progressiveTax(caTaxable, california[status].brackets) - caCredit + Math.max(0, caTaxable - 1000000) * .01);
    const firstEarnerWages = status === "joint" ? Math.max(0, income - spouseWages) : income;
    const socialSecurity = (Math.min(firstEarnerWages, 176100) + (status === "joint" ? Math.min(spouseWages, 176100) : 0)) * .062;
    const medicareThreshold = status === "joint" ? 250000 : 200000;
    const medicare = income * .0145 + Math.max(0, income - medicareThreshold) * .009;
    const sdi = income * .012;
    const payroll = employer === "self" ? 0 : socialSecurity + medicare + sdi;
    const property = housing === "own" ? propertyTax : 0;
    const total = fed + ca + payroll + property;
    return { fed, ca, payroll, property, total, rate: income ? total / income * 100 : 0, takeHome: Math.max(0, income-total) };
  }, [income, status, dependents, spouseWages, employer, housing, propertyTax]);

  const layers = [
    ["Federal income", result.fed, "National programs"], ["California income", result.ca, "State programs"],
    ["Payroll taxes", result.payroll, "Social Security, Medicare & CA SDI"], ["Property tax", result.property, "Local schools, cities & county"],
  ] as const;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Where My Tax Dollars Go home"><span>$?</span> Where My Tax Dollars Go</a>
        <nav aria-label="Primary navigation"><a href="#estimate">Your estimate</a><a href="#services">Your services</a><a href="#method">How it works</a></nav>
        <span className="location-pill">Santa Clara County · 2025</span>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><i /> A clearer receipt for public money</div>
        <h1>Why are my taxes<br/><em>so high?</em></h1>
        <p>See an understandable estimate of what you pay—and which public services those dollars support across federal, California, and Santa Clara County budgets.</p>
        <a className="primary-button" href="#estimate">Build my tax receipt <span>↓</span></a>
        <div className="privacy-note">◉ Your answers stay on this device. No account, no saved address.</div>
        <div className="hero-card" aria-hidden="true">
          <div className="receipt-head"><small>YOUR ESTIMATED RECEIPT</small><b>{money(result.total)}</b><span>of {money(income)} income · {pct(result.rate)}</span></div>
          <div className="mini-bars">
            {layers.slice(0,3).map(([name,value], i) => <div key={name}><span>{name}</span><b style={{width:`${result.total ? Math.max(8,value/result.total*100) : 8}%`, background:["#ff6647","#ffc547","#72c9a1"][i]}} /></div>)}
          </div>
          <div className="receipt-foot"><span>Biggest driver</span><strong>{layers.reduce((a,b)=>a[1]>b[1]?a:b)[0]}</strong></div>
        </div>
      </section>

      <section className="estimator" id="estimate">
        <div className="section-heading"><span>01</span><div><h2>Build your tax receipt</h2><p>A practical estimate, not a tax return. Adjust the few details that make the biggest difference.</p></div></div>
        <div className="estimator-grid">
          <form className="inputs" onSubmit={e=>e.preventDefault()}>
            <label>Approximate W-2 wages / AGI <div className="money-input"><span>$</span><input aria-label="Approximate W-2 wages or adjusted gross income" type="number" min="0" step="1000" value={income} onChange={e=>setIncome(Number(e.target.value))}/></div><small>Use combined tax-return income. This basic estimate assumes wages are close to AGI.</small></label>
            <label>Filing status <select value={status} onChange={e=>setStatus(e.target.value as FilingStatus)}><option value="single">Single</option><option value="joint">Married filing jointly</option><option value="head">Head of household</option></select></label>
            <label>Qualifying children under 17 <input type="number" min="0" max="12" value={dependents} onChange={e=>setDependents(Number(e.target.value))}/></label>
            {status === "joint" && <label>Spouse W-2 wages <div className="money-input"><span>$</span><input type="number" min="0" max={income} step="1000" value={spouseWages} onChange={e=>setSpouseWages(Math.min(income,Number(e.target.value)))}/></div><small>Needed because the Social Security wage cap applies to each worker.</small></label>}
            <label>Where you live <select value={city} onChange={e=>setCity(e.target.value)}><option>San Jose</option><option>Santa Clara</option><option>Sunnyvale</option><option>Mountain View</option><option>Palo Alto</option><option>Cupertino</option><option>Other Santa Clara County</option></select><small>Service context only in this release; city does not change the estimate yet.</small></label>
            <label>Employment type <select value={employer} onChange={e=>setEmployer(e.target.value)}><option value="private">Private-sector W-2</option><option value="public">Government or public school</option><option value="nonprofit">Nonprofit W-2</option><option value="self">Self-employed / contractor</option></select><small>{employer === "self" ? "Self-employment tax is not included in this basic release." : "Your company’s name usually does not matter; work location and employer state sometimes do."}</small></label>
            <label>Employer headquarters <select value={employerState} onChange={e=>setEmployerState(e.target.value)}><option value="CA">California</option><option value="NJ">New Jersey</option><option value="OTHER">Another state</option></select><small>{employerState === "NJ" ? "If you live and physically work in California, California taxes your resident income. New Jersey has special remote-work sourcing rules, so check your W-2 withholding or a tax professional if NJ tax appears." : "This is a warning flag only; it does not change the basic California estimate."}</small></label>
            <fieldset><legend>Housing</legend><div className="segmented"><button type="button" className={housing==="rent"?"active":""} onClick={()=>setHousing("rent")}>Rent</button><button type="button" className={housing==="own"?"active":""} onClick={()=>setHousing("own")}>Own</button></div></fieldset>
            {housing === "own" && <label>Annual property tax <div className="money-input"><span>$</span><input type="number" min="0" step="100" value={propertyTax} onChange={e=>setPropertyTax(Number(e.target.value))}/></div></label>}
          </form>

          <div className="results" aria-live="polite">
            <p className="result-label">ESTIMATED 2025 TAXES</p>
            <div className="big-number">{money(result.total)}</div>
            <div className="rate-line"><strong>{pct(result.rate)}</strong> effective rate <span>·</span> about {money(result.total/12)}/month</div>
            <div className="stack" aria-label="Tax breakdown">{layers.map(([name,value],i)=><i key={name} title={`${name}: ${money(value)}`} style={{width:`${result.total?value/result.total*100:0}%`,background:["#fb6548","#f4b942","#68bea0","#7397d4"][i]}} />)}</div>
            <div className="layer-list">{layers.map(([name,value,note],i)=><div key={name}><i style={{background:["#fb6548","#f4b942","#68bea0","#7397d4"][i]}}/><span><b>{name}</b><small>{note}</small></span><strong>{money(value)}</strong></div>)}</div>
            {employer === "self" && <div className="why-box"><b>Partial estimate</b><p>Self-employment tax is not included yet, so payroll tax is shown as $0 and the total is incomplete. Use the W-2 option only if you receive W-2 wages.</p></div>}
            <div className="why-box"><b>Why it feels high</b><p>California stacks a progressive state income tax and State Disability Insurance on top of federal income and payroll taxes. Its standard deduction is also much smaller than the federal one.</p></div>
            <div className="take-home"><span>Estimated after these taxes</span><strong>{money(result.takeHome)}</strong></div>
          </div>
        </div>
      </section>

      <section className="where" id="services">
        <div className="section-heading light"><span>02</span><div><h2>Where the dollars go</h2><p>Choose a government layer. We apply its enacted budget mix to your estimated tax at that layer.</p></div></div>
        <div className="tabs" aria-label="Choose a government budget layer">{(["federal","state","county"] as const).map(k=><button type="button" aria-pressed={layer===k} className={layer===k?"active":""} onClick={()=>setLayer(k)} key={k}>{k === "state" ? "California" : k[0].toUpperCase()+k.slice(1)}</button>)}</div>
        <div className="allocation-grid">
          <div className="donut" style={{background:`conic-gradient(${spending[layer].map((x,i)=>`${["#ff684b","#ffc64a","#72c9a3","#7aa2dc","#b697d6","#e58fb2","#78b8c4","#d7a85e","#8c99a6","#c3cc9a"][i]} ${spending[layer].slice(0,i).reduce((s,a)=>s+a[1],0)}% ${spending[layer].slice(0,i+1).reduce((s,a)=>s+a[1],0)}%`).join(",")})`}}><div><b>{layer === "federal" ? money(result.fed) : layer === "state" ? money(result.ca) : "Budget mix"}</b><span>{layer === "county" ? "not your tax bill" : "illustrative share"}</span></div></div>
          <div className="allocations">{spending[layer].map(([name,share,note],i)=>{const base=layer==="federal"?result.fed:result.ca;return <div key={name}><i style={{background:["#ff684b","#ffc64a","#72c9a3","#7aa2dc","#b697d6","#e58fb2","#78b8c4","#d7a85e","#8c99a6","#c3cc9a"][i]}}/><span><b>{name}</b><small>{note}</small></span><strong>{layer === "county" ? "—" : money(base*share/100)}</strong><em>{share}%</em></div>})}</div>
        </div>
        <p className="caveat">Illustrative equivalent share of published outlays—not a literal tracing of your payment. County percentages describe its full net-expenditure budget; your property-tax bill is split among schools, cities, the county, and special districts, so no personal county dollar amount is shown.</p>
      </section>

      <section className="services-section">
        <div className="section-heading"><span>03</span><div><h2>“But what do I actually get?”</h2><p>Taxes fund systems, not a personal bundle. Service visibility also depends on your city, school district, eligibility, and how often you need a program.</p></div></div>
        <div className="service-grid">
          {[
            ["School buses","Not universal","California districts generally decide routes based on local budgets, distance and student needs."],
            ["Street cleaning","City service",`${city} sets schedules and service levels; this is usually not a county program.`],
            ["Roads & transit","Split responsibility","Cities maintain most local streets; the state handles highways; VTA operates county transit."],
            ["Health care","Large, less visible","More than half of Santa Clara County’s budget supports its hospital and health system."],
            ["Schools","Mostly state + local","California’s state budget sends major funding to K–12; property tax also supports local districts."],
            ["Safety net","Eligibility based","Disability insurance, Medi-Cal, food support and housing programs are most visible when needed."],
          ].map(([title,badge,text])=><article key={title}><span>{badge}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="comparison"><div><small>COMING NEXT</small><h3>California vs. other states</h3><p>A fair comparison needs both sides of the ledger: total taxes and comparable services, adjusted for income, housing, family size, and local cost.</p></div><div className="states"><b>CA</b><span>vs</span><i>WA</i><i>TX</i><i>NY</i><i>MA</i></div></div>
      </section>

      <section className="method" id="method">
        <div><span>ABOUT THIS ESTIMATE</span><h2>Transparent by design.</h2></div>
        <div className="method-grid"><p><b>What’s included</b>2025 federal and California standard deductions and progressive brackets; employee Social Security, Medicare, and California SDI; optional property tax.</p><p><b>What’s not included</b>Itemized deductions, most credits, investment income, AMT, sales/excise taxes, employer-paid taxes, and self-employment adjustments.</p><p><b>Source years</b>Tax rules: 2025. Federal categories: current broad functional mix. California and Santa Clara County budgets: FY 2025–26 enacted/adopted plans.</p></div>
        <div className="source-links"><b>Primary sources</b><a href="https://www.irs.gov/irb/2024-45_IRB" target="_blank" rel="noreferrer">IRS tax brackets ↗</a><a href="https://www.ftb.ca.gov/forms/2025/2025-540-booklet.html" target="_blank" rel="noreferrer">California tax rules ↗</a><a href="https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail" target="_blank" rel="noreferrer">California enacted budget ↗</a><a href="https://data.sccgov.org/stories/s/Fiscal-Year-2025-26-Adopted-Budget/bqmh-662y/" target="_blank" rel="noreferrer">Santa Clara County budget ↗</a><a href="https://www.usaspending.gov/explorer" target="_blank" rel="noreferrer">Federal spending explorer ↗</a><a href="https://github.com/elinxie/where-my-tax-dollars-go" target="_blank" rel="noreferrer">Open source, methods & releases ↗</a></div>
        <p className="disclaimer">Educational estimate only—not tax, legal, or financial advice and not for filing or tax planning. Not affiliated with or endorsed by any government agency. Sources can be revised. “Where it goes” is an illustrative allocation based on published budgets, not a claim that your individual payment is earmarked.</p>
      </section>
      <footer><a className="brand" href="#top"><span>$?</span> Where My Tax Dollars Go</a><p>Built for public understanding. Your inputs stay in your browser.</p><p>Santa Clara County · v1</p></footer>
    </main>
  );
}
