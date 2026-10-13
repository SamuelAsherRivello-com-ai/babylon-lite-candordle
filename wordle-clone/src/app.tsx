import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { ANSWERS, DEFAULT_SETTINGS, DEFAULT_STATS, MODES, createCategoryProgress, createSeed, type CategoryProgress, type Mode, type Round, type Settings, type Statistics, type Theme, clue, evaluate, hardModeMessage, hint, isValidWord, makeRound, status, updateStats } from "./game/engine.ts";
import { playCelebration, playLoss, playTileReveal } from "./game/audio.ts";
import { appendSessionEvent, readSessionHistory, SESSION_HISTORY_KEY, type SessionEventType } from "./game/session-history.ts";
import { WHATS_NEW } from "./whats-new.ts";

const KEY = "wordle-clone.v1";
const VERSION_RELOAD_KEY = "wordle-clone.v1.version-reload";
const devMode = false;
const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"] as const;
const REVEAL_STAGGER_MS = 190;
const REVEAL_DURATION_MS = 470;
const LOSS_RESULT_DELAY_MS = (4 * REVEAL_STAGGER_MS) + REVEAL_DURATION_MS + REVEAL_STAGGER_MS;
const LOSS_FALL_DURATION_MS = 900;
const LOSS_TILT_WAIT_MS = 1000;
const TILT_STAGGER_MS = 200;
const TILT_DURATION_MS = 520;
const ROUND_COMPLETE_EARLY_MS = 2000;
type DailyPlays = { date: string; count: number };
type Saved = { round: Round; settings: Settings; stats: Statistics; seed: number; progress: Record<Theme, CategoryProgress>; dailyPlays: DailyPlays };
const CATEGORY_LABELS: Record<Theme, string> = { everyday: "Everyday", nature: "Nature", food: "Food", southAfrica: "South Africa", psychology: "Psychology" };
function todayKey() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}
function retainedTileIndices(round: Round) {
  return round.guesses.flatMap((guess, row) => evaluate(round.answer, guess).flatMap((tile, column) => tile === "correct" || tile === "present" ? [(row * 5) + column] : []));
}
function createSessionId() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function load(): Saved {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as Saved;
    if (saved?.round && saved.settings && saved.stats) {
      const defaults = createCategoryProgress();
      const progress = Object.fromEntries((Object.keys(defaults) as Theme[]).map((theme) => {
        const prior = saved.progress?.[theme];
        const legacy = prior as (CategoryProgress & { hard?: boolean }) | undefined;
        return [theme, { ...defaults[theme], ...prior, completed: prior?.completed ?? ((prior?.won ?? 0) + (prior?.lost ?? 0)), allHardCompleted: prior?.allHardCompleted ?? legacy?.hard ?? false }];
      })) as Record<Theme, CategoryProgress>;
      const dailyPlays = (saved as Saved & { dailyPlays?: DailyPlays }).dailyPlays;
      const round = { ...saved.round, started: saved.round.started ?? false, hardMode: saved.round.hardMode ?? false };
      if (!round.started && round.mode === "speed") round.deadline = null;
      return { ...saved, round, settings: { ...DEFAULT_SETTINGS, ...saved.settings }, stats: { ...DEFAULT_STATS, ...saved.stats }, seed: saved.seed ?? createSeed(), progress, dailyPlays: dailyPlays?.date === todayKey() ? dailyPlays : { date: todayKey(), count: 0 } };
    }
  } catch {}
  const seed = createSeed();
  return { round: makeRound("classic", "everyday", Date.now(), 0, seed), settings: DEFAULT_SETTINGS, stats: DEFAULT_STATS, seed, progress: createCategoryProgress(), dailyPlays: { date: todayKey(), count: 0 } };
}

