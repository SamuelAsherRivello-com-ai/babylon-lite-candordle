import type { Mode, Theme } from "./engine.ts";

export const SESSION_HISTORY_KEY = "wordle-clone.v1.session-history";
export const SESSION_HISTORY_LIMIT = 5_000;

export type SessionEventType = "app_opened" | "app_hidden" | "app_closed" | "round_started" | "round_finished";
export type SessionHistoryEvent = {
  id: string;
  type: SessionEventType;
  occurredAt: string;
  sessionId: string;
  schemaVersion: string;
  appVersion: string;
  mode?: Mode;
  theme?: Theme;
  outcome?: "won" | "lost";
  guesses?: number;
  durationSeconds?: number;
  remainingSeconds?: number;
};

export type SessionHistory = {
  schemaVersion: string;
  events: SessionHistoryEvent[];
};

export function readSessionHistory(value: string | null, appVersion: string): SessionHistory {
  if (!value) return { schemaVersion: appVersion, events: [] };
  try {
    const parsed = JSON.parse(value) as Partial<SessionHistory>;
    if (!Array.isArray(parsed.events)) return { schemaVersion: appVersion, events: [] };
    return { schemaVersion: appVersion, events: parsed.events.filter(isSessionHistoryEvent).slice(-SESSION_HISTORY_LIMIT) };
  } catch {
    return { schemaVersion: appVersion, events: [] };
  }
}

export function appendSessionEvent(history: SessionHistory, event: SessionHistoryEvent, appVersion: string): SessionHistory {
  return { schemaVersion: appVersion, events: [...history.events, event].slice(-SESSION_HISTORY_LIMIT) };
}

function isSessionHistoryEvent(value: unknown): value is SessionHistoryEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Partial<SessionHistoryEvent>;
  return typeof event.id === "string" && typeof event.type === "string" && typeof event.occurredAt === "string" && typeof event.sessionId === "string" && typeof event.schemaVersion === "string" && typeof event.appVersion === "string";
}
