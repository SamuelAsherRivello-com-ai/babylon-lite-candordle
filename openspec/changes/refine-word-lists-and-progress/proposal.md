# Proposal

## Why

Candordle can repeat an answer when a player changes mode, and its category answer lists contain broad dictionary fill-ins that do not belong to the selected category. The answer set also includes plurals and unfamiliar words that make the game harder than intended.

## What Changes

- Give every mode and category pair its own persisted no-repeat answer index and show matching category results through a mode selector in My Progress.
- Replace automatic dictionary backfilling with reviewed category answer lists. Publish an audit that records each removed answer and its replacement.
- Restrict answers to familiar five-letter words that fit their category, exclude plurals, and exclude the historical original Wordle answer list while preserving ordinary non-plural inflections that fit.
- Retain clues as an off-by-default Settings checkbox. When enabled, show an answer-specific clue and unlock one stronger non-spoiling hint after three correctly placed tiles.
- Move mode and category selection into a locally remembered pre-round menu that appears before every round, and allow players to quit an unfinished round from Settings without recording a result.

## Capabilities

### New Capabilities

- `mode-category-progress`: Persist and display independent category progress for each game mode.
- `curated-category-answers`: Maintain reviewed, category-fitting answer lists and their audit record.
- `optional-answer-clues`: Provide opt-in, answer-specific clues and earned hints without redundant category or length information.
- `round-menu-flow`: Let players choose and start their next round from a persistent menu and quit unfinished rounds safely.

### Modified Capabilities

None. The repository has no baseline capability specifications.

## Impact

- Affected code: `wordle-clone/src/app.tsx`, `wordle-clone/src/game/engine.ts`, answer-list data, UI styles, and tests.
- Affected local data: persisted progress needs a backward-compatible migration from category-only progress to mode-and-category progress.
- New project documentation: a word-list audit report and the source reference used to exclude the historical Wordle answers.
