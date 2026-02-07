import React from 'react';
import { MatchResult } from '../types';

interface ResultsProps {
  matches: MatchResult[];
  categorized: {
    perfect: MatchResult[];
    good: MatchResult[];
    partial: MatchResult[];
  };
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ matches, categorized, onReset }) => {
  const formatAmount = (amount: number | string): string => {
    if (typeof amount === 'string') return amount;
    return `$${amount.toLocaleString()}`;
  };

  const renderMatchCard = (matchResult: MatchResult) => {
    const { award, matchScore, matchReasons, missingRequirements } = matchResult;
    
    let matchLevelColor = 'bg-green-100 text-green-800';
    let matchLevelText = 'Perfect Match';
    
    if (matchScore < 90 && matchScore >= 60) {
      matchLevelColor = 'bg-blue-100 text-blue-800';
      matchLevelText = 'Good Match';
    } else if (matchScore < 60) {
      matchLevelColor = 'bg-yellow-100 text-yellow-800';
      matchLevelText = 'Partial Match';
    }

    return (
      <div key={award.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{award.name}</h3>
            <div className="flex gap-2 mt-2">
              <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {award.type}
              </span>
              <span className={`inline-block text-xs px-2 py-1 rounded ${matchLevelColor}`}>
                {matchLevelText} ({matchScore}%)
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">{formatAmount(award.amount)}</div>
            {award.applicationDeadline && (
              <div className="text-xs text-gray-500 mt-1">Due: {award.applicationDeadline}</div>
            )}
          </div>
        </div>

        <p className="text-gray-700 mb-4">{award.description}</p>

        {matchReasons.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Why you match:</h4>
            <ul className="space-y-1">
              {matchReasons.map((reason, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {missingRequirements.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠ Requirements you may not meet:</h4>
            <ul className="space-y-1">
              {missingRequirements.map((req, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {award.requiredDocumentation && award.requiredDocumentation.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">📄 Required Documentation:</h4>
            <ul className="space-y-1">
              {award.requiredDocumentation.map((doc, idx) => (
                <li key={idx} className="text-sm text-gray-600">• {doc}</li>
              ))}
            </ul>
          </div>
        )}

        {award.sourceUrl && (
          <div className="mt-4">
            <a
              href={award.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              View more details →
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Your Matches</h2>
            <p className="text-gray-600 mt-1">
              Found {matches.length} scholarship{matches.length !== 1 ? 's' : ''} and bursary opportunities for you!
            </p>
          </div>
          <button
            onClick={onReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
          >
            Start Over
          </button>
        </div>

        {matches.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-700">{categorized.perfect.length}</div>
              <div className="text-sm text-gray-600">Perfect Matches</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-700">{categorized.good.length}</div>
              <div className="text-sm text-gray-600">Good Matches</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-700">{categorized.partial.length}</div>
              <div className="text-sm text-gray-600">Partial Matches</div>
            </div>
          </div>
        )}
      </div>

      {matches.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
          <p className="text-gray-600">
            We couldn't find any scholarships or bursaries that match your current profile.
            Try adjusting your responses or check back later for new opportunities.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categorized.perfect.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">✨ Perfect Matches</h3>
              <div className="space-y-4">
                {categorized.perfect.map(renderMatchCard)}
              </div>
            </div>
          )}

          {categorized.good.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4 mt-8">👍 Good Matches</h3>
              <div className="space-y-4">
                {categorized.good.map(renderMatchCard)}
              </div>
            </div>
          )}

          {categorized.partial.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-yellow-700 mb-4 mt-8">🤔 Partial Matches</h3>
              <p className="text-gray-600 mb-4">
                These awards may have some requirements you don't meet, but you might still be eligible. Review carefully.
              </p>
              <div className="space-y-4">
                {categorized.partial.map(renderMatchCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
