import type { Country } from "../services/countriesApi";

export interface Question {
  id: number;
  country: Country;
  question: string;
  correctAnswer: string;
  options: string[];
  userAnswer: string | null;
  isAnswered: boolean;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatRegion(region: string): string {
  switch (region) {
    case "Americas":
      return "Américas";
    case "Europe":
      return "Europa";
    case "Asia":
      return "Asia";
    case "Africa":
      return "África";
    case "Oceania":
      return "Oceanía";
    case "Antarctic":
      return "Antártida";
    default:
      return region || "Desconocida";
  }
}

export function generateQuestions(countries: Country[], count: number = 10): Question[] {
  const selectedCountries = shuffle(countries).slice(0, count);

  return selectedCountries.map((country, index) => {
    const correctAnswer = country.name.common;
    const wrongAnswers = shuffle(countries.filter((c) => c.name.common !== correctAnswer))
      .slice(0, 3)
      .map((c) => c.name.common);

    const options = shuffle([correctAnswer, ...wrongAnswers]);
    const capital = country.capital?.[0] || "Desconocida";
    const region = formatRegion(country.region);

    return {
      id: index,
      country,
      question: `¿Cuál es el país cuya capital es ${capital} y está en ${region}?`,
      correctAnswer,
      options,
      userAnswer: null,
      isAnswered: false,
    };
  });
}

export function validateAnswer(question: Question, selectedAnswer: string): boolean {
  return selectedAnswer === question.correctAnswer;
}

export function calculateScore(questions: Question[]): number {
  return questions.filter(q => validateAnswer(q, q.userAnswer || "")).length;
}
