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
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Failed to fetch countries");
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}

export function getRandomCountries(countries: Country[], count: number): Country[] {
  const shuffled = [...countries].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
