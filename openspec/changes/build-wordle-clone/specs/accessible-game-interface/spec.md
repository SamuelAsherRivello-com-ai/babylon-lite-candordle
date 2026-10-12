# Spec Delta

## Purpose

Deliver an original, responsive, and inclusive puzzle interface for all supported input methods and accessibility preferences.

## ADDED Requirements

### Requirement: Original tactile visual system
The interface SHALL present the visible title `Wordle Clone` using an original light, warm tactile card-and-tile design with rounded geometry, high-contrast tile states, and a distinct layout and artwork; it SHALL not reproduce reference branding, text, puzzles, assets, screen arrangements, or gameplay.

#### Scenario: Game screen renders
- **WHEN** a player opens the game
- **THEN** the player SHALL see the title, game grid, input controls, and a readable original visual design

### Requirement: Keyboard-accessible input
The game SHALL support physical keyboard entry and an on-screen keyboard whose keys are focusable, labeled, and operable without a pointer.

#### Scenario: Physical keyboard guess
- **WHEN** a player types letter keys and presses Enter
- **THEN** the game SHALL update the active row and submit it when complete

#### Scenario: Screen-reader keyboard use
- **WHEN** a keyboard key receives focus
- **THEN** assistive technology SHALL receive its letter or action name and state where applicable

### Requirement: Responsive and preference-aware feedback
The interface SHALL adapt to mobile and desktop viewports, provide concise tactile feedback and original synthesized sound when enabled, and respect reduced-motion and sound preferences.

#### Scenario: Reduced motion is enabled
- **WHEN** a player enables reduced motion or the device requests it
- **THEN** nonessential tile and transition animation SHALL be suppressed or shortened

### Requirement: Configurable legibility
The game SHALL provide a color-blind-friendly evaluation palette that keeps correct, present, and absent states distinguishable with non-color cues.

#### Scenario: Color-blind palette is enabled
- **WHEN** a player enables the color-blind-friendly setting
- **THEN** evaluation tiles and keyboard states SHALL use the alternate palette and distinguishing visual cues
