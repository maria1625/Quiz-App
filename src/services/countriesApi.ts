export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  flags: {
    svg: string;
  };
  population: number;
}

export async function fetchCountries(): Promise<Country[]> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);

  try {
    const url =
      "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population";

    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error("No se pudieron cargar los países (error del servidor).");
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("La respuesta del servidor no tiene el formato esperado.");
    }

    return data as Country[];
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("La petición tardó demasiado. Revisa tu conexión e intenta de nuevo.", {
        cause: error,
      });
    }

    if (error instanceof Error) {
      throw new Error(
        error.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor. Revisa tu conexión o bloqueadores (VPN/AdBlock) e intenta de nuevo."
          : error.message,
        { cause: error },
      );
    }

    throw new Error("No se pudo conectar con el servidor. Intenta de nuevo.", { cause: error });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function getRandomCountries(countries: Country[], count: number): Country[] {
  const shuffled = [...countries].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
