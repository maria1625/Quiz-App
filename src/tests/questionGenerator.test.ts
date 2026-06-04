import { describe, expect, it } from "vitest";
import { calculateScore, validateAnswer, type Question } from "../data/questionGenerator";

function createQuestion(correctAnswer: string, userAnswer: string | null): Question {
  return {
    id: 1,
    country: {
      name: { common: correctAnswer, official: correctAnswer },
      capital: ["Test Capital"],
      region: "Test Region",
      flags: { svg: "" },
      population: 1000,
    },
    question: "What is this country?",
    correctAnswer,
    options: [correctAnswer, "Other"],
    userAnswer,
    isAnswered: userAnswer !== null,
  };
}

describe("question scoring", () => {
  it("validates a correct answer", () => {
    const question = createQuestion("Colombia", null);

    expect(validateAnswer(question, "Colombia")).toBe(true);
  });

  it("calculates score from answered questions", () => {
    const questions = [
      createQuestion("Colombia", "Colombia"),
      createQuestion("Peru", "Chile"),
      createQuestion("Brazil", "Brazil"),
    ];

    expect(calculateScore(questions)).toBe(2);
  });
});
