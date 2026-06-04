import type { Question } from "../data/questionGenerator";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Question {questionNumber} of {totalQuestions}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {question.question}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Capital: {question.country.capital?.[0] || "Unknown"} | Region: {question.country.region}
        </p>
      </div>
    </div>
  );
}
