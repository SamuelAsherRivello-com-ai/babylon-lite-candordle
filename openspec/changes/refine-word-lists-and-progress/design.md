# Design

## Context

See `proposal.md` for the motivation. The saved state currently stores category progress in one record per category, uses that record's `played` value to choose the next answer, and only updates it for Classic rounds. Everyday, Nature, and Food each start with five reviewed answers and then receive arbitrary entries from the full guess dictionary.

## Goals / Non-Goals

**Goals:**

- Store answer positions and results by mode and category without losing existing Classic progress.
- Replace automatic answer generation with checked data that can be audited.
- Keep the existing React layout and optional-clue control while restoring the original earned-hint interaction.

**Non-Goals:**

- Do not change the five-letter guessing rules or make a player account.
- Do not remove broad valid guesses solely because an entry is unsuitable as an answer.
- Do not change Speed Wordle's timer or Two-Guess's attempt limit.

## Decisions

### Nest progress by mode, then category

The persisted progress model will add a record for each game mode and category. Round creation and completion will read and update the record selected by the current mode and category. This prevents a mode change from reusing the active pair's position. Existing category-only data will become Classic records, because the prior UI counted only Classic category rounds. A shared category sequence was rejected because it would make one mode change another mode's path.

### Keep a static reviewed answer catalog

Answer lists will be explicit data rather than the result of filtering the complete guess dictionary. A validation test will check the list length, uniqueness, lack of plurals, and exclusion of the checked-in historical Wordle answer set. Valid guesses remain separate, so familiar or inflected guesses can still be accepted even when they cannot become answers.

### Treat the audit as maintained project documentation

The audit report will record the original answer, its replacement, the category, and a concise reason such as category mismatch, plural, historical Wordle answer, or unfamiliar word. The report makes the content decision reviewable without exposing the answer sequence during play.

### Reuse the clue area's current UI location

The Settings Clues checkbox remains off by default. When enabled, the existing information area will show an answer-specific clue. The current three-correct-tile threshold will unlock one stronger hint. Word-specific metadata will replace generic fallback wording that repeats the category or answer length.

### Make the start menu own round selection

The pre-round menu will retain a draft mode and category in saved local state. It will appear at first launch and after every completed or discarded round. Choosing an option will not replace a round until the player presses Start Game. During active play, the status area will hold the settings control, while Settings will offer Quit current round. Quitting discards the active round and returns to the menu without writing a win, loss, or category result.

## Risks / Trade-offs

- [A full reviewed catalog takes content-review time] → Keep the audit report beside the lists and test its structural constraints.
- [Existing local progress schema changes] → Migrate once at load, preserve old values as Classic data, and add migration tests.
- [Historical Wordle data provenance can change] → Check in the exact exclusion dataset and document its source and revision.

## Migration Plan

1. Add the new catalog, exclusion data, and audit report.
2. Migrate saved category progress to Classic mode on load and initialize the other mode records.
3. Release the UI and behavior changes with tests for fresh and migrated saves.
4. Roll back by continuing to read the migrated state as Classic progress if the new UI must be removed.
