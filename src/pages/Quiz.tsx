import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions, calculateScore, type Question } from "../data/questionGenerator";
import { fetchCountries } from "../services/countriesApi";
import { OptionCard } from "../components/OptionCard";
import { QuestionCard } from "../components/QuestionCard";

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAnswerClick = (selectedOption: string) => {
    if (questions[currentIndex]?.isAnswered) return;

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].userAnswer = selectedOption;
    updatedQuestions[currentIndex].isAnswered = true;
    setQuestions(updatedQuestions);
  };

  const handleNext = () => {
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

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
        />

        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <OptionCard
              key={idx}
              option={option}
              isCorrect={option === currentQuestion.correctAnswer}
              isSelected={option === currentQuestion.userAnswer}
              isAnswered={currentQuestion.isAnswered}
              onClick={() => handleAnswerClick(option)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Anterior
          </button>

          <div className="flex gap-2 flex-wrap justify-center">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={[
                  "w-10 h-10 rounded-full font-bold transition-colors",
                  idx === currentIndex
                    ? "bg-blue-600 text-white"
                    : questions[idx].isAnswered
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600",
                ].join(" ")}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!currentQuestion.isAnswered}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentIndex === questions.length - 1 ? "Terminar" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
