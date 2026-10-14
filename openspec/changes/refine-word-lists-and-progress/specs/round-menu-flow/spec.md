# Spec Delta

## Purpose

Let a player select and start each round deliberately, while allowing an unfinished round to be discarded without affecting progress.

## ADDED Requirements

### Requirement: Pre-round selection menu
The game SHALL show a menu before the first round and after each completed or discarded round. The menu SHALL contain mode and category selectors and a Start Game control.

#### Scenario: Player starts a new round
- **WHEN** a player selects a mode and category then presses Start Game
- **THEN** the game SHALL start that selected round

### Requirement: Persisted pending selections
The game SHALL retain the last menu mode and category selections locally. Changing a menu selection SHALL not replace an active or saved round until Start Game.

#### Scenario: Player changes a selection
- **WHEN** a player changes mode or category in the menu
- **THEN** the game SHALL retain the selection without starting or replacing a round

### Requirement: Safe round quit
During active play, the Settings menu SHALL offer Quit current round. Quitting SHALL discard the unfinished round and return to the pre-round menu without changing win, loss, or category progress.

#### Scenario: Player quits an unfinished round
- **WHEN** a player selects Quit current round
- **THEN** the game SHALL return to the pre-round menu and SHALL leave recorded results unchanged
