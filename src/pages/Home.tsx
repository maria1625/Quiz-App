import { useNavigate } from "react-router-dom";
import { HighScore } from "../components/HighScore";

export default function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="mx-auto w-full max-w-4xl py-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Pon a prueba tu conocimiento del mundo
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-2xl">
          <span aria-hidden="true">🇨🇴</span>
          <span aria-hidden="true">🇲🇽</span>
          <span aria-hidden="true">🇧🇷</span>
          <span aria-hidden="true">🇪🇸</span>
          <span aria-hidden="true">🇺🇸</span>
          <span aria-hidden="true">🇫🇷</span>
          <span aria-hidden="true">🇯🇵</span>
          <span aria-hidden="true">🇰🇷</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-center backdrop-blur dark:border-gray-800 dark:bg-gray-950/30">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              10 preguntas
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              15s por pregunta
            </span>
        </div>

        <div className="w-full max-w-sm">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Iniciar Quiz
          </button>
        </div>

        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <HighScore label="Mejor puntaje" />
          </div>
        </div>
      </div>
    </div>
  );
}
