import { FIVE_LETTER_WORDS } from "./dictionary.ts";

export type TileState = "empty" | "absent" | "present" | "correct";
export type Mode = "classic" | "speed" | "two";
export type Theme = "everyday" | "nature" | "food" | "southAfrica" | "psychology";
export interface Settings { hard: boolean; sound: boolean; clues: boolean; }
export interface Round { answer: string; guesses: string[]; mode: Mode; theme: Theme; deadline: number | null; hintUsed: boolean; started: boolean; hardMode: boolean; }
export interface Statistics { wins: number; losses: number; streak: number; bestStreak: number; bestSpeedSeconds: number | null; }
export interface CategoryProgress { played: number; won: number; lost: number; completed: number; allHardCompleted: boolean; }
export type ModeCategoryProgress = Record<Mode, Record<Theme, CategoryProgress>>;
function toHundred(words: string[]) {
  return [...words, ...[...FIVE_LETTER_WORDS].filter((word) => !words.includes(word))].slice(0, 100);
}

export const ANSWERS: Record<Theme, string[]> = {
  everyday: toHundred(["AROSE", "CRANE", "SLATE", "MONEY", "PLANT"]),
  nature: toHundred(["MAPLE", "RIVER", "CORAL", "OCEAN", "MOSSY"]),
  food: toHundred(["BREAD", "OLIVE", "PEACH", "GRAPE", "HONEY"]),
  southAfrica: ["ALOES", "BEACH", "BRAAI", "CAPES", "CAVES", "CEDAR", "CLIFF", "COAST", "COINS", "CRANE", "DUNES", "EAGLE", "ELAND", "GENET", "GOLDS", "GRASS", "HONEY", "HORSE", "HYENA", "ISLES", "KAROO", "KUDUS", "KWELA", "LEARN", "LIONS", "MAPLE", "MINES", "MONEY", "MOUNT", "NATAL", "OCEAN", "OLIVE", "RHINO", "PLAIN", "PLANT", "PRIDE", "RANDS", "RIDGE", "RIVER", "ROCKY", "RUGBY", "SABLE", "SHEEP", "OCHRE", "SOUTH", "STORK", "TABLE", "TOWNS", "TRAIL", "REEDS", "VELDT", "VINES", "WINEY", "KOPJE", "ZEBRA", "ZULUS", "ACRES", "BIRDS", "BLACK", "BLUEY", "BROWN", "CLOUD", "CRAFT", "CROWN", "DANCE", "EARTH", "FARMS", "FIELD", "FLORA", "FRESH", "GREEN", "GROVE", "HERDS", "HILLS", "HOTEL", "HOUSE", "IVORY", "LEAFY", "LIGHT", "LODGE", "MANGO", "METAL", "OASIS", "PEACH", "RAINY", "ROOTS", "ROADS", "SANDS", "SEEDS", "SHORE", "SMOKE", "SNAKE", "STONE", "SUNNY", "TREES", "WATER", "WHEAT", "WILDS", "WINES", "WOODS"],
  psychology: ["ABUSE", "ADAPT", "AGING", "ALERT", "ALTER", "AMITY", "ANGER", "AVOID", "AWARE", "BRAIN", "BLUSH", "BONDS", "CALMS", "CARES", "CLASH", "CLEAR", "COPES", "CRAVE", "DREAD", "DREAM", "DRIVE", "DOUBT", "EMOTE", "EQUAL", "ETHIC", "FAITH", "FALSE", "FEARS", "FIXED", "FOCUS", "FORMS", "GAMES", "GAZES", "GOALS", "GRIEF", "GUILT", "HABIT", "HAPPY", "HEART", "HUMOR", "IDEAL", "IDOLS", "IMAGE", "INNER", "JUDGE", "KNOWS", "LEARN", "LOGIC", "LONER", "LOVED", "LOVES", "LOYAL", "MEANS", "MINDS", "MOODS", "MORAL", "NERVE", "NEEDS", "PANIC", "PAINS", "PEACE", "PEERS", "POWER", "PRIDE", "PROUD", "PSYCH", "QUICK", "QUIET", "RAGES", "REACT", "RELAX", "RISKY", "RULES", "SADLY", "SCARE", "SENSE", "SHAME", "SHYLY", "SIGNS", "SKILL", "SLEEP", "SMILE", "SOULS", "SPEAK", "STARE", "STUCK", "STYLE", "TEACH", "TEARS", "TENSE", "THINK", "TRAIT", "TREAT", "TRUST", "TRUTH", "VALUE", "VOICE", "WANTS", "WORRY", "YOUTH"],
};
const WORD_HELP: Record<string, { clue: string; hint: string }> = {
  AROSE: { clue: "Came into being, in the past.", hint: "Think of something beginning or appearing." },
  CRANE: { clue: "A long-legged bird, or a construction lifter.", hint: "It can fly—or lift a heavy load." },
  SLATE: { clue: "A dark writing stone or a clean starting point.", hint: "Think school chalkboards and fresh starts." },
  MONEY: { clue: "Coins and notes used to pay.", hint: "It is something you spend, save, or earn." },
  PLANT: { clue: "A living green thing with roots, stems, and leaves.", hint: "Think of something that grows in soil." },
  MAPLE: { clue: "A tree known for syrup and bright autumn leaves.", hint: "Its leaf is on Canada's flag." },
  RIVER: { clue: "A natural stream flowing toward a lake, sea, or another stream.", hint: "It has banks but no money." },
  CORAL: { clue: "A colorful reef-builder that lives in the sea.", hint: "Think of a living underwater reef." },
  OCEAN: { clue: "The vast saltwater body covering most of Earth.", hint: "It is larger than a sea." },
  MOSSY: { clue: "Covered with a small, soft green plant.", hint: "Think damp stones and forest floors." },
  BREAD: { clue: "A baked staple often sliced for sandwiches.", hint: "It comes in loaves." },
  OLIVE: { clue: "A small savory fruit pressed for oil or served in a martini.", hint: "It may be green or black and grows on a tree." },
  PEACH: { clue: "A fuzzy stone fruit with sweet orange flesh.", hint: "It is also the color of a soft sunset." },
  GRAPE: { clue: "A small fruit eaten fresh or used to make wine.", hint: "It grows in bunches on vines." },
  HONEY: { clue: "A golden, sweet food made by bees.", hint: "Bees make it; tea often receives it." },
};
export const GUESSES = new Set([...FIVE_LETTER_WORDS, ...Object.values(ANSWERS).flat()]);
export const MODES: Record<Mode, { label: string; attempts: number; seconds: number | null }> = {
  classic: { label: "Classic", attempts: 6, seconds: null }, speed: { label: "Speed Wordle", attempts: 6, seconds: 60 }, two: { label: "Two-Guess Challenge", attempts: 2, seconds: null },
};
export const DEFAULT_SETTINGS: Settings = { hard: false, sound: true, clues: false };
export const DEFAULT_STATS: Statistics = { wins: 0, losses: 0, streak: 0, bestStreak: 0, bestSpeedSeconds: null };
export function createSeed() { return Math.floor(Math.random() * 0x7fffffff); }
export function createCategoryProgress(): Record<Theme, CategoryProgress> {
  return Object.fromEntries((Object.keys(ANSWERS) as Theme[]).map((theme) => [theme, { played: 0, won: 0, lost: 0, completed: 0, allHardCompleted: false }])) as Record<Theme, CategoryProgress>;
}
export function createModeCategoryProgress(): ModeCategoryProgress {
  return Object.fromEntries((Object.keys(MODES) as Mode[]).map((mode) => [mode, createCategoryProgress()])) as ModeCategoryProgress;
}
function hash(text: string) { return [...text].reduce((value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0, 2166136261); }
export function orderedAnswers(theme: Theme, seed: number) {
  const words = [...ANSWERS[theme]];
  let value = (seed ^ hash(theme)) >>> 0;
  const random = () => { value = ((value * 1664525) + 1013904223) >>> 0; return value / 0x100000000; };
  for (let index = words.length - 1; index > 0; index -= 1) {
    const next = Math.floor(random() * (index + 1));
    [words[index], words[next]] = [words[next]!, words[index]!];
  }
  return words;
}

export function evaluate(answer: string, guess: string): TileState[] {
  const states: TileState[] = Array(5).fill("absent"); const remaining = answer.split("");
  [...guess].forEach((letter, index) => { if (letter === answer[index]) { states[index] = "correct"; remaining[index] = ""; } });
  [...guess].forEach((letter, index) => { if (states[index] === "correct") return; const found = remaining.indexOf(letter); if (found >= 0) { states[index] = "present"; remaining[found] = ""; } });
  return states;
}
export function isValidWord(word: string) { return /^[A-Z]{5}$/.test(word) && GUESSES.has(word); }
export function makeRound(mode: Mode, theme: Theme, now = Date.now(), index = 0, randomSeed?: number): Round { const words = randomSeed === undefined ? ANSWERS[theme] : orderedAnswers(theme, randomSeed); const answer = words[index % words.length] ?? words[0] ?? "AROSE"; return { answer, guesses: [], mode, theme, deadline: null, hintUsed: false, started: false, hardMode: false }; }
export function status(round: Round, now = Date.now()) { const limit = MODES[round.mode].attempts; if (round.guesses.at(-1) === round.answer) return "won" as const; if ((round.deadline !== null && now >= round.deadline) || round.guesses.length >= limit) return "lost" as const; return "playing" as const; }
export function hardModeMessage(round: Round, guess: string) { for (const prior of round.guesses) { evaluate(round.answer, prior).forEach((state, index) => { const letter = prior[index] ?? ""; if (state === "correct" && guess[index] !== letter) throw new Error(`Keep ${letter} in position ${index + 1}.`); if (state === "present" && !guess.includes(letter)) throw new Error(`Guess must include ${letter}.`); }); } }
export function clue(round: Round) { const vowels = [...round.answer].filter((letter) => "AEIOU".includes(letter)).length; return WORD_HELP[round.answer]?.clue ?? `It starts with ${round.answer[0]} and has ${vowels} ${vowels === 1 ? "vowel" : "vowels"}.`; }
export function hint(round: Round) { return WORD_HELP[round.answer]?.hint ?? `It ends with ${round.answer.at(-1)}.`; }
export function updateStats(stats: Statistics, result: "won" | "lost", speedSeconds?: number) { const streak = result === "won" ? stats.streak + 1 : 0; const bestSpeedSeconds = result === "won" && speedSeconds !== undefined ? Math.min(stats.bestSpeedSeconds ?? speedSeconds, speedSeconds) : stats.bestSpeedSeconds; return { wins: stats.wins + (result === "won" ? 1 : 0), losses: stats.losses + (result === "lost" ? 1 : 0), streak, bestStreak: Math.max(stats.bestStreak, streak), bestSpeedSeconds }; }
