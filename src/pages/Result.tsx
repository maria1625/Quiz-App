import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { score: number; totalQuestions: number } | null;

  const score = state?.score ?? 0;
  const totalQuestions = state?.totalQuestions ?? 0;

  const handlePlayAgain = () => {
    navigate("/quiz", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 ¡Felicidades!</h1>

        <p className="text-gray-600 mb-6">Has completado el Country Quiz.</p>

        <div className="mb-6">
          <p className="text-lg text-gray-700">Tu puntuación fue:</p>

          <p className="text-5xl font-bold text-blue-600 mt-2">
            {score} / {totalQuestions}
          </p>

          {!state && (
            <p className="mt-3 text-sm text-gray-500">
              No se encontró el resultado del intento anterior. Inicia un nuevo quiz.
            </p>
          )}
        </div>

        <button
          onClick={handlePlayAgain}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
            transition
          "
        >
          Volver a jugar
        </button>
      </div>
    </div>
  );
}
