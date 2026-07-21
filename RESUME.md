# Resume checkpoint — Tax Dollars Explorer

## Goal

Build and publish a public, privacy-first website that helps people understand why their taxes are high and where estimated tax dollars go. First release covers Santa Clara County, California; architecture should support all U.S. states and counties.

## Product decisions captured

- Public tool for everyone, especially friends comparing California with other states.
- Primary question: “Why am I paying so much in taxes?”
- Inputs: income, filing status, household/dependents, work arrangement/employer type, and Santa Clara County location context.
- Explain federal income, California income, employee payroll taxes, and local/property/sales-tax context separately.
- Translate estimates into spending categories and visible services such as schools, buses, roads/street cleaning, transit, libraries, parks, and public safety.
- Clearly distinguish taxes collected from budgets spent; show assumptions, sources, and educational-not-tax-advice language.
- Keep personal inputs in the browser; do not store addresses or employer details.

## Current state

- Sites starter initialized.
- Dependencies installed with pnpm because the bundled runtime does not expose npm.
- Development server should run at http://localhost:3000/ in retained session 34187.

## Remaining work

1. Verify current primary-source tax brackets and federal/California/Santa Clara spending percentages.
2. Implement the interactive single-page calculator and extensible jurisdiction data model.
3. Build and validate.
4. Create/push/save/deploy through Sites.
5. Schedule a conservative follow-up automation for nationwide expansion after confirming cadence and usage constraints.

## Review findings incorporated

- County budget mix is no longer applied to a user's full property-tax bill.
- Joint filers can separate spouse wages for the per-worker Social Security cap.
- The dependent input now asks only for qualifying children under 17 and applies the federal income phaseout.
- Self-employed mode is explicitly partial and excludes W-2 payroll tax rather than presenting it as correct.
- Version, coverage, privacy, source policy, and bounded expansion-loop files now exist.

## External blockers

- GitHub CLI is not installed in this environment. A public GitHub repository cannot be created or pushed until `gh` is installed and authenticated.
- The user has not yet confirmed the proposed weekly/monthly/quarterly automation cadence, so no recurring task has been activated.
