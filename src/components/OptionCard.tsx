interface OptionCardProps {
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

export function OptionCard({ option, isCorrect, isSelected, isAnswered, onClick }: OptionCardProps) {
  const getStyles = () => {
    if (!isAnswered) {
      return isSelected
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-blue-600";
    }

    if (isSelected) {
      return isCorrect
        ? "bg-green-600 text-white border-green-600"
        : "bg-red-600 text-white border-red-600";
    }

    return isCorrect
      ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 border-green-600"
      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600";
  };

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={`w-full p-4 rounded-lg border-2 font-semibold transition-all duration-200 ${getStyles()}`}
    >
      {option}
    </button>
  );
}