export function App() {
  const gameWindowRef = useRef<HTMLElement>(null);
  const [saved, setSaved] = useState(load);
  const [draft, setDraft] = useState("");
  const [now, setNow] = useState(Date.now());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [resultOpen, setResultOpen] = useState<"won" | "lost" | null>(null);
  const [lossReason, setLossReason] = useState<"attempts" | "timeout" | null>(null);
  const [lossAnimation, setLossAnimation] = useState(false);
  const [timerStoppedAt, setTimerStoppedAt] = useState<number | null>(null);
  const [celebration, setCelebration] = useState(0);
  const [confettiOrigins, setConfettiOrigins] = useState<Array<{ x: number; y: number }>>([]);
  const completedRoundRef = useRef<string | null>(null);
  const [startOpen, setStartOpen] = useState(() => !saved.round.started && saved.round.guesses.length === 0);
  const [settingsFromStart, setSettingsFromStart] = useState(false);
  const sessionId = useRef(createSessionId()).current;
  const hasRecordedOpen = useRef(false);
  const gameState = status(saved.round, now);
  const progress = Math.min(3, saved.round.guesses.flatMap((guess) => evaluate(saved.round.answer, guess)).filter((tile) => tile === "correct").length);
  const secondsLeft = saved.round.mode !== "speed" ? null : saved.round.deadline === null ? MODES.speed.seconds : Math.max(0, Math.ceil((saved.round.deadline - (timerStoppedAt ?? now)) / 1000));
  const statusText = saved.round.mode === "speed"
    ? `Time left: ${secondsLeft}s`
    : saved.round.mode === "two"
      ? gameState === "won" ? `Challenge cleared in ${saved.round.guesses.length} ${saved.round.guesses.length === 1 ? "guess" : "guesses"}`
        : gameState === "lost" ? "Challenge missed"
          : `${MODES.two.attempts - saved.round.guesses.length} ${MODES.two.attempts - saved.round.guesses.length === 1 ? "guess" : "guesses"} left`
      : gameState === "won" ? `Solved in ${saved.round.guesses.length} ${saved.round.guesses.length === 1 ? "guess" : "guesses"}`
        : gameState === "lost" ? `Answer: ${saved.round.answer}`
          : `Guess ${saved.round.guesses.length + 1} of ${MODES.classic.attempts}`;
  const states = useMemo(() => Object.fromEntries(saved.round.guesses.flatMap((guess) => guess.split("").map((letter, index) => [letter, evaluate(saved.round.answer, guess)[index]]))), [saved.round]);
  const tiltRanks = useMemo(() => new Map(retainedTileIndices(saved.round).sort((left, right) => ((left * 17) % 31) - ((right * 17) % 31)).map((tileIndex, rank) => [tileIndex, rank])), [saved.round]);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(saved)); }, [saved]);
  useEffect(() => {
    const refreshForNewRelease = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}version.txt`, { cache: "no-store" });
        const deployedVersion = response.ok ? (await response.text()).trim().replace(/^version=/, "") : "";
        if (deployedVersion && deployedVersion !== __APP_VERSION__ && sessionStorage.getItem(VERSION_RELOAD_KEY) !== deployedVersion) {
          sessionStorage.setItem(VERSION_RELOAD_KEY, deployedVersion);
          window.location.reload();
        }
      } catch {}
    };
    void refreshForNewRelease();
  }, []);
  useEffect(() => { const interval = setInterval(() => setNow(Date.now()), 250); return () => clearInterval(interval); }, []);
  const recordSessionEvent = (type: SessionEventType, round?: Round, outcome?: "won" | "lost") => {
    const occurredAt = Date.now();
    const resultDetails = outcome && round ? round.deadline === null
      ? { outcome, guesses: round.guesses.length }
      : (() => { const remainingSeconds = Math.max(0, Math.ceil((round.deadline - occurredAt) / 1000)); return { outcome, guesses: round.guesses.length, durationSeconds: Math.max(0, (MODES[round.mode].seconds ?? 0) - remainingSeconds), remainingSeconds }; })()
      : {};
    const event = {
      id: createSessionId(), type, occurredAt: new Date(occurredAt).toISOString(), sessionId, schemaVersion: __APP_VERSION__, appVersion: __APP_VERSION__,
      ...(round ? { mode: round.mode, theme: round.theme } : {}),
      ...resultDetails,
    };
    const history = readSessionHistory(localStorage.getItem(SESSION_HISTORY_KEY), __APP_VERSION__);
    localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(appendSessionEvent(history, event, __APP_VERSION__)));
  };
  useEffect(() => {
    if (!hasRecordedOpen.current) {
      hasRecordedOpen.current = true;
      recordSessionEvent("app_opened");
    }
    const onVisibilityChange = () => { if (document.visibilityState === "hidden") recordSessionEvent("app_hidden"); };
    const onPageHide = () => recordSessionEvent("app_closed");
    document.addEventListener("visibilitychange", onVisibilityChange);
    addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      removeEventListener("pagehide", onPageHide);
    };
  }, []);
  const triggerCelebration = () => {
    setCelebration((value) => value + 1);
    playCelebration(saved.settings.sound);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      const gameWindow = gameWindowRef.current?.getBoundingClientRect();
      setConfettiOrigins(gameWindow ? Array.from(document.querySelectorAll<HTMLElement>(".tile")).map((tile) => {
        const rect = tile.getBoundingClientRect();
        return { x: rect.left - gameWindow.left + (rect.width / 2), y: rect.top - gameWindow.top + (rect.height / 2) };
      }) : []);
    }));
  };
  const triggerLoss = () => {
    setLossAnimation(true);
    playLoss(saved.settings.sound);
  };
  const finishLoss = (round: Round, reason: "attempts" | "timeout") => {
    const roundKey = `${round.mode}:${round.theme}:${round.answer}:${round.deadline}:${round.guesses.join(",")}`;
    if (completedRoundRef.current === roundKey) return;
    completedRoundRef.current = roundKey;
    setLossReason(reason);
    window.setTimeout(triggerLoss, LOSS_RESULT_DELAY_MS);
    const retainedCount = retainedTileIndices(round).length;
    const tiltSequenceDuration = Math.max(0, retainedCount - 1) * TILT_STAGGER_MS;
    const fullLossSequence = LOSS_RESULT_DELAY_MS + LOSS_FALL_DURATION_MS + LOSS_TILT_WAIT_MS + tiltSequenceDuration + TILT_DURATION_MS;
    const resultDelay = Math.max(LOSS_RESULT_DELAY_MS + LOSS_FALL_DURATION_MS, fullLossSequence - ROUND_COMPLETE_EARLY_MS);
    window.setTimeout(() => setResultOpen("lost"), resultDelay);
  };
  const restart = (mode = saved.round.mode, theme = saved.round.theme) => {
    completedRoundRef.current = null;
    const nextRound = makeRound(mode, theme, Date.now(), saved.progress[theme].played, saved.seed);
    setSaved((current) => ({ ...current, round: nextRound }));
    recordSessionEvent("round_started", nextRound);
    setDraft(""); setResultOpen(null); setLossReason(null); setLossAnimation(false); setTimerStoppedAt(null);
  };
  const submit = () => {
    if (gameState !== "playing") return;
    if (!isValidWord(draft)) return;
    try { if (saved.settings.hard) hardModeMessage(saved.round, draft); } catch { return; }
    const submittedAt = Date.now();
    const deadline = !saved.round.started && saved.round.mode === "speed" ? submittedAt + (MODES.speed.seconds ?? 0) * 1000 : saved.round.deadline;
    const round = { ...saved.round, guesses: [...saved.round.guesses, draft], deadline, started: true, hardMode: saved.round.started ? saved.round.hardMode : saved.settings.hard };
    const result = status(round, submittedAt);
    const speedSeconds = result === "won" && round.mode === "speed" && round.deadline !== null ? Math.max(1, Math.ceil((submittedAt - (round.deadline - (MODES.speed.seconds ?? 0) * 1000)) / 1000)) : undefined;
    playTileReveal(evaluate(saved.round.answer, draft), saved.settings.sound);
    setSaved((current) => {
      const progress = { ...current.progress };
      const dailyPlays = current.dailyPlays.date === todayKey() ? { ...current.dailyPlays } : { date: todayKey(), count: 0 };
      if (!current.round.started) dailyPlays.count += 1;
      if (round.mode === "classic") {
        const category = { ...progress[round.theme] };
        if (!current.round.started) category.played += 1;
        if (result === "won" || result === "lost") {
          category.completed += 1;
          category.allHardCompleted = category.completed === 1 ? round.hardMode : category.allHardCompleted && round.hardMode;
          if (result === "won") category.won += 1;
          if (result === "lost") category.lost += 1;
        }
        progress[round.theme] = category;
      }
      return { ...current, round, progress, dailyPlays, stats: result === "playing" ? current.stats : updateStats(current.stats, result, speedSeconds) };
    });
    setDraft("");
    if (result !== "playing") setTimerStoppedAt(Date.now());
    if (result === "lost") {
      finishLoss(round, "attempts");
    }
    if (result !== "playing") recordSessionEvent("round_finished", round, result);
    if (result === "won") { triggerCelebration(); setResultOpen("won"); }
  };
  useEffect(() => {
    if (gameState !== "lost" || saved.round.deadline === null) return;
    const round = saved.round;
    const roundKey = `${round.mode}:${round.theme}:${round.answer}:${round.deadline}:${round.guesses.join(",")}`;
    if (completedRoundRef.current === roundKey) return;
    setTimerStoppedAt(round.deadline);
    setSaved((current) => current.round === round ? { ...current, stats: updateStats(current.stats, "lost") } : current);
    recordSessionEvent("round_finished", round, "lost");
    finishLoss(round, "timeout");
  }, [gameState, saved.round]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (devMode && key === "T") triggerCelebration();
      if (devMode && key === "Y") triggerLoss();
      else if (key === "ENTER") submit();
      else if (key === "BACKSPACE") setDraft((value) => value.slice(0, -1));
      else if (/^[A-Z]$/.test(key) && gameState === "playing") setDraft((value) => value.length < 5 ? value + key : value);
    };
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  });
  const enter = (key: string) => {
    if (devMode && key === "T") triggerCelebration();
    if (devMode && key === "Y") triggerLoss();
    else if (key === "ENTER") submit();
    else if (key === "BACK") setDraft((value) => value.slice(0, -1));
    else setDraft((value) => value.length < 5 && gameState === "playing" ? value + key : value);
  };
  const setting = (key: keyof Settings, label: string, disabled = false) => <label className={["setting", disabled ? "disabled" : ""].join(" ")}><input type="checkbox" disabled={disabled} checked={saved.settings[key]} onChange={(event) => setSaved((current) => {
    const settings = { ...current.settings, [key]: event.target.checked };
    if (key === "hard" && event.target.checked) settings.clues = false;
    return { ...current, settings };
  })} />{label}</label>;
  const keyClass = (key: string) => ["key", states[key] ?? ""].join(" ");
  const clearProgress = () => {
    localStorage.removeItem(KEY);
    const seed = createSeed();
    setSaved({ round: makeRound("classic", "everyday", Date.now(), 0, seed), settings: DEFAULT_SETTINGS, stats: DEFAULT_STATS, seed, progress: createCategoryProgress(), dailyPlays: { date: todayKey(), count: 0 } });
    completedRoundRef.current = null;
    setDraft(""); setClearConfirm(false); setSettingsOpen(false); setResultOpen(null); setLossReason(null); setLossAnimation(false); setTimerStoppedAt(null); setStartOpen(true);
  };

  return <main ref={gameWindowRef}>
    {celebration > 0 && confettiOrigins.length > 0 && <div className="confetti" aria-hidden="true">{confettiOrigins.flatMap((origin, tileIndex) => Array.from({ length: 3 }, (_, particleIndex) => {
      const index = (tileIndex * 3) + particleIndex;
      return <span key={`${celebration}-${index}`} style={{ "--left": `${origin.x}px`, "--top": `${origin.y}px`, "--delay": `${particleIndex * 28}ms`, "--drift": `${((index * 53) % 240) - 120}px`, "--rise": `-${60 + ((index * 29) % 150)}px`, "--finish": `${((index * 71) % 360) - 180}px`, "--fall": `${420 + ((index * 31) % 260)}px`, "--midturn": `${(index * 23) % 180}deg`, "--turn": `${(index * 67) % 360}deg`, "--color": ["#538d4e", "#d0ad3b", "#7869a7", "#e46e86", "#4fbfb0"][index % 5] } as CSSProperties} />;
    }))}</div>}
    {startOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Candordle start menu"><section className="settings-modal start-modal"><h1>Candordle <span>V {__APP_VERSION__}</span></h1><p>You've played {saved.dailyPlays.count} times today.</p><button className="back-button" onClick={() => { recordSessionEvent("round_started", saved.round); setStartOpen(false); }}>Start Game</button><button className="secondary" onClick={() => { setStartOpen(false); setSettingsFromStart(true); setSettingsOpen(true); }}>Settings</button></section></div>}
    <section className="title-bar" aria-label="Game controls">
      <label>Mode <select value={saved.round.mode} onChange={(event) => restart(event.target.value as Mode)}>{(Object.keys(MODES) as Mode[]).map((mode) => <option key={mode} value={mode}>{MODES[mode].label}</option>)}</select></label>
      <label>Category <select value={saved.round.theme} onChange={(event) => restart(saved.round.mode, event.target.value as Theme)}>{(Object.keys(ANSWERS) as Theme[]).map((theme) => <option key={theme} value={theme}>{CATEGORY_LABELS[theme]}</option>)}</select></label>
      <button className="settings-button" aria-label="Open settings" onClick={() => setSettingsOpen(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.4 2h3.2l.6 2.2c.6.2 1.1.5 1.6.9l2.2-.7 1.6 2.8-1.6 1.6c.1.6.1 1.3 0 1.9l1.6 1.6-1.6 2.8-2.2-.7c-.5.4-1 .7-1.6.9l-.6 2.2h-3.2l-.6-2.2c-.6-.2-1.1-.5-1.6-.9l-2.2.7-1.6-2.8 1.6-1.6a7 7 0 0 1 0-1.9L4.6 7.2l1.6-2.8 2.2.7c.5-.4 1-.7 1.6-.9L10.4 2Z"/><circle cx="12" cy="9.8" r="2.8"/></svg></button>
    </section>
    <section className="info-bar" aria-label="Round information">
      <div className="round-meta"><p className="speed-best">{saved.round.mode === "speed" && saved.stats.bestSpeedSeconds !== null ? `Best: ${saved.stats.bestSpeedSeconds}s` : ""}</p><p className="game-status" role="status" aria-live="polite">{statusText}</p></div>
      {saved.settings.clues && <div className={progress >= 3 && !saved.round.hintUsed ? "clue has-hint" : "clue"}><span>{saved.round.mode === "two" ? "Challenge clue" : "Clue"}</span><p title={saved.round.hintUsed ? hint(saved.round) : clue(saved.round)}>{saved.round.hintUsed ? hint(saved.round) : clue(saved.round)}</p><small>Placed: {progress}/3</small>{progress >= 3 && !saved.round.hintUsed && <button onClick={() => setSaved((current) => ({ ...current, round: { ...current.round, hintUsed: true } }))}>Hint</button>}</div>}
    </section>
    {settingsOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Settings"><section className="settings-modal"><h2>Settings</h2>{setting("hard", "Hard mode")}{setting("clues", "Clues", saved.settings.hard)}{setting("sound", "Sound")}<button className="progress-button" onClick={() => { setSettingsOpen(false); setProgressOpen(true); }}>My Progress</button><button className="whats-new-button" onClick={() => { setSettingsOpen(false); setWhatsNewOpen(true); }}>What's New?</button><button className="danger clear-button" onClick={() => { setSettingsOpen(false); setClearConfirm(true); }}>Clear my progress</button><button className="back-button" onClick={() => { setSettingsOpen(false); if (settingsFromStart) { setSettingsFromStart(false); setStartOpen(true); } }}>Back</button></section></div>}
    {clearConfirm && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Clear progress confirmation"><section className="settings-modal confirm-modal"><h2>Are you sure?</h2><p>This will clear all your settings and progress.</p><button className="danger" onClick={clearProgress}>Yes</button><button className="back-button" onClick={() => { setClearConfirm(false); setSettingsOpen(true); }}>Back</button></section></div>}
    {progressOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="My Progress"><section className="settings-modal"><h2>My Progress</h2><section className="progress-highlights" aria-label="Highlights"><h3>Highlights</h3><dl><div><dt>Current streak</dt><dd>{saved.stats.streak}</dd></div><div><dt>Best streak</dt><dd>{saved.stats.bestStreak}</dd></div><div><dt>Wins</dt><dd>{saved.stats.wins}</dd></div></dl>{saved.stats.bestSpeedSeconds !== null && <p>Fastest Speed Wordle: {saved.stats.bestSpeedSeconds}s</p>}</section><p className="progress-scope">Classic Mode only</p><table className="progress-table"><thead><tr><th>Category</th><th>Right</th><th>Wrong</th><th>Yet</th><th>Hard?</th></tr></thead><tbody>{(Object.keys(ANSWERS) as Theme[]).map((theme) => <tr key={theme}><th>{CATEGORY_LABELS[theme]}</th><td>{saved.progress[theme].won}</td><td>{saved.progress[theme].lost}</td><td>{ANSWERS[theme].length - saved.progress[theme].played}</td><td><input className="hard-check" type="checkbox" checked={saved.progress[theme].completed > 0 && saved.progress[theme].allHardCompleted} readOnly aria-label={CATEGORY_LABELS[theme] + " all completed in hard mode"} /></td></tr>)}</tbody></table><p className="seed-note">Candordles served in random order.<br />No repeats.<br />RandomKey = {saved.seed}</p><button className="back-button" onClick={() => { setProgressOpen(false); setSettingsOpen(true); }}>Back</button></section></div>}
    {whatsNewOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="What's New"><section className="settings-modal whats-new-modal"><h2>What's New?</h2><div className="whats-new-scroll" tabIndex={0}>{WHATS_NEW.map((release) => <section key={release.version}><h3>{release.version}</h3><ul>{release.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div><button className="back-button" onClick={() => { setWhatsNewOpen(false); setSettingsOpen(true); }}>Back</button></section></div>}
    {resultOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={resultOpen === "won" ? "Puzzle solved" : "Puzzle complete"}><section className="settings-modal result-modal"><h2>{resultOpen === "won" ? "Brilliant!" : lossReason === "timeout" ? "Time's up" : "Round complete"}</h2><p>{resultOpen === "won" ? "You found the word." : "The word was " + saved.round.answer + "."}</p><button className="back-button" onClick={() => restart()}>Play again</button></section></div>}
    <section className="game-area">
      <div className="grid" style={{ "--attempts": MODES[saved.round.mode].attempts, gridTemplateRows: "repeat(" + MODES[saved.round.mode].attempts + ", minmax(0, 1fr))", aspectRatio: "5 / " + MODES[saved.round.mode].attempts } as CSSProperties}>{Array.from({ length: MODES[saved.round.mode].attempts }, (_, row) => {
        const word = saved.round.guesses[row] ?? (row === saved.round.guesses.length ? draft : "");
        const result = saved.round.guesses[row] ? evaluate(saved.round.answer, word) : [];
        return <div key={row} className="row">{Array.from({ length: 5 }, (_, column) => {
          const tileIndex = (row * 5) + column;
          const fallsAway = lossAnimation && (result[column] === "absent" || !word[column]);
          const tilts = lossAnimation && (result[column] === "correct" || result[column] === "present");
          const tileStyle = { ...(saved.round.guesses[row] ? { animationDelay: (column * REVEAL_STAGGER_MS) + "ms" } : {}), ...(fallsAway ? { "--fall-delay": `${tileIndex * 22}ms`, "--fall-drift": `${((tileIndex % 5) - 2) * 18}px`, "--fall-turn": `${(tileIndex % 2 ? 1 : -1) * (10 + (tileIndex % 4) * 5)}deg` } : {}), ...(tilts ? { "--tilt-delay": `${LOSS_FALL_DURATION_MS + LOSS_TILT_WAIT_MS + (tiltRanks.get(tileIndex) ?? 0) * TILT_STAGGER_MS}ms`, "--tilt": `${(tileIndex % 2 ? 1 : -1) * (5 + (tileIndex % 11))}deg` } : {}) } as CSSProperties;
          return <span key={column} className={["tile", result[column] ?? "empty", saved.round.guesses[row] ? "revealed" : "", fallsAway ? "fall-away" : "", tilts ? "tilt-remaining" : ""].join(" ")} style={tileStyle}>{word[column] ?? ""}</span>;
        })}</div>;
      })}</div>
    </section>
    <section className="keyboard" aria-label="On-screen keyboard">
      <div>{keyboard[0].split("").map((key) => <button key={key} className={keyClass(key)} onClick={() => enter(key)}>{key}</button>)}</div>
      <div>{keyboard[1].split("").map((key) => <button key={key} className={keyClass(key)} onClick={() => enter(key)}>{key}</button>)}</div>
      <div><button className="key action enter-key" onClick={() => enter("ENTER")}>Enter</button>{keyboard[2].split("").map((key) => <button key={key} className={keyClass(key)} onClick={() => enter(key)}>{key}</button>)}<button className="key action delete-key" aria-label="Delete letter" onClick={() => enter("BACK")}>Delete</button></div>
    </section>
  </main>;
}

