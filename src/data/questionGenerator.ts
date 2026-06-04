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

export function generateQuestions(countries: Country[], count: number = 10): Question[] {
  const selectedCountries = countries.sort(() => Math.random() - 0.5).slice(0, count);

  return selectedCountries.map((country, index) => {
    const correctAnswer = country.name.common;
    const wrongAnswers = countries
      .filter(c => c.name.common !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(c => c.name.common);

    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    return {
      id: index,
      country,
      question: `This country has the capital ${country.capital?.[0] || "Unknown"} and is located in ${country.region}. What is its name?`,
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
