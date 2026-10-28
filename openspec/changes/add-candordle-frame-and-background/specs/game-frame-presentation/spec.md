# Spec Delta

## Purpose

Give Candordle's portrait game surface and surrounding browser viewport a cohesive visual frame. The presentation keeps the puzzle controls readable while adding a restrained decorative word-puzzle pattern to the gutters.

## ADDED Requirements

### Requirement: Framed game surface
The game SHALL present its playable portrait surface with a clear border treatment that visually separates it from the surrounding viewport while preserving the existing game content and layout.

#### Scenario: Game opens in a desktop viewport
- **WHEN** a player opens Candordle in a viewport wider than the portrait game surface
- **THEN** the game surface SHALL remain centered and visibly framed against the surrounding gutters

#### Scenario: Game opens in a narrow viewport
- **WHEN** a player opens Candordle in a viewport where the portrait surface fills the available width
- **THEN** the frame SHALL remain visible without clipping primary game controls or reducing the playable area below its existing responsive layout

### Requirement: Decorative puzzle gutters
The surrounding gutters SHALL use a calm, repeating word-puzzle background image consistent with Candordle's warm, muted visual palette, and the background SHALL remain visually secondary to the playable surface.

#### Scenario: Pattern is visible around the game
- **WHEN** the viewport has visible gutters around the portrait game surface
- **THEN** the gutters SHALL show a repeating word-puzzle image with subdued contrast that complements the game palette

#### Scenario: Pattern does not obscure the game
- **WHEN** the background is rendered at any supported viewport size
- **THEN** the decorative pattern SHALL remain outside the primary game surface and SHALL NOT reduce the readability of its text, tiles, or controls
