import type { Question } from "../data/questionGenerator";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
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

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const percent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-gray-950/40 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
            Pregunta {questionNumber}/{totalQuestions}
          </span>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{percent}%</span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={question.country.flags.svg}
            alt=""
            loading="lazy"
            className="h-10 w-14 rounded-xl border border-gray-200 object-cover shadow-sm dark:border-gray-800"
          />
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
          {question.question}
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200">
            Capital: {question.country.capital?.[0] || "Desconocida"}
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200">
            Región: {formatRegion(question.country.region)}
          </span>
        </div>
      </div>
    </div>
  );
}
