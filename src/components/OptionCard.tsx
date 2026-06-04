interface OptionCardProps {
  label: string;
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

export function OptionCard({ label, option, isCorrect, isSelected, isAnswered, onClick }: OptionCardProps) {
  const variant = !isAnswered
    ? "idle"
    : isCorrect
      ? "correct"
      : isSelected
        ? "wrong"
        : "muted";

  const buttonClassName = [
    "group w-full rounded-2xl border p-4 text-left shadow-sm transition",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
    !isAnswered ? "hover:-translate-y-0.5 hover:shadow-md" : "",
    variant === "idle"
      ? "border-gray-200 bg-white/90 hover:border-blue-300 dark:border-gray-800 dark:bg-gray-950/30 dark:hover:border-blue-700"
      : "",
    variant === "correct"
      ? "border-green-500 bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-100"
      : "",
    variant === "wrong" ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100" : "",
    variant === "muted"
      ? "border-gray-200 bg-white/60 text-gray-600 dark:border-gray-800 dark:bg-gray-950/10 dark:text-gray-400"
      : "",
  ].join(" ");

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      aria-pressed={isSelected}
      className={buttonClassName}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold",
              variant === "idle"
                ? "bg-gray-100 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 dark:bg-gray-800 dark:text-gray-200 dark:group-hover:bg-blue-950/60 dark:group-hover:text-blue-200"
                : variant === "correct"
                  ? "bg-green-600 text-white"
                  : variant === "wrong"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300",
            ].join(" ")}
          >
            {label}
          </span>

          <span className="pt-1 text-base font-semibold">{option}</span>
        </div>

        <span className="pt-1 text-lg">
          {variant === "correct" ? "✅" : variant === "wrong" ? "❌" : ""}
        </span>
      </div>
    </button>
  );
}
