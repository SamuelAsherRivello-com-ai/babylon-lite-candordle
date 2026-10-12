# Spec Delta

## Purpose

Provide replayable challenge variants and optional help that retain the central five-letter deduction game.

## ADDED Requirements

### Requirement: Playable game modes
The game SHALL provide Classic, Speed Wordle, and Two-Guess Challenge modes, each using the same word evaluation and valid-word policy.

#### Scenario: Classic mode starts
- **WHEN** a player selects Classic mode
- **THEN** the game SHALL start with six available guesses and no countdown

#### Scenario: Speed Wordle expires
- **WHEN** the visible Speed Wordle countdown reaches zero before a correct guess
- **THEN** the game SHALL end the round, show the answer, and offer immediate replay

#### Scenario: Two-Guess Challenge ends
- **WHEN** a player has made two accepted guesses in Two-Guess Challenge without solving
- **THEN** the game SHALL end the round as a loss

### Requirement: Optional themed answer sets
The game SHALL allow a player to select an optional theme that constrains future answers to that theme while retaining valid guesses from the complete valid-guess lexicon.

#### Scenario: Themed round begins
- **WHEN** a player starts a round with a theme selected
- **THEN** the answer SHALL be selected from that theme's answer set

### Requirement: Earned non-spoiler hints
The game SHALL optionally display an obscure crossword-style clue and SHALL award hint progress for correct-position tiles; after the configured threshold, the player SHALL be able to reveal one meaningful hint that does not expose the answer or a missing answer letter.

#### Scenario: Hint unlocks after progress
- **WHEN** a player's evaluated rows reach the correct-position progress threshold
- **THEN** the game SHALL enable one optional hint reveal

#### Scenario: Hint has not been earned
- **WHEN** the threshold has not been reached
- **THEN** the game SHALL show hint progress without revealing the earned hint
