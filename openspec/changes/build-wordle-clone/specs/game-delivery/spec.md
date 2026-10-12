# Spec Delta

## Purpose

Ensure the browser game is repeatably verified, deployable as static content, and understandable by players and maintainers.

## ADDED Requirements

### Requirement: Deterministic rule verification
The project SHALL include focused automated tests covering word acceptance policy, exact/present/absent evaluation including duplicates, mode attempt limits, and hard-mode validation.

#### Scenario: Automated tests run
- **WHEN** the documented test command is executed
- **THEN** it SHALL exercise deterministic game rules without requiring a browser or network

### Requirement: Static production delivery
The project SHALL produce a static production build suitable for GitHub Pages deployment.

#### Scenario: Production build runs
- **WHEN** the documented production build command is executed
- **THEN** it SHALL complete successfully and emit deployable static assets

### Requirement: Player and deployment documentation
The README SHALL document installation, controls, modes, hints, accessibility settings, local persistence, valid-word policy, build/deployment steps, and a clearly labeled live-demo URL field.

#### Scenario: Maintainer reads the README
- **WHEN** a maintainer opens the README
- **THEN** they SHALL find the valid-word policy and the commands needed to run, test, build, and deploy the game
