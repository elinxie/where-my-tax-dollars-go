# Methodology

## What the first release estimates

The app estimates 2025 federal individual income tax, California individual income tax, employee payroll taxes, and optional user-entered property tax for basic W-2 households in Santa Clara County. It uses progressive brackets after the shown standard deductions and applies the limited child-credit assumptions explained in the interface.

## What spending shares mean

Each federal or California category is an illustrative share of that government's published budget mix applied to the estimated tax at that level. This is a communication device, not earmarking: tax receipts are pooled and may fund obligations in different years. County data is shown only as a budget mix because a resident's property-tax bill is distributed across multiple local entities.

## Privacy and location

The browser holds inputs locally for the current session. The app does not request a street address or employer name. City and employer-state inputs currently provide explanatory context only unless the interface says otherwise.

## Scope exclusions

This release does not prepare a return and does not model itemizing, most credits, self-employment tax, investment income, sales/use taxes, city-specific taxes, withholding, or all interstate sourcing rules. Results are educational estimates, not tax, legal, or financial advice.

## Change control

Tax and spending inputs are versioned by tax/fiscal year. A change requires a primary source, a documented derivation, validation, and independent review for material new coverage. See `docs/SOURCE_POLICY.md`, `docs/DATA_CONTRIBUTING.md`, and `docs/RELEASE_PROCESS.md`.
