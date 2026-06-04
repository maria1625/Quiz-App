import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">🌎 Country Quiz</h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Pon a prueba tus conocimientos sobre países, capitales, banderas y datos curiosos del mundo.
      </p>

      <button
        onClick={handleStartQuiz}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-semibold
          px-8
          py-3
          rounded-lg
          transition
          duration-300
          shadow-lg
        "
      >
        Iniciar Quiz
      </button>
    </div>
  );
}
