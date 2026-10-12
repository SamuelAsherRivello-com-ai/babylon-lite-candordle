import assert from "node:assert/strict";
import test from "node:test";
import { GUESSES, evaluate, hardModeMessage, isValidWord, makeRound, status } from "../src/game/engine.ts";
test("word policy includes AROSE, BROKE, plurals and -ed",()=>{ for(const word of ["AROSE","BROKE","ROSES","BAKED"]) assert.ok(isValidWord(word)); assert.ok(GUESSES.has("AROSE")); });
test("evaluation handles duplicate letters",()=>assert.deepEqual(evaluate("AROSE","SHEEP"),["present","absent","present","absent","absent"]));
test("mode limits and timer end rounds",()=>{ const round={...makeRound("two","everyday"),guesses:["CRANE","SLATE"]};assert.equal(status(round),"lost");const speed={...makeRound("speed","everyday",0),deadline:0};assert.equal(status(speed,1),"lost"); });
test("hard mode preserves discovered exact positions",()=>{const round={...makeRound("classic","everyday"),answer:"AROSE",guesses:["CRANE"]};assert.throws(()=>hardModeMessage(round,"SPORE"));});
