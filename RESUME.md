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
- Initial public release is live on Sites and has been pushed to GitHub `main`.
- Codex project: `sites-plugin-sites-openai-bundled-create` (`b4a80b83-6596-4116-b2bf-f01f1399df8b`).

## Remaining work

1. Review the project-scaffolding pull request and merge it to `main`.
2. Verify current primary-source tax brackets and federal/California/Santa Clara spending percentages before the next tax-year update.
3. Activate a conservative nationwide-expansion automation after the owner confirms a cadence.

## Review findings incorporated

- County budget mix is no longer applied to a user's full property-tax bill.
- Joint filers can separate spouse wages for the per-worker Social Security cap.
- The dependent input now asks only for qualifying children under 17 and applies the federal income phaseout.
- Self-employed mode is explicitly partial and excludes W-2 payroll tax rather than presenting it as correct.
- Version, coverage, privacy, source policy, and bounded expansion-loop files now exist.

## External blockers

- The owner has not yet confirmed the proposed weekly/monthly/quarterly automation cadence, so no recurring task has been activated.
