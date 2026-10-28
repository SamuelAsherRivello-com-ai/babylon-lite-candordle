# Proposal

## Why

Candordle currently places its portrait game surface against a plain black browser background, leaving the surrounding gutter visually empty and the game frame understated. A restrained, repeating word-puzzle backdrop and clearer frame treatment will make the full viewport feel intentional while keeping attention on the puzzle.

## What Changes

- Add a calm repeating word-puzzle background image using Candordle's existing warm cream, ink, teal, and muted game-color palette.
- Strengthen the game surface borders and present the viewport gutters as part of the same cohesive visual frame across supported screen sizes.
- Preserve existing game layout, controls, responsive behavior, accessibility, and gameplay.
- Review the responsive result in one Vite preview instance, then commit the approved change to the default branch and let the existing Pages workflow publish it.

## Capabilities

### New Capabilities
- `game-frame-presentation`: Defines the visible frame, gutters, and decorative repeating background surrounding the playable game surface.

### Modified Capabilities
- None. The repository has no base specs to modify; this visual behavior is captured as a new capability.

## Impact

- Affects `wordle-clone/src/style.css` and adds a small local SVG background asset under `wordle-clone/src/` so Vite bundles it with the configured deployment base.
- May adjust the top-level game markup in `wordle-clone/src/app.tsx` only if needed to present gutter content without changing game behavior.
- No API or dependency changes are expected. Use the existing Vite development setup and verify the production build before publishing through the existing push-to-main Pages workflow.
