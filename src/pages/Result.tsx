import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveHighScore } from "../utils/localStorage";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { score: number; totalQuestions: number } | null;

  const score = state?.score ?? 0;
  const totalQuestions = state?.totalQuestions ?? 0;
  const [highScore] = useState(() => saveHighScore(score));
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const headline =
    percentage === 100
      ? "¡Perfecto!"
      : percentage >= 70
        ? "¡Muy bien!"
        : percentage >= 40
          ? "¡Buen intento!"
          : "¡A practicar!";

  const handlePlayAgain = () => {
    navigate("/quiz", { replace: true });
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      <div className="w-full rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/40 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {headline}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Resultado final del Country Quiz
          </p>

          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div
              className="rounded-full p-1 shadow-sm"
              style={{
                background: `conic-gradient(#2563eb ${percentage}%, rgba(148,163,184,0.35) 0)`,
              }}
            >
              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white text-center dark:bg-gray-950">
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{percentage}%</p>
                <p className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {score} / {totalQuestions}
                </p>
              </div>
            </div>

            <div className="w-full max-w-sm text-left">
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-100">
                <p className="text-sm font-semibold">Mejor puntaje</p>
                <p className="mt-1 text-3xl font-extrabold">{highScore}</p>
              </div>

              {!state && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  No se encontró el resultado del intento anterior. Inicia un nuevo quiz.
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handlePlayAgain}
              className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
            >
              Volver a jugar
            </button>
            <button
              type="button"
              onClick={() => navigate("/", { replace: true })}
              className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-100 dark:hover:bg-gray-900 sm:w-auto"
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
