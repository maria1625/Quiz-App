interface TimerProps {
  secondsLeft: number;
  progress: number;
}

export function Timer({ secondsLeft, progress }: TimerProps) {
  const isAlmostDone = secondsLeft <= 5;

  return (
    <div className="mb-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tiempo restante</span>
        <span
          className={[
            "min-w-12 rounded-full px-3 py-1 text-center text-sm font-bold",
            isAlmostDone ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200" : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
          ].join(" ")}
        >
          {secondsLeft}s
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={[
            "h-full rounded-full transition-all duration-300",
            isAlmostDone ? "bg-red-500" : "bg-blue-600",
          ].join(" ")}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
