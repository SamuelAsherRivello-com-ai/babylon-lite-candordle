import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const source = JSON.parse(readFileSync(resolve("node_modules/an-array-of-english-words/index.json"), "utf8")) as string[];
const words = [...new Set(source.map((word) => word.toUpperCase()).filter((word) => /^[A-Z]{5}$/.test(word)))].sort();
const output = `// Generated from an-array-of-english-words@2.0.0 (MIT). Do not edit manually.\nexport const FIVE_LETTER_WORDS = new Set<string>(${JSON.stringify(words)});\n`;
writeFileSync(resolve("wordle-clone/src/game/dictionary.ts"), output, "utf8");
console.log(`Generated ${words.length} five-letter English words.`);
