# Contributing

Thank you for helping make public-finance information clearer and more verifiable.

## Before opening a change

1. Read `SOURCES.md`, `docs/METHODOLOGY.md`, and `docs/SOURCE_POLICY.md`.
2. Keep personal data out of issues, commits, screenshots, and tests.
3. Use primary government sources for tax rules, budget figures, and service claims.
4. State the effective tax year or fiscal year, the exact table/page, and any calculation made from it.

## Data changes

Use the data-correction or new-jurisdiction issue form first. A data change must include source links, a reproducible derivation, boundary cases, and an explicit coverage status. Do not overwrite an already released data package; create a patch release.

## Code changes

Run `npm test` before opening a pull request. Keep calculation changes small, add boundary coverage, preserve the browser-only privacy model, and avoid presenting estimates as filing advice.

## Review standard

At least one independent reviewer should confirm source interpretation for a new jurisdiction or material calculation change. See `docs/RELEASE_PROCESS.md`.
