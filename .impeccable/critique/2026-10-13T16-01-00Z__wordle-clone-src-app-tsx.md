---
target: Candordle portrait game interface
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:D:\\Documents\\Projects\\VC\\Babylon\\babylon-lite-wordle-game-clone\\wordle-clone\\src\\app.tsx"
target_fingerprint: "sha256:82fab293a1c1202629b8a5f6874efaa7bdfc51d13fbe3631cf8c347064766fa5"
target_path: "D:\\Documents\\Projects\\VC\\Babylon\\babylon-lite-wordle-game-clone\\wordle-clone\\src\\app.tsx"
timestamp: 2026-10-13T16-01-00Z
slug: wordle-clone-src-app-tsx
---
## Design health score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Invalid and hard-mode submissions fail silently. |
| 2 | Match between system and real world | 3 | `RandomKey` is developer-facing language. |
| 3 | User control and freedom | 1 | Changing Mode or Category restarts the round without confirmation. |
| 4 | Consistency and standards | 3 | “Back” doubles as dismissal and nested navigation. |
| 5 | Error prevention | 1 | Active-round resets have no confirmation. |
| 6 | Recognition rather than recall | 3 | Rules and color meanings are never shown. |
| 7 | Flexibility and efficiency | 3 | Keyboard support is present but undiscoverable. |
| 8 | Aesthetic and minimalist design | 3 | The top controls compete with the board on small screens. |
| 9 | Error recovery | 1 | Rejected words and hard-mode violations have no explanation. |
| 10 | Help and documentation | 1 | There is no “How to play” or color key. |
| **Total** | | **22/40** | **Usable, with important interaction and accessibility gaps** |

## Design specificity verdict

Candordle has a clean, friendly stationery look: cream canvas, navy outlines, rounded cards, and offset shadows. The category-and-clue premise gives it a distinct product hook. The board, keyboard, and outcome language still look like a largely interchangeable Wordle clone. Category identity needs to appear in the round header, clue treatment, and result moment without changing the standard evaluation colors.

The deterministic detector found no issues in `wordle-clone/src/app.tsx`. Browser evidence confirmed the start menu, controls, and keyboard render at 1280×720. A preview first hit Edge’s blocked port 6000, then rendered from port 6002. No Impeccable script or visible overlay was injected, so no overlay is available.

## Overall impression

The portrait shell is disciplined and the visual language lands close to the requested clean, lightly playful tone. The main opportunity is to make category discovery feel like the heart of the game while removing a few trust-breaking interactions around resets, rejected guesses, and dialogs.

## What’s working

- The fixed portrait frame reads like a contained mobile game on a desktop browser instead of a stretched web page.
- The board stays central, with high-contrast tiles and a readable on-screen keyboard that support fast play.
- Cream, white, navy, rounded corners, and offset shadows form a consistent visual system with some personality and little clutter.

## Priority issues

### [P1] Rejected input and hard-mode constraints are invisible

**Why it matters:** An Enter press can appear broken. Players cannot learn whether a word is invalid or violates Hard mode.

**Fix:** Add an inline message near the board or keyboard that says “Not in the word list” or the exact hard-mode condition. Keep an abbreviated hard-mode reminder visible while active.

**Suggested command:** `$impeccable harden`

### [P1] The prominent Mode and Category controls discard a game without warning

**Why it matters:** The controls can destroy a partly played round without a recovery route.

**Fix:** On an unfinished game, confirm the change with “Keep playing” as the safe default and a clearly destructive “Start new round” action. A single Round control with mode and category choice in a dialog would also reduce top-bar pressure.

**Suggested command:** `$impeccable harden`

### [P1] Dialogs and motion need accessibility work

**Why it matters:** Current dialogs do not manage focus or Escape. Short phone screens can crop content, and confetti plus loss motion lack a reduced-motion path.

**Fix:** Trap and restore focus, support Escape, make modal contents internally scroll, and add a `prefers-reduced-motion` rule for reveals, falling tiles, tilts, and confetti.

**Suggested command:** `$impeccable audit`

### [P2] Category is a premise, not yet a visual identity

**Why it matters:** The specific reason to choose Candordle is quiet once the player reaches the board.

**Fix:** Use a restrained category badge, motif, or accent in non-result UI. Mention the category in win copy, for example “Nature solved in 3.” Keep green and yellow evaluation states unchanged.

**Suggested command:** `$impeccable delight`

### [P2] Top controls consume too much of the portrait hierarchy

**Why it matters:** Two labelled selects and a gear pull attention above the puzzle and compress on narrow phones.

**Fix:** Collapse them into a Round trigger and reserve the header for current-round context and status.

**Suggested command:** `$impeccable layout`

## Persona red flags

### Jordan, first-time mobile player

- “Start Game” does not explain the five-letter goal, category clue, tile colors, or modes.
- An invalid word provides no feedback.
- The gear hides sound, progress, release notes, and destructive data reset.

### Alex, keyboard-first repeat player

- Physical keyboard support is not discoverable.
- A select change can destroy an active round.
- Hard mode has no reminder once enabled.

### Sam, motion- or focus-sensitive player

- Confetti, reveal flips, falling tiles, and tilts have no reduced-motion alternative.
- Keyboard focus can leave a dialog, and no Escape behavior is visible.

## Minor observations

- `RandomKey = …` reads like diagnostic output. Hide it or label it as a player-facing puzzle seed.
- “Yet” in the progress table should be “Remaining.”
- The clue line fits label, serif clue, count, and an optional Hint button into a tight horizontal row. Protect the clue from truncation first.
- Give “Clear my progress” stronger separation from routine actions than color alone.
- Replace generic end copy with category, streak, speed, or hint-aware feedback.

## Questions to consider

- What should a player understand about a category round before entering the first letter?
- Should a loss sequence be theatrical, or should it reveal the answer and return control immediately?
- What should a player unfamiliar with Wordle learn in the first five seconds?
