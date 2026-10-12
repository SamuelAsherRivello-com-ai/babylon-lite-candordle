# Design

## Context

The repository contains only the newly initialized OpenSpec structure. See `proposal.md` for motivation; the application therefore needs a greenfield browser architecture with no migration burden.

## Goals / Non-Goals

**Goals:**

- Keep game rules pure, deterministic, and independently testable.
- Make local persistence resilient to malformed or obsolete browser storage.
- Create a genuinely original interface with a bright tactile palette: aqua, coral, violet, warm off-white, deep ink, and separate evaluation colors.
- Use Babylon Lite only for optional decorative depth or motion, not to make core play depend on canvas or block accessibility.

**Non-Goals:**

- Online accounts, multiplayer, leaderboards, remote analytics, or server APIs.
- Copying the reference's composition, graphic motifs, typography, text, assets, sounds, puzzle format, or interactions.
- A claim that every English inflection is valid; the curated lexicon remains the source of truth for ordinary common words.

## Decisions

### Isolate a game engine from the interface

Model answers, validation lexicon, evaluation, hard-mode constraints, round state transitions, hints, and statistics as TypeScript domain modules. React consumes explicit state/actions and renders controls; this permits concise unit tests and avoids UI-dependent rule behavior.

Alternative considered: embed rules in components. Rejected because duplicate-letter behavior, restoration, and mode limits would be difficult to verify and reuse.

### Use a curated answer lexicon plus a broader curated guess lexicon

Keep answer selection deterministic from a supplied seed/date or injected random source, with `AROSE` included in both lists. Curate the guess list to include common plural and past-tense forms and explicitly test representative forms such as `BROKE` and `AROSE`.

Alternative considered: accept every five-letter token from a third-party dictionary. Rejected because it does not reliably express the requested common-word policy and complicates offline delivery.

### Persist a versioned local snapshot

Store a small versioned JSON envelope in localStorage. Validate and normalize it on read; discard only invalid fields or stale active-round data while preserving safe defaults. Persist after accepted state transitions and settings updates.

Alternative considered: IndexedDB. Rejected because the state is compact and localStorage offers a simpler portable GitHub Pages implementation.

### Keep modes as configuration around one round engine

Represent Classic, Speed, and Two-Guess Challenge through mode configuration for attempt limit, timer, and replay UX. The engine decides terminal state, and a React timer merely dispatches time-expiry behavior.

Alternative considered: separate game implementations. Rejected because it risks behavior drift and duplicate testing.

### Build accessibility into semantic controls

Use buttons, live status text, focus management, labels, and text/state alternatives to color. Use CSS media queries and preference state for reduced motion; Web Audio oscillator envelopes produce short original feedback sounds only after user interaction.

Alternative considered: a canvas-only puzzle UI. Rejected because keyboard and assistive technology support would be substantially weaker.

### Visual language: transform broad mood, not expression

Use an original “studio desk” composition: stacked rounded panels on a warm paper background, soft offset shadows, matte ink borders, and a fresh color assignment distinct from the source arrangement. Decorative texture will use self-authored abstract grain/geometry rather than patterned wordmarks or reference motifs.

Alternative considered: closely matching the supplied reference layout or typographic treatment. Rejected because its recognizable expressive design would be too derivative.

## Risks / Trade-offs

- [Curated lists accidentally omit reasonable words] → document their policy, include representative inflections in tests, and maintain separate guess/answer lists.
- [Timer state can be gamed after reload] → persist a deadline timestamp and resolve an expired round on restoration.
- [Color-only state harms accessibility] → include labels, borders/patterns, and keyboard state text in the alternate palette.
- [Browser audio restrictions] → create audio context only after an interaction and treat sound as enhancement.
- [GitHub Pages base path differs in development] → configure Vite's base from its production environment and verify the production build.

## Migration Plan

1. Create the React/Vite project and domain modules.
2. Add the game UI, persistence, preference controls, and visual system.
3. Add unit and browser-flow tests, then build static assets.
4. Deploy the generated site through the repository's GitHub Pages workflow or repository Pages configuration.

Rollback consists of reverting the static deployment and removing the new browser bundle; stored snapshots are namespaced and harmless if no longer read.
