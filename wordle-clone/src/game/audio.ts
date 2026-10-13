import type { TileState } from "./engine.ts";

let context: AudioContext | undefined;

function audioContext() {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

function tone(frequency: number, duration: number, volume: number, delay: number, wave: OscillatorType = "sine") {
  const audio = audioContext();
  const start = audio.currentTime + delay;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

export function playTileReveal(states: TileState[], enabled: boolean) {
  if (!enabled) return;
  states.forEach((state, index) => {
    const delay = index * 0.19;
    if (state === "correct") {
      tone(820, 0.12, 0.025, delay);
      tone(1040, 0.09, 0.012, delay + 0.025);
    } else if (state === "present") {
      tone(560, 0.10, 0.02, delay);
      tone(700, 0.07, 0.008, delay + 0.02);
    } else {
      tone(235, 0.045, 0.014, delay);
    }
  });
}

export function playCelebration(enabled: boolean) {
  if (!enabled) return;
  tone(784, 0.14, 0.026, 0);
  tone(988, 0.15, 0.022, 0.14);
  tone(1175, 0.20, 0.019, 0.29);
}

export function playLoss(enabled: boolean) {
  if (!enabled) return;
  tone(108, 0.72, 0.018, 0, "sawtooth");
  tone(82, 0.68, 0.008, 0.04, "sine");
}
