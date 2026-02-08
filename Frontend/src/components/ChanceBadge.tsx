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
  // Common styles for all states
  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider border transition-colors shadow-sm cursor-pointer";

  if (loading) {
    return (
      <span
        className={`${baseStyles} bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 animate-pulse cursor-wait`}
      >
        <svg
          className="animate-spin h-3.5 w-3.5"
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
        className={`${baseStyles} bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/20`}
      >
        <svg
          className="w-3.5 h-3.5"
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

  // Modern "Glassy" status colors
  const statusStyles = {
    HIGH: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
    MEDIUM:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
    LOW: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/20",
  };

  const statusIcons = {
    HIGH: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Check Circle
    MEDIUM:
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", // Warning
    LOW: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", // X Circle
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${statusStyles[analysis.chanceLevel]}`}
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={statusIcons[analysis.chanceLevel]}
        />
      </svg>
      {analysis.chanceLevel} ({analysis.chancePercentage}%)
    </button>
  );
}
