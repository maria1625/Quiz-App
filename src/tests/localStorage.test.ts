import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHighScore, getStoredTheme, saveHighScore, saveTheme } from "../utils/localStorage";

function createStorageMock() {
  const data = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => data.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      data.set(key, value);
    }),
    clear: vi.fn(() => data.clear()),
  };
}

describe("localStorage utilities", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorageMock());
    vi.stubGlobal("dispatchEvent", vi.fn());
  });

  it("keeps the highest score when saving a lower score", () => {
    saveHighScore(8);
    const highScore = saveHighScore(5);

    expect(highScore).toBe(8);
    expect(getHighScore()).toBe(8);
  });

  it("saves and reads the selected theme", () => {
    saveTheme("dark");

    expect(getStoredTheme()).toBe("dark");
  });
});
