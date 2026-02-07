import { AIAnalysis } from "../types";

interface ChanceBadgeProps {
  analysis: AIAnalysis | null;
  loading?: boolean;
  onClick?: () => void;
}

export default function ChanceBadge({
  analysis,
  loading,
  onClick,
}: ChanceBadgeProps) {
  if (loading) {
    return (
      <span className="inline-flex text-xs px-2 py-1 rounded text-sm bg-gray-100 text-gray-600 animate-pulse">
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Analyzing...
      </span>
    );
  }

  if (!analysis) {
    return (
      <button
        onClick={onClick}
        className="inline-flex text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors cursor-pointer"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Analyze Chances
      </button>
    );
  }

  const colors = {
    HIGH: "bg-green-100 text-green-800 border-green-200",
    MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
    LOW: "bg-red-100 text-red-800 border-red-200",
  };

  const icons = {
    HIGH: "🟢",
    MEDIUM: "🟡",
    LOW: "🔴",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-block text-xs px-2 py-1 rounded ${
        colors[analysis.chanceLevel]
      } hover:opacity-80 transition-opacity cursor-pointer`}
    >
      <span className="mr-1">{icons[analysis.chanceLevel]}</span>
      {analysis.chanceLevel} ({analysis.chancePercentage}%)
    </button>
  );
}
