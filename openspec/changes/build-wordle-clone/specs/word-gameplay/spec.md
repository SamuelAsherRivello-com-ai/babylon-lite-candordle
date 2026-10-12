# Spec Delta

## Purpose

Define consistent, inclusive five-letter word guessing rules that players can understand and tests can reproduce exactly.

## ADDED Requirements

### Requirement: Six-attempt five-letter game
The game SHALL give a player six attempts to solve a selected five-letter answer and SHALL show an evaluated five-tile row for every accepted guess.

#### Scenario: Player solves within six attempts
- **WHEN** an accepted guess exactly equals the selected answer
- **THEN** the game SHALL mark the game won and prevent additional guesses

#### Scenario: Player exhausts attempts
- **WHEN** six accepted guesses are submitted without matching the answer
- **THEN** the game SHALL mark the game lost and reveal the answer

### Requirement: Deterministic duplicate-aware evaluation
The game SHALL evaluate each guess by marking exact letter-position matches first, then marking only remaining answer-letter occurrences as present in a different position, with all other letters absent.

#### Scenario: Guess contains more copies than the answer
- **WHEN** a submitted guess repeats a letter more times than the answer permits after exact matches
- **THEN** surplus copies SHALL be marked absent

### Requirement: Inclusive documented valid-word policy
The game SHALL accept ordinary common five-letter English words, including common plurals, regular past-tense words including words ending in `-ed`, ordinary irregular past tenses including `BROKE`, and `AROSE`; it SHALL not reject a word solely for being plural or past tense.

#### Scenario: Common inflected word is guessed
- **WHEN** a player submits a listed common plural, regular past tense, or ordinary irregular past tense with five letters
- **THEN** the game SHALL accept it if it is in the valid-guess lexicon

#### Scenario: AROSE is used as an answer
- **WHEN** the selected answer is `AROSE`
- **THEN** the game SHALL allow it to be solved and SHALL accept `AROSE` as a valid guess

### Requirement: Hard mode constraints
The game SHALL offer an optional hard mode that requires future guesses to preserve all discovered exact-position letters and previously identified present letters, including their known duplicate counts when applicable.

#### Scenario: Guess violates hard-mode discoveries
- **WHEN** hard mode is enabled and a guess omits or displaces a required discovered letter
- **THEN** the game SHALL not consume an attempt and SHALL explain the constraint
