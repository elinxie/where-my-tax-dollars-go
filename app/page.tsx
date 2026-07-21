"use client";

import { useMemo, useState } from "react";
import { calculateEstimate } from "./tax-estimator.mjs";
import { moneyStatusLabels, spendingLayers, type LayerKey, type SpendNode } from "./spending-data";

type FilingStatus = "single" | "joint" | "head";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const compactMoney = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: value >= 1_000_000_000 ? 2 : 1 }).format(value);
const pct = (value: number) => `${value.toFixed(1)}%`;
const chartColors = ["#ff684b","#ffc64a","#72c9a3","#7aa2dc","#b697d6","#e58fb2","#78b8c4","#d7a85e","#8c99a6","#c3cc9a","#f18f6d","#96b57a"];

function resolvePath(root: SpendNode, path: string[]) {
  const nodes: SpendNode[] = [];
  let cursor = root;
  for (const id of path) {
    const child = cursor.children?.find(node => node.id === id);
    if (!child) break;
    nodes.push(child);
    cursor = child;
  }
  return nodes;
}

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
  const [layer, setLayer] = useState<LayerKey>("federal");
  const [drillPath, setDrillPath] = useState<string[]>([]);

  const result = useMemo(() => calculateEstimate({ income, status, dependents, spouseWages, employer, housing, propertyTax }), [income, status, dependents, spouseWages, employer, housing, propertyTax]);

  const layers = [
    ["Federal income", result.fed, "National programs"], ["California income", result.ca, "State programs"],
    ["Payroll taxes", result.payroll, "Social Security, Medicare & CA SDI"], ["Property tax", result.property, "Local schools, cities & county"],
  ] as const;

  const spendingRoot = spendingLayers[layer];
  const pathNodes = resolvePath(spendingRoot, drillPath);
  const currentNode = pathNodes.at(-1) ?? spendingRoot;
  const displayedNodes = currentNode.children ?? [];
  const displayedTotal = displayedNodes.reduce((sum, node) => sum + (node.amount ?? 0), 0);
  const childrenAreComplete = (currentNode.childrenCoverage ?? "complete") === "complete";
  const baseTax = layer === "federal" ? result.fed : result.ca;
  const pathCanAllocate = layer !== "county" && pathNodes.every(node => node.allocationEligible !== false);
  const currentPersonalAmount = pathCanAllocate && currentNode.amount && spendingRoot.amount ? baseTax * currentNode.amount / spendingRoot.amount : null;
  let runningShare = 0;
  const conic = displayedNodes.length && childrenAreComplete ? `conic-gradient(${displayedNodes.map((node, index) => {
    const share = displayedTotal && node.amount ? node.amount / displayedTotal * 100 : 0;
    const start = runningShare;
    runningShare += share;
    return `${chartColors[index % chartColors.length]} ${start}% ${runningShare}%`;
  }).join(",")})` : "#295d4d";

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
            <label>{status === "joint" ? "Combined household W-2 wages" : "Approximate W-2 wages / AGI"} <div className="money-input"><span>$</span><input aria-label={status === "joint" ? "Combined household W-2 wages" : "Approximate W-2 wages or adjusted gross income"} type="number" min="0" step="1000" value={income} onChange={e=>setIncome(Number(e.target.value))}/></div><small>{status === "joint" ? "Enter both spouses’ W-2 wages only; this basic estimate uses wages as an AGI proxy. Do not add interest, business, or capital-gain income." : "This basic estimate assumes wages are close to AGI."}</small></label>
            <label>Filing status <select value={status} onChange={e=>setStatus(e.target.value as FilingStatus)}><option value="single">Single</option><option value="joint">Married filing jointly</option><option value="head">Head of household</option></select></label>
            <label>Qualifying children under 17 <input type="number" min="0" max="12" value={dependents} onChange={e=>setDependents(Number(e.target.value))}/></label>
            {status === "joint" && <label>Spouse W-2 wages <div className="money-input"><span>$</span><input type="number" min="0" max={income} step="1000" value={spouseWages} onChange={e=>setSpouseWages(Math.min(income,Number(e.target.value)))}/></div><small>Needed because the Social Security wage cap applies to each worker.</small></label>}
            <label>Where you live <select value={city} onChange={e=>setCity(e.target.value)}><option>San Jose</option><option>Santa Clara</option><option>Sunnyvale</option><option>Mountain View</option><option>Palo Alto</option><option>Cupertino</option><option>Other Santa Clara County</option></select><small>Service context only in this release; city does not change the estimate yet.</small></label>
            <label>{status === "joint" ? "Household employment type" : "Employment type"} <select value={employer} onChange={e=>setEmployer(e.target.value)}><option value="private">Private-sector W-2</option><option value="public">Government or public school</option><option value="nonprofit">Nonprofit W-2</option><option value="self">Self-employed / contractor</option></select><small>{status === "joint" ? "This choice must apply to both spouses. Mixed W-2/self-employed households are not supported in this basic estimate." : employer === "self" ? "Self-employment tax is not included in this basic release." : "Your company’s name usually does not matter; work location and employer state sometimes do."}</small></label>
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
            {status === "joint" && <section className="spouse-breakdown" aria-labelledby="spouse-breakdown-title">
              <div className="household-summary"><span id="spouse-breakdown-title">Taxes use <strong>{pct(result.rate)}</strong> of your {money(result.householdIncome)} gross household budget</span><b>{money(result.takeHome)} remains after these estimated taxes</b></div>
              <div className="spouse-cards">
                {([["Your allocated burden", result.user], ["Spouse’s allocated burden", result.spouse]] as const).map(([label, person]) => <article key={label}>
                  <small>{label}</small><h3>{money(person.fed+person.ca+person.payroll+person.property)}</h3><p>from {money(person.income)} wages</p>
                  <dl><div><dt>Federal income</dt><dd>{money(person.fed)}</dd></div><div><dt>California income</dt><dd>{money(person.ca)}</dd></div><div><dt>Payroll taxes</dt><dd>{money(person.payroll)}</dd></div>{result.property > 0 && <div><dt>Property tax</dt><dd>{money(person.property)}</dd></div>}</dl>
                </article>)}
              </div>
              <div className="allocation-note"><b>How the split works</b><p>The estimator recomputes one household return using joint brackets, deductions, and credits, so switching from a single estimate can lower the previously shown amount. It then allocates joint federal and California income taxes—and shared property tax—by each spouse’s share of household wages. Payroll taxes are calculated per worker, including each worker’s Social Security wage cap. This explains the household total without pretending a joint return creates two separate tax bills.</p></div>
            </section>}
            {employer === "self" && <div className="why-box"><b>Partial estimate</b><p>Self-employment tax is not included yet, so payroll tax is shown as $0 and the total is incomplete. Use the W-2 option only if you receive W-2 wages.</p></div>}
            <div className="why-box"><b>Why it feels high</b><p>California stacks a progressive state income tax and State Disability Insurance on top of federal income and payroll taxes. Its standard deduction is also much smaller than the federal one.</p></div>
            <div className="take-home"><span>Estimated after these taxes</span><strong>{money(result.takeHome)}</strong></div>
          </div>
        </div>
      </section>

      <section className="where" id="services">
        <div className="section-heading light"><span>02</span><div><h2>Follow the money—then keep going</h2><p>Open any chart segment to move from a government-wide total into agencies, programs, services, and sourced contractor records.</p></div></div>
        <div className="tabs" aria-label="Choose a government budget layer">{(["federal","state","county"] as const).map(k=><button type="button" aria-pressed={layer===k} className={layer===k?"active":""} onClick={()=>{setLayer(k);setDrillPath([])}} key={k}>{spendingLayers[k].shortLabel}</button>)}</div>

        <div className="money-key" aria-label="How to read the money labels">
          <span><b>Paid / outlay</b> cash disbursement reported by the source</span>
          <span><b>Obligated</b> legally committed, not necessarily paid</span>
          <span><b>Budget / contract value</b> planned or maximum amount, not proof of payment</span>
        </div>

        <nav className="drill-breadcrumbs" aria-label="Spending drill-down breadcrumb">
          <button type="button" aria-current={drillPath.length===0?"page":undefined} onClick={()=>setDrillPath([])}>{spendingRoot.shortLabel}</button>
          {pathNodes.map((node,index)=><span key={node.id}><i>›</i><button type="button" aria-current={index===pathNodes.length-1?"page":undefined} onClick={()=>setDrillPath(drillPath.slice(0,index+1))}>{node.name}</button></span>)}
        </nav>

        <article className="drill-context">
          <div><span className={`status-badge status-${currentNode.status}`}>{moneyStatusLabels[currentNode.status]}</span><h3>{currentNode.name}</h3><p>{currentNode.description ?? currentNode.note}</p></div>
          <div className="official-figure"><small>{currentNode.basis}</small><strong>{currentNode.amount !== undefined ? compactMoney(currentNode.amount) : "Amount not allocated"}</strong><a href={currentNode.source} target="_blank" rel="noreferrer">{currentNode.sourceLabel} ↗</a></div>
        </article>

        {displayedNodes.length > 0 ? <>
          <div className="allocation-grid drill-allocation-grid">
            <div>
              {childrenAreComplete ? <>
              <div className="donut" style={{background:conic}}><div><b>{currentPersonalAmount !== null ? money(currentPersonalAmount) : currentNode.amount !== undefined ? compactMoney(currentNode.amount) : "Explore"}</b><span>{currentPersonalAmount !== null ? "your illustrative share" : "official program context"}</span></div></div>
              <div className="segment-chart" aria-label={`Clickable chart segments inside ${currentNode.name}`}>
                {displayedNodes.map((node,index)=>{const share=displayedTotal&&node.amount?node.amount/displayedTotal*100:0;return <button type="button" key={node.id} style={{width:`${share}%`,background:chartColors[index%chartColors.length]}} onClick={()=>setDrillPath([...drillPath,node.id])} aria-label={`Open ${node.name}, ${pct(share)}`} title={`${node.name} · ${pct(share)}`}>{share>=9?`${Math.round(share)}%`:""}</button>})}
              </div>
              <small className="chart-hint">Click a colored segment or a row to drill down.</small>
              </> : <div className="context-coverage"><span>{currentNode.childrenCoverage === "partial" ? "PARTIAL COVERAGE" : "ACCOUNTING BASIS CHANGES HERE"}</span><h3>Context, not a 100% split</h3><p>{currentNode.coverageNote ?? "These child figures do not share a reconciled denominator with their parent."}</p><b>Percentages and the pie chart are intentionally hidden.</b></div>}
            </div>
            <div className="allocations drill-allocations">{displayedNodes.map((node,index)=>{
              const share=childrenAreComplete&&displayedTotal&&node.amount?node.amount/displayedTotal*100:0;
              const showPersonal=childrenAreComplete&&pathCanAllocate&&node.allocationEligible!==false&&node.amount!==undefined&&spendingRoot.amount!==undefined;
              const value=showPersonal?money(baseTax*(node.amount??0)/(spendingRoot.amount??1)):node.amount!==undefined?compactMoney(node.amount):"Context";
              return <button type="button" className="allocation-row" onClick={()=>setDrillPath([...drillPath,node.id])} key={node.id}><i style={{background:chartColors[index%chartColors.length]}}/><span><b>{node.name}</b><small>{node.note}</small><small className="basis-line">{node.basis}</small></span><strong>{value}</strong><em>{childrenAreComplete?pct(share):"Context"}</em><u>{node.children?.length||node.services?.length||node.payments?.length?"Open →":"Details →"}</u></button>
            })}</div>
          </div>
        </> : <div className="leaf-message"><b>Deepest sourced level</b><p>No smaller reconciled amount is published in the sources used here. The services and transaction records below add context without inventing a split.</p></div>}

        {currentNode.services?.length ? <section className="service-detail" aria-labelledby="service-detail-title"><h3 id="service-detail-title">What sits inside this bracket</h3><div>{currentNode.services.map(service=><span key={service}>{service}</span>)}</div></section> : null}

        {currentNode.payments?.length ? <section className="payment-section" aria-labelledby="payment-title">
          <div className="payment-heading"><div><span>CONTRACTOR & RECIPIENT RECORDS</span><h3 id="payment-title">What was committed—and what was actually paid</h3></div><p>Sourced examples at this government or agency level—not a list of top recipients. Program linkage is shown only when the source verifies it, and the records do not add up to the bracket.</p></div>
          <div className="payment-grid">{currentNode.payments.map(record=><article key={`${record.name}-${record.amount}`}>
            <span className={`status-badge status-${record.status}`}>{moneyStatusLabels[record.status]}</span>
            <h4>{record.name}</h4><p className="payer">{record.payer} · {record.period}</p>
            <dl><div><dt>{record.amountLabel ?? moneyStatusLabels[record.status]}</dt><dd>{money(record.amount)}</dd></div>{record.secondaryAmount!==undefined?<div><dt>{record.secondaryLabel}</dt><dd>{money(record.secondaryAmount)}</dd></div>:null}</dl>
            <p>{record.note}</p>
            {record.financialContext?<p className="financial-context"><b>Company context:</b> {record.financialContext} {record.financialSource?<a href={record.financialSource} target="_blank" rel="noreferrer">Financial filing ↗</a>:null}</p>:null}
            <a className="record-source" href={record.source} target="_blank" rel="noreferrer">Open {record.sourceLabel} ↗</a>
          </article>)}</div>
        </section> : null}

        <p className="caveat">{spendingRoot.caveat}</p>
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
        <div className="method-grid"><p><b>What’s included</b>2025 federal and California standard deductions and progressive brackets; employee Social Security, Medicare, and California SDI; optional property tax.</p><p><b>What’s not included</b>Itemized deductions, most credits, investment income, AMT, sales/excise taxes, employer-paid taxes, and self-employment adjustments.</p><p><b>Source years</b>Tax rules: 2025. Federal spending: FY2024 actual OMB outlays, with some separately labeled CY2024 program views. California and Santa Clara County: FY2025–26 enacted/adopted authority.</p></div>
        <div className="source-links"><b>Primary sources</b><a href="https://www.irs.gov/irb/2024-45_IRB" target="_blank" rel="noreferrer">IRS tax brackets ↗</a><a href="https://www.ftb.ca.gov/forms/2025/2025-540-booklet.html" target="_blank" rel="noreferrer">California tax rules ↗</a><a href="https://www.whitehouse.gov/omb/information-resources/budget/historical-tables/" target="_blank" rel="noreferrer">OMB actual outlays ↗</a><a href="https://www.cms.gov/oact/tr/2025" target="_blank" rel="noreferrer">Medicare Trustees ↗</a><a href="https://ebudget.ca.gov/budget/e/2025-26/BudgetDetail" target="_blank" rel="noreferrer">California enacted budget ↗</a><a href="https://open.fiscal.ca.gov/" target="_blank" rel="noreferrer">Open FI$Cal expenditures ↗</a><a href="https://files.santaclaracounty.gov/exjcpb1271/2025-10/fiscal-year-2025-2026-adopted-budget_1.pdf" target="_blank" rel="noreferrer">Santa Clara County budget ↗</a><a href="https://www.usaspending.gov/explorer" target="_blank" rel="noreferrer">Federal awards ↗</a><a href="https://github.com/elinxie/where-my-tax-dollars-go" target="_blank" rel="noreferrer">Open source, methods & releases ↗</a></div>
        <p className="disclaimer">Educational estimate only—not tax, legal, or financial advice and not for filing or tax planning. Not affiliated with or endorsed by any government agency. Sources can be revised. “Where it goes” is an illustrative allocation based on published budgets, not a literal tracing of your payment or a claim that it is earmarked.</p>
      </section>
      <footer><a className="brand" href="#top"><span>$?</span> Where My Tax Dollars Go</a><p>Built for public understanding. Your inputs stay in your browser.</p><p>Santa Clara County · v1</p></footer>
    </main>
  );
}
