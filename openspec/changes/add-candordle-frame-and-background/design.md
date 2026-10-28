# Design

## Context

See `proposal.md` for motivation and `specs/game-frame-presentation/spec.md` for the user-visible contract. The app currently renders one centered portrait `<main>` surface. Its CSS sets the outer page background to black and the game surface to warm cream; the information and game cards already use ink borders and offset shadows. The game uses existing responsive sizing to fill narrow screens and expose gutters on wider or taller screens.

## Goals / Non-Goals

**Goals:**
- Make the outer portrait boundary legible and integrate the browser gutters into Candordle's existing palette.
- Use an original, locally bundled, tileable word-puzzle image with restrained contrast.
- Keep the pattern decorative and behind the playable surface.
- Preserve gameplay and the existing responsive layout.

**Non-Goals:**
- Redesigning the board, keyboard, HUD, modals, or game rules.
- Adding animation, remote image requests, new runtime dependencies, or a second layout orientation.

## Decisions

- Add a small local repeating background asset and apply it to the page gutter layer. A local asset avoids network dependence and gives tighter control over palette and repetition than a remote image; a CSS-only color or gradient would not satisfy the requested word-puzzle image.
- Use a quiet tile motif derived from word-game shapes and the existing warm cream, ink, teal, and muted tile colors. Keep decorative details low contrast and use a repeat scale that reads as texture rather than competing content.
- Retain the current portrait surface sizing and card styling. Adjust its outer border/frame and page gutter treatment without moving primary controls or introducing gutter UI that competes with play.
- For Apply review, run one Vite preview instance only. Keep the work uncommitted and unmerged, and stop after presenting the preview so the user can approve before any commit or merge.

## Risks / Trade-offs

- **Pattern can distract from the board** → Use subdued colors and inspect it at desktop and mobile sizes in the single preview.
- **Gutters become very narrow on some screens** → Keep the image seamless and the frame compact so narrow gutters do not create visible clipping or crowd the game.
- **A decorative asset increases download size** → Keep it small and locally bundled; prefer a simple vector or compact raster tile.

## Migration Plan

No data or deployment migration is required. Apply the styling and local asset, inspect one Vite preview instance, run the repository build gates, and publish through the existing push-to-main Pages workflow after user authorization.
