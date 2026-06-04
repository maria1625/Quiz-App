import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  initialSeconds: number;
  isRunning: boolean;
  resetKey: string | number;
  onTimeUp: () => void;
}

export function useTimer({ initialSeconds, isRunning, resetKey, onTimeUp }: UseTimerOptions) {
  const [timerState, setTimerState] = useState({ resetKey, secondsLeft: initialSeconds });
  const onTimeUpRef = useRef(onTimeUp);
  const secondsLeft = timerState.resetKey === resetKey ? timerState.secondsLeft : initialSeconds;

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setTimerState((currentState) => {
        const currentSeconds =
          currentState.resetKey === resetKey ? currentState.secondsLeft : initialSeconds;

        if (currentSeconds <= 1) {
          window.clearInterval(intervalId);
          onTimeUpRef.current();
          return { resetKey, secondsLeft: 0 };
        }

        return { resetKey, secondsLeft: currentSeconds - 1 };
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [initialSeconds, isRunning, resetKey]);

  return {
    secondsLeft,
    progress: (secondsLeft / initialSeconds) * 100,
  };
}
