# OpenSpec orchestration ledger

## Scope and lead

- Lead chat: `01a13b5f-0b49-7611-a7e1-02d61fe42cc6`
- Lead source folder: `D:\Documents\Projects\VC\Babylon\babylon-lite-wordle-game-clone`
- Project metadata ID: `a45a36ba-c8da-46dd-81b9-2c76295bef8b`
- Started: 2026-10-14 (Asia/Tbilisi)
- Naming configuration: `openspec-orchestrate` default configuration read on 2026-10-14.
- Inventory limitation: Codex returned only its most recent 50 unarchived chats and this chat has no project ID. Scope is therefore confirmed by matching source folder, not a complete project-ID inventory.

## Initial title snapshot

| Chat ID | Original title | Intended title | Source folder | Result | User override |
| --- | --- | --- | --- | --- | --- |
| `01a13b5f-0b49-7611-a7e1-02d61fe42cc6` | `Complete project OpenSpec changes` | `[OS-orc: all-open-changes]` | project root | applied and verified | no |
| `01a13a92-3c96-7683-9f3d-c42c03f47efa` | `OS-apw: refine-word-lists-and-progress (00/10)` | `[OS-apw: refine-word-lists-and-progress (00/10)]` | project root | applied and verified | no |
| `01a13130-37b2-7cf1-9e75-9dbf984b46b3` | `RUN` | `[RUN]` | project root | applied and verified | no |

## Workload

| Change / deliverable | Owner | File or interface boundary | Evidence / current state | Next action | Completion condition |
| --- | --- | --- | --- | --- | --- |
| `refine-word-lists-and-progress` | orchestrator (`01a13b5f-0b49-7611-a7e1-02d61fe42cc6`) | word lists, engine, UI, tests, audit | Task 1.1 verified locally: checked-in exclusion data and passing catalog-overlap test. The prior owner made no persistent catalog change. | Replace the dynamic answer backfill with audited static catalogs, then finish remaining requirements. | Tasks verified, full gates pass, then sync/archive. |
| `build-wordle-clone` | no active owner identified | baseline game implementation/specs | Change remains unarchived with all task boxes unchecked; it may represent completed baseline work but has no fresh mapped evidence. | Inspect implementation against requirements after refinement work is stable. | Requirements and fresh gates verified, then sync/archive if appropriate. |
| Development-server lifecycle | `01a13130-37b2-7cf1-9e75-9dbf984b46b3` | managed preview only | Owner last verified a UI change; no continuing task. | Keep available for browser-test coordination if needed. | Preview ownership is clear or stopped after verification. |

## Coordination history

- 2026-10-14: ledger created before title mutations; initial source-folder snapshot recorded.
- 2026-10-14: project-chat title pass applied and verified for all three discovered in-scope chats.
- 2026-10-14: created active coordination goal and heartbeat `coordinate-wordle-openspec-completion` (five-minute cadence).
- 2026-10-14: instructed the refinement-change owner to resume its full remaining task list with clear file scope and evidence requirements.
- 2026-10-14: explicit handoff returned refinement integration ownership to the orchestrator after repeated non-persistent owner attempts. Task 1.1 was verified with `npm test` (16 passing) and checked complete.
- 2026-10-14: fixed a missing favicon console error, made Playwright configurable for a verified external preview, and ran its browser suite against the project-owned server on port 6102 (3 passing). Tasks 2.3 and 5.1–5.3 were verified and checked complete.
- 2026-10-14: fresh gate passed: `npm run check:typescript-source`, `npm run typecheck`, `npm test` (16 passing), `npm run build`, and `PLAYWRIGHT_BASE_URL=http://127.0.0.1:6102 npm run test:browser` (3 passing). Task 4.1 checked complete.
- 2026-10-14: baseline-change assessment found its planned visible title (`Wordle Clone`) conflicts with the current Candordle product and later refinement plan. Its delta specs are therefore superseded and must not be synced; archiving it would require explicit approval because all 20 historical task boxes remain incomplete.
- 2026-10-14: static catalog curation is blocked on the combined requirement for five 100-word familiar category lists and exclusion of all 2,315 historical original-Wordle answers. A broad 145-term nature candidate set retained only 16 eligible words, so automatic dictionary filling cannot meet the approved requirement.
