export type TileState = "empty" | "absent" | "present" | "correct";
export type Mode = "classic" | "speed" | "two";
export type Theme = "everyday" | "nature" | "food";
export interface Settings { hard: boolean; sound: boolean; reducedMotion: boolean; colorBlind: boolean; }
export interface Round { answer: string; guesses: string[]; mode: Mode; theme: Theme; deadline: number | null; hintUsed: boolean; }
export interface Statistics { wins: number; losses: number; streak: number; bestStreak: number; }

export const ANSWERS: Record<Theme, string[]> = {
  everyday: ["AROSE", "CRANE", "SLATE", "MONEY", "PLANT"],
  nature: ["MAPLE", "RIVER", "CORAL", "OCEAN", "MOSSY"],
  food: ["BREAD", "OLIVE", "PEACH", "GRAPE", "HONEY"],
};
export const GUESSES = new Set([...Object.values(ANSWERS).flat(), "BROKE", "TRIED", "CARED", "BAKED", "HOUSES", "PLUMS", "ROSES", "SHEEP", "STONE", "TEARS", "SPORE", "CROWD"]);
export const MODES: Record<Mode, { label: string; attempts: number; seconds: number | null }> = {
  classic: { label: "Classic", attempts: 6, seconds: null }, speed: { label: "Speed Wordle", attempts: 6, seconds: 90 }, two: { label: "Two-Guess Challenge", attempts: 2, seconds: null },
};
export const DEFAULT_SETTINGS: Settings = { hard: false, sound: true, reducedMotion: false, colorBlind: false };
export const DEFAULT_STATS: Statistics = { wins: 0, losses: 0, streak: 0, bestStreak: 0 };

export function evaluate(answer: string, guess: string): TileState[] {
  const states: TileState[] = Array(5).fill("absent"); const remaining = answer.split("");
  [...guess].forEach((letter, index) => { if (letter === answer[index]) { states[index] = "correct"; remaining[index] = ""; } });
  [...guess].forEach((letter, index) => { if (states[index] === "correct") return; const found = remaining.indexOf(letter); if (found >= 0) { states[index] = "present"; remaining[found] = ""; } });
  return states;
}
export function isValidWord(word: string) { return /^[A-Z]{5}$/.test(word) && GUESSES.has(word); }
export function makeRound(mode: Mode, theme: Theme, now = Date.now(), seed = 0): Round { const words = ANSWERS[theme]; const answer = words[seed % words.length] ?? words[0] ?? "AROSE"; return { answer, guesses: [], mode, theme, deadline: MODES[mode].seconds ? now + MODES[mode].seconds * 1000 : null, hintUsed: false }; }
export function status(round: Round, now = Date.now()) { const limit = MODES[round.mode].attempts; if (round.guesses.at(-1) === round.answer) return "won" as const; if ((round.deadline !== null && now >= round.deadline) || round.guesses.length >= limit) return "lost" as const; return "playing" as const; }
export function hardModeMessage(round: Round, guess: string) { for (const prior of round.guesses) { evaluate(round.answer, prior).forEach((state, index) => { const letter = prior[index] ?? ""; if (state === "correct" && guess[index] !== letter) throw new Error(`Keep ${letter} in position ${index + 1}.`); if (state === "present" && !guess.includes(letter)) throw new Error(`Guess must include ${letter}.`); }); } }
export function clue(theme: Theme) { return ({ everyday: "Dawn's opposite, in a five-letter mood.", nature: "A living landscape word.", food: "Pantry poetry, five letters." })[theme]; }
export function hint(round: Round) { return `Think ${round.theme}: a familiar ${round.answer.includes("A") ? "vowel-rich" : "consonant-led"} word.`; }
export function updateStats(stats: Statistics, result: "won" | "lost") { const streak = result === "won" ? stats.streak + 1 : 0; return { wins: stats.wins + (result === "won" ? 1 : 0), losses: stats.losses + (result === "lost" ? 1 : 0), streak, bestStreak: Math.max(stats.bestStreak, streak) }; }
