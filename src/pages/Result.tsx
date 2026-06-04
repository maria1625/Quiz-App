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

  const handlePlayAgain = () => {
    navigate("/quiz", { replace: true });
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-4xl font-bold text-green-600">Resultado final</h1>

        <p className="mb-6 text-gray-600 dark:text-gray-300">Has completado el Country Quiz.</p>

        <div className="mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-200">Tu puntuacion fue:</p>

          <p className="mt-2 text-5xl font-bold text-blue-600">
            {score} / {totalQuestions}
          </p>

          <div className="mt-5 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-100">
            <p className="text-sm font-semibold">Mejor puntaje guardado</p>
            <p className="text-3xl font-bold">{highScore}</p>
          </div>

          {!state && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              No se encontro el resultado del intento anterior. Inicia un nuevo quiz.
            </p>
          )}
        </div>

        <button
          onClick={handlePlayAgain}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Volver a jugar
        </button>
      </div>
    </div>
  );
}
