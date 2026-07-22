# Release process

1. Define the tax and fiscal-year scope in `data/coverage.json`.
2. Record primary sources and derivations in the draft data package.
3. Run the production build and automated tests.
4. Verify bracket boundaries, category totals, source links, privacy language, and disclaimers.
5. Obtain independent review for new jurisdictions or material methodology changes.
6. Update `VERSION`, `CHANGELOG.md`, `RESUME.md`, and the release manifest.
7. Publish only after the review checklist is complete; preserve the prior release unchanged.

Emergency corrections use a patch version, explain the impact, and link the corrected source.
