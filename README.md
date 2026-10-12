# Wordle Clone

An original, tactile five-letter word game for the browser. Its warm paper, aqua, coral, and violet visual language is independently designed; no reference artwork, wording, layouts, puzzles, or gameplay has been reused.

## Live demo

- Live demo URL: pending GitHub Pages publication.

## Run locally

```bash
npm install
npm run dev
```

## Controls

Use the physical keyboard or the focusable on-screen keyboard. Letters enter a guess, Enter submits, and Backspace/Delete removes a letter. Every game control is a semantic button, select, checkbox, or disclosure control.

## Modes and hints

- **Classic** gives six guesses.
- **Speed Wordle** gives six guesses before the visible 90-second countdown ends; replay is immediate.
- **Two-Guess Challenge** ends after two guesses.
- Select Everyday, Nature, or Food themes to change answer selection.
- An optional crossword-style clue is always visible. Three correctly placed tiles earn one non-spoiler thematic hint.

## Valid-word policy

The included offline lexicon accepts ordinary common five-letter English words. It deliberately includes common plurals and ordinary past tenses, including `-ed` forms, irregular past tense `BROKE`, and `AROSE`. A word is not rejected merely for being plural or past tense; it must still appear in the curated common-word lexicon. Answers and accepted guesses use separate lists so themed rounds remain fair.

## Accessibility and data

Settings include hard mode, synthesized sound, reduced motion, and a color-blind-friendly tile palette. Progress, settings, streaks, wins, losses, and an unfinished round are stored locally in the browser under `wordle-clone.v1`; no account or network service is used. Add `?mute=1` when testing silently (sound can also be disabled in Settings).

## Verify and build

```bash
npm run check:typescript-source
npm run typecheck
npm test
npm run build
```

`npm run build` produces static assets in `wordle-clone/dist`, ready for GitHub Pages. The included Pages workflow builds from the repository root; publish the repository and enable Pages to populate the live-demo URL above.

## Orientation and renderer

Wordle Clone is a responsive portrait-first puzzle interface. Babylon Lite is not used for the core game because a semantic React tile grid provides better keyboard and screen-reader access; the game remains a strict TypeScript Vite application.

## Original AI Prompt

The initiating prompt is local to this Codex conversation and has no shareable source URL, so the source-link placeholder is intentionally unverified.
