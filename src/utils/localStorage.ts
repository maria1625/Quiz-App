const HIGH_SCORE_KEY = "country-quiz-high-score";
const THEME_KEY = "country-quiz-theme";
export const HIGH_SCORE_UPDATED_EVENT = "country-quiz-high-score-updated";

export type ThemeMode = "light" | "dark";

function readNumber(key: string): number {
  try {
    const value = globalThis.localStorage.getItem(key);
    return value ? Number(value) : 0;
  } catch {
    return 0;
  }
}

export function getHighScore(): number {
  const score = readNumber(HIGH_SCORE_KEY);
  return Number.isFinite(score) && score > 0 ? score : 0;
}

export function saveHighScore(score: number): number {
  const currentHighScore = getHighScore();
  const nextHighScore = Math.max(currentHighScore, score);

  try {
    globalThis.localStorage.setItem(HIGH_SCORE_KEY, String(nextHighScore));
  } catch {
    return currentHighScore;
  }

  try {
    globalThis.dispatchEvent(new CustomEvent(HIGH_SCORE_UPDATED_EVENT, { detail: nextHighScore }));
  } catch {
    // Updating storage is the important part; the event only refreshes mounted UI.
  }

  return nextHighScore;
}

export function getStoredTheme(): ThemeMode | null {
  try {
    const value = globalThis.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: ThemeMode): void {
  try {
    globalThis.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // The UI can still switch theme even when storage is unavailable.
  }
}
