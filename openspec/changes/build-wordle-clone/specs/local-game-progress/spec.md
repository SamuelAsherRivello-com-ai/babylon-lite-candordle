# Spec Delta

## Purpose

Retain local play state and player preferences across reloads without requiring an account or network connection.

## ADDED Requirements

### Requirement: Local game restoration
The game SHALL locally save an unfinished round, including mode, selected answer identity, guesses, timer state sufficient for fair restoration, hint state, and settings, and SHALL restore it on reload when it remains valid.

#### Scenario: Player reloads an unfinished round
- **WHEN** a player reloads before the active round ends
- **THEN** the game SHALL restore the same round state without consuming an attempt

### Requirement: Local statistics and streaks
The game SHALL locally track wins, losses, current streak, maximum streak, and mode-appropriate summary statistics, and SHALL update them once per completed round.

#### Scenario: Round completes
- **WHEN** a round reaches a win or loss state
- **THEN** the game SHALL persist its statistics update exactly once

### Requirement: Persistent player preferences
The game SHALL locally retain selected mode, theme, hard mode, sound, reduced-motion, and color-blind-friendly preferences.

#### Scenario: Player changes a setting
- **WHEN** a player updates an available setting
- **THEN** the setting SHALL apply immediately and persist for a future visit
