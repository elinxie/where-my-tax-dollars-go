# Bounded nationwide expansion loop

Each autonomous run processes at most one state tax model or five local jurisdictions. It must never attempt all states in one run.

1. Read `RESUME.md`, `data/coverage.json`, and `docs/SOURCE_POLICY.md`.
2. Check a platform-provided usage signal if one exists. If none exists, state that clearly, read `usage/ledger.json`, and enforce its work-unit ceiling.
3. Select the next queued jurisdiction: CA review fixes, then TX, FL, NY, WA, IL, PA, OH, GA, and NC.
4. Gather only primary government sources and record effective dates and exact tables.
5. Add a draft immutable data release; do not overwrite a released package.
6. Run schema validation, bracket-boundary tests, percentage-total checks, link checks, and the production build.
7. Write a compact evidence report and request independent data and policy review.
8. Update coverage, changelog, and resume checkpoint.
9. Stop without beginning another jurisdiction.

Recommended cadence, pending owner confirmation:

- Weekly: one state tax model.
- Weekly on a separate day: one state spending/services model.
- Monthly: comparison-methodology and legal-language audit.
- Quarterly: source freshness and broken-link audit.
- Annual: tax-year rollover.

Do not publish a new data release automatically when validation or independent review fails.
