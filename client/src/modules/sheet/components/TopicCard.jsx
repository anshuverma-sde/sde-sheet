'use client';

import { useState } from 'react';
import ProblemRow from './ProblemRow';

export default function TopicCard({ topic, completed, onToggle }) {
  const [open, setOpen] = useState(true);

  const doneCount = topic.problems.filter((p) => completed.has(p._id)).length;
  const total     = topic.problems.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-gray-800">{topic.title}</span>
          {topic.description && (
            <span className="hidden md:block text-xs text-gray-400">{topic.description}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Mini progress */}
          <span className="text-xs text-gray-500 font-medium">
            {doneCount}/{total}
          </span>
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: total > 0 ? `${(doneCount / total) * 100}%` : '0%' }}
            />
          </div>
          {/* Chevron */}
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Problems table */}
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="px-4 py-2 w-10" />
                <th className="px-2 py-2 text-xs text-gray-400 font-medium w-8">#</th>
                <th className="px-4 py-2 text-xs text-gray-500 font-medium">Problem</th>
                <th className="px-4 py-2 text-xs text-gray-500 font-medium hidden sm:table-cell">Difficulty</th>
                <th className="px-4 py-2 text-xs text-gray-500 font-medium">Links</th>
              </tr>
            </thead>
            <tbody>
              {topic.problems.map((problem, i) => (
                <ProblemRow
                  key={problem._id}
                  problem={problem}
                  index={i + 1}
                  isCompleted={completed.has(problem._id)}
                  onToggle={onToggle}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
