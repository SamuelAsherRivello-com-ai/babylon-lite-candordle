# Proposal

## Why

Create a self-contained, accessible five-letter word game that combines a familiar daily-puzzle loop with faster and more demanding optional modes. The project starts empty, making this the right point to establish dependable game rules, an explicit inclusive word policy, durable local progress, and a distinctly tactile visual identity.

## What Changes

- Add the original single-player browser game **Wordle Clone**, with six-attempt five-letter play, duplicate-aware tile evaluation, physical-keyboard support, and an accessible on-screen keyboard.
- Add Classic, Speed Wordle, and Two-Guess Challenge modes, plus optional themed answer sets and non-spoiling, progress-earned hints.
- Define an inclusive five-letter valid-word policy that accepts ordinary plurals, regular and ordinary irregular past tenses (including `BROKE`), and `AROSE` as a playable word.
- Add local persistence for current play, statistics, streaks, and settings; provide hard mode, reduced motion, sound, and color-blind-friendly states.
- Establish an original warm, tactile card-and-tile visual direction informed only by the reference's broad color temperature, rounded physicality, and readability—not its content, layouts, branding, text, assets, or gameplay.
- Deliver focused deterministic tests, GitHub Pages configuration, and developer/player documentation.

## Capabilities

### New Capabilities

- `word-gameplay`: Core deterministic five-letter guessing, evaluation, word validation, and hard-mode behavior.
- `game-modes-and-hints`: Mode selection, timers, themed answers, and earned non-spoiler hint progression.
- `accessible-game-interface`: Responsive, keyboard- and screen-reader-accessible game UI with original tactile visual styling and user settings.
- `local-game-progress`: Local persistence and presentation of unfinished games, statistics, streaks, and preferences.
- `game-delivery`: Test, build, GitHub Pages deployment, and player documentation requirements.

### Modified Capabilities

- None; this is a new project.

## Impact

- Adds a React, TypeScript, Vite browser application and Babylon Lite only where it adds meaningful polish.
- Adds deterministic domain tests, local browser storage, synthesized browser audio, and a static GitHub Pages deployment configuration.
- Adds README documentation covering controls, modes, word policy, accessibility, local data, build/deployment, and live-demo URL placement.
