# Tasks

## 1. Project foundation

- [ ] 1.1 Scaffold the React, TypeScript, and Vite application with a GitHub Pages-safe base configuration and verify `npm run build` emits static assets.
- [ ] 1.2 Add focused test tooling and scripts and verify the deterministic test command executes without a browser or network.
- [ ] 1.3 Create the application shell, global reset, responsive layout primitives, and original warm tactile design tokens, then verify the title and main play surface render at desktop and mobile widths.

## 2. Deterministic game domain

- [ ] 2.1 Add curated five-letter answer, guess, and themed lexicons that include `AROSE`, common plurals, regular past tenses, and `BROKE`, then verify representative acceptance tests pass.
- [ ] 2.2 Implement pure duplicate-aware guess evaluation and verify tests cover exact, present, absent, and surplus repeated letters.
- [ ] 2.3 Implement round state transitions, seedable answer selection, six-attempt Classic limits, and terminal win/loss behavior, then verify unit tests cover each outcome.
- [ ] 2.4 Implement hard-mode constraint validation for discovered exact and present letters, including duplicates, and verify invalid guesses do not consume attempts.
- [ ] 2.5 Implement mode configuration for Classic, Speed Wordle, and Two-Guess Challenge, including deadline expiry and attempt limits, and verify mode-specific unit tests pass.

## 3. Persistence and hints

- [ ] 3.1 Implement versioned local persistence with validation for preferences, active round, and expired timer restoration, then verify serialization and restoration tests pass.
- [ ] 3.2 Implement statistics and streak updates that occur once per finished round, then verify wins, losses, and streaks with unit tests.
- [ ] 3.3 Add optional themed answer selection, crossword-style clue metadata, earned correct-placement hint progress, and one non-spoiler reveal, then verify the hint threshold and no-answer-letter rule with tests.

## 4. Accessible game interface

- [ ] 4.1 Render the grid, feedback states, status announcements, and round-end/replay controls from domain state, then verify a solved and lost round render correctly.
- [ ] 4.2 Add physical-keyboard and semantic on-screen-keyboard input with focusable, labeled keys and state feedback, then verify a five-letter keyboard submission through a browser flow.
- [ ] 4.3 Add mode/theme selection, timer, hints, statistics, and settings controls, then verify each setting applies immediately and persists after reload.
- [ ] 4.4 Implement the distinct tactile visual system with original abstract texture, aqua/coral/violet/warm-paper palette, rounded ink-bordered tiles, and responsive mobile/desktop presentation; verify no reference text, assets, layout, or puzzle content is used.
- [ ] 4.5 Add reduced-motion and color-blind-friendly presentation plus optional user-initiated synthesized sound effects, then verify reduced-motion and alternate-state UI flows in a browser.

## 5. Delivery verification and documentation

- [ ] 5.1 Write the README with setup, controls, all modes, hints, valid-word policy, accessibility, persistence, test/build/deployment commands, and a labeled live-demo URL placeholder; verify each required section is present.
- [ ] 5.2 Add GitHub Pages deployment documentation or workflow configuration appropriate to the repository and verify the production build remains deployable as static assets.
- [ ] 5.3 Run the full unit-test suite and production build, then fix any failures and verify both commands succeed.
- [ ] 5.4 Start the documented local server and use Playwright to verify Classic physical/on-screen input, Speed timer/replay, Two-Guess limit, settings persistence, and responsive mobile rendering without console errors.
