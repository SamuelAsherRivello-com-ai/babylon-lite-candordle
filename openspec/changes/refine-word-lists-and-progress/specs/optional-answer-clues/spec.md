# Spec Delta

## Purpose

Offer optional, answer-specific help without restating facts already shown in the game interface.

## ADDED Requirements

### Requirement: Opt-in clue display
The game SHALL keep clues disabled by default and SHALL provide a Settings checkbox that enables them.

#### Scenario: Player enables clues
- **WHEN** a player enables the Clues checkbox
- **THEN** the current and future rounds SHALL display their answer-specific clue in the existing game information area

#### Scenario: Player uses default settings
- **WHEN** a player has not enabled clues
- **THEN** the game SHALL not display a clue

### Requirement: Non-redundant answer-specific clues
Each displayed clue SHALL describe its answer without merely repeating the selected category or the five-letter answer length.

#### Scenario: Nature clue is visible
- **WHEN** a player enables clues for a Nature answer
- **THEN** the clue SHALL provide information specific to that answer rather than only identifying it as a nature word

### Requirement: Earned non-spoiling hint
After a player has placed three letters correctly, the game SHALL allow one stronger hint that does not reveal the answer or an unrevealed answer letter.

#### Scenario: Hint threshold is reached
- **WHEN** evaluated guesses contain three correctly placed tiles and the player has not used the hint
- **THEN** the game SHALL offer one hint reveal
