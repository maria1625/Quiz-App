import { describe, expect, it, vi } from "vitest";
import { fetchCountries } from "../services/countriesApi";

describe("countries API", () => {
  it("requests the countries endpoint with the expected fields", async () => {
    const fetchMock = vi.fn(async (..._args: unknown[]) => ({
      ok: true,
      json: async () => [
        {
          name: { common: "Colombia", official: "Republic of Colombia" },
          capital: ["Bogotá"],
          region: "Americas",
          flags: { svg: "flag.svg" },
          population: 1,
        },
      ],
    }));

    vi.stubGlobal("fetch", fetchMock);

    const countries = await fetchCountries();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [firstCall] = fetchMock.mock.calls;
    const url = firstCall?.[0];
    expect(String(url)).toContain("https://restcountries.com/v3.1/all?fields=");
    expect(Array.isArray(countries)).toBe(true);
    expect(countries[0]?.name?.common).toBe("Colombia");
  });

  it("throws a friendly error message when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, json: async () => [] })));

    await expect(fetchCountries()).rejects.toThrow(
      "No se pudieron cargar los países (error del servidor).",
    );
  });
});
