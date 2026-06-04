import { useNavigate } from "react-router-dom";

function ResultsPage() {
  const navigate = useNavigate();

  // Datos temporales
  const score = 7;
  const totalQuestions = 10;

  const handlePlayAgain = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">

      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 ¡Felicidades!
        </h1>

        <p className="text-gray-600 mb-6">
          Has completado el Country Quiz.
        </p>

        <div className="mb-6">
          <p className="text-lg text-gray-700">
            Tu puntuación fue:
          </p>

          <p className="text-5xl font-bold text-blue-600 mt-2">
            {score} / {totalQuestions}
          </p>
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
          Jugar
        </button>

      </div>

    </div>
  );
}

export default ResultsPage;