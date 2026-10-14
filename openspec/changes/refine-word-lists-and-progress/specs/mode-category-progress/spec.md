# Spec Delta

## Purpose

Track a player's no-repeat category progress separately for each selectable game mode.

## ADDED Requirements

### Requirement: Independent mode-and-category progression
The game SHALL keep a distinct answer position and category result record for every game-mode and category pair.

#### Scenario: Player changes modes
- **WHEN** a player changes from one mode to another while keeping a category selected
- **THEN** the new round SHALL use that mode and category pair's next unplayed answer

#### Scenario: Player returns to a mode
- **WHEN** a player returns to a previously played mode and category pair
- **THEN** the game SHALL resume that pair's own no-repeat answer order

### Requirement: Mode-filtered category progress
The My Progress page SHALL provide a mode selector and SHALL display category right, wrong, remaining, and hard-mode completion values for the selected mode only.

#### Scenario: Player selects Speed Wordle progress
- **WHEN** a player selects Speed Wordle in My Progress
- **THEN** the category table SHALL show only Speed Wordle results

### Requirement: Existing progress preservation
The game SHALL preserve existing saved category progress when it introduces mode-and-category records.

#### Scenario: Player opens an existing saved game
- **WHEN** locally saved data contains category-only progress from an earlier version
- **THEN** the game SHALL retain that progress under Classic mode and initialize the other mode records empty
