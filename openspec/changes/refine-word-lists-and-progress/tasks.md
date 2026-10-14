# Tasks

## 1. Curated answer data

- [ ] 1.1 Add a checked-in exclusion dataset for the historical original Wordle answers and verify a test rejects every overlap with the Candordle answer catalog.
- [ ] 1.2 Replace automatic dictionary-backed answers with reviewed 100-word lists for Everyday, Nature, Food, South Africa, and Psychology, then verify list length, uniqueness, category membership review markers, and non-plural answers.
- [ ] 1.3 Create the word-list audit report with each removed answer, its replacement, category, and reason, then verify every replacement appears in the catalog.
- [ ] 1.4 Add answer-specific clue and hint metadata for the reviewed catalog, then verify enabled clues do not restate category or word length.

## 2. Mode and category progress

- [ ] 2.1 Replace category-only persisted progress with mode-and-category records and migrate existing records to Classic mode, then verify migration unit tests preserve values.
- [ ] 2.2 Select the next answer from the active mode-and-category index and update that same record when a round completes, then verify mode switching and no-repeat behavior with unit tests.
- [ ] 2.3 Add a My Progress mode dropdown and render its selected mode's category results, then verify the UI through browser tests.

## 3. Optional clues

- [ ] 3.1 Keep the Clues checkbox off by default and preserve its Settings location, then verify a fresh game hides clues until the player enables it.
- [ ] 3.2 Show the answer-specific clue in the current information area and unlock one stronger non-spoiling hint after three correct tiles, then verify both paths with unit and browser tests.

## 4. Integration verification

- [ ] 4.1 Run the project's source coverage, typecheck, unit tests, browser tests, and gated build, then record the passing commands in the change evidence.

## 5. Round menu flow

- [ ] 5.1 Move mode and category selectors into the pre-round menu, persist their selected values, and verify changing them does not replace a round until Start Game.
- [ ] 5.2 Show the pre-round menu after a win, loss, or quit, move settings access into active-play status, and verify the menu flow with browser tests.
- [ ] 5.3 Add a Settings-only Quit current round action that discards the active round without updating results or category progress, then verify that behavior with unit and browser tests.
