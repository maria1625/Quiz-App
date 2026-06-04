import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions, calculateScore, type Question } from "../data/questionGenerator";
import { fetchCountries } from "../services/countriesApi";
import { OptionCard } from "../components/OptionCard";
import { QuestionCard } from "../components/QuestionCard";
import { Timer } from "../components/Timer";
import { useTimer } from "../hooks/useTimer";
import { playCorrectSound, playIncorrectSound, playTimeoutSound } from "../utils/audio";

const QUESTION_TIME_LIMIT = 15;

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnswerHint, setShowAnswerHint] = useState(false);

  useEffect(() => {
    const initQuiz = async () => {
      try {
        setIsLoading(true);
        const countries = await fetchCountries();
        const newQuestions = generateQuestions(countries, 10);
        setQuestions(newQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar el quiz. Intenta de nuevo.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initQuiz();
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleTimeUp = useCallback(() => {
    setQuestions((currentQuestions) => {
      const question = currentQuestions[currentIndex];
      if (!question || question.isAnswered) return currentQuestions;

      const updatedQuestions = [...currentQuestions];
      updatedQuestions[currentIndex] = {
        ...question,
        userAnswer: null,
        isAnswered: true,
      };
      playTimeoutSound();

      return updatedQuestions;
    });
  }, [currentIndex]);

  const { secondsLeft, progress } = useTimer({
    initialSeconds: QUESTION_TIME_LIMIT,
    isRunning: Boolean(currentQuestion && !currentQuestion.isAnswered),
    resetKey: currentIndex,
    onTimeUp: handleTimeUp,
  });

  const handleAnswerClick = (selectedOption: string) => {
    if (questions[currentIndex]?.isAnswered) return;

    setShowAnswerHint(false);

    const updatedQuestions = [...questions];
    const current = updatedQuestions[currentIndex];
    updatedQuestions[currentIndex] = {
      ...current,
      userAnswer: selectedOption,
      isAnswered: true,
    };
    setQuestions(updatedQuestions);

    if (selectedOption === updatedQuestions[currentIndex].correctAnswer) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (!currentQuestion || !currentQuestion.isAnswered) {
      setShowAnswerHint(true);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const score = calculateScore(questions);
      navigate("/result", {
        state: { score, totalQuestions: questions.length },
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswerHint(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Cargando quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const optionLabels = ["A", "B", "C", "D"] as const;
  const isCurrentCorrect =
    currentQuestion.isAnswered && currentQuestion.userAnswer === currentQuestion.correctAnswer;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Quiz
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Responde y avanza. Al final verás tu puntaje.
          </p>
        </div>
      </div>

      <Timer secondsLeft={secondsLeft} progress={progress} />

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950/30 dark:text-gray-100 dark:hover:bg-gray-900/50 sm:w-auto"
        >
          Anterior
        </button>

        <div className="flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {questions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowAnswerHint(false);
                }}
                aria-label={`Ir a la pregunta ${idx + 1}`}
                className={[
                  "h-10 w-10 rounded-2xl text-sm font-bold transition",
                  idx === currentIndex
                    ? "bg-blue-600 text-white"
                    : q.isAnswered
                      ? "bg-green-600 text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950/30 dark:text-gray-200 dark:hover:bg-gray-900/50",
                ].join(" ")}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
        >
          {currentIndex === questions.length - 1 ? "Ver resultado" : "Siguiente"}
        </button>
      </div>

      <div className="mt-6 grid gap-3">
        {currentQuestion.options.map((option, idx) => (
          <OptionCard
            key={idx}
            label={optionLabels[idx] ?? String(idx + 1)}
            option={option}
            isCorrect={option === currentQuestion.correctAnswer}
            isSelected={option === currentQuestion.userAnswer}
            isAnswered={currentQuestion.isAnswered}
            onClick={() => handleAnswerClick(option)}
          />
        ))}
      </div>

      {showAnswerHint && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          Selecciona una opción para poder continuar.
        </div>
      )}

      {currentQuestion.isAnswered && (
        <div
          className={[
            "mt-4 rounded-2xl border px-5 py-4 text-sm font-semibold",
            isCurrentCorrect
              ? "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100"
              : "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100",
          ].join(" ")}
        >
          {isCurrentCorrect
            ? "¡Correcto! Puedes continuar."
            : `Incorrecto. La respuesta correcta es: ${currentQuestion.correctAnswer}`}
        </div>
      )}
    </div>
  );
}
