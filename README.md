# Where My Tax Dollars Go

A public, privacy-first educational calculator that explains why a tax bill can feel high and shows illustrative federal, California, and Santa Clara County budget shares.

## Current coverage

- Tax year: 2025
- Geography: Santa Clara County, California
- Filing: basic W-2 scenarios for single, head-of-household, and joint filers
- Spending: broad published federal categories and FY 2025–26 California and Santa Clara County budget categories

Inputs remain in browser memory. The site does not request a street address or employer name. It is an educational estimate, not tax, legal, or financial advice.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm run build
npm test
```

## Versioning

- Application versions use semantic versioning.
- Data releases use `taxYear.release.patch`, beginning with `2025.1.0`.
- Published data releases are immutable; corrections create a patch version.

See [CHANGELOG.md](CHANGELOG.md), [SOURCES.md](SOURCES.md), [docs/METHODOLOGY.md](docs/METHODOLOGY.md), [docs/SOURCE_POLICY.md](docs/SOURCE_POLICY.md), and [data/coverage.json](data/coverage.json).

## Contributing

New jurisdictions must use primary government sources, state effective dates and exact tables, document any derivation, pass boundary and percentage-total tests, and receive independent review before release. Start with [CONTRIBUTING.md](CONTRIBUTING.md) and the [data contribution guide](docs/DATA_CONTRIBUTING.md).
