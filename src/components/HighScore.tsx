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
    <div className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-900 shadow-sm dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-100">
      <span className="text-xl">🏆</span>
      <div>
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-xl font-extrabold leading-tight">{highScore}</p>
      </div>
    </div>
  );
}
