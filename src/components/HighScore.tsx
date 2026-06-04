import { useEffect, useState } from "react";
import { getHighScore, HIGH_SCORE_UPDATED_EVENT } from "../utils/localStorage";

interface HighScoreProps {
  label?: string;
}

export function HighScore({ label = "Mejor puntaje" }: HighScoreProps) {
  const [highScore, setHighScore] = useState(getHighScore);

  useEffect(() => {
    const handleHighScoreUpdate = () => {
      setHighScore(getHighScore());
    };

    window.addEventListener(HIGH_SCORE_UPDATED_EVENT, handleHighScoreUpdate);

    return () => {
      window.removeEventListener(HIGH_SCORE_UPDATED_EVENT, handleHighScoreUpdate);
    };
  }, []);

  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-100">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-2xl font-bold">{highScore}</p>
    </div>
  );
}
