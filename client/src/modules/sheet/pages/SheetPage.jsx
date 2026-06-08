'use client';

import { useTopics }   from '../hooks/useTopics';
import { useProgress } from '../hooks/useProgress';
import TopicCard       from '../components/TopicCard';
import ProgressBar     from '../components/ProgressBar';
import Spinner         from '@/modules/shared/components/Spinner';

export default function SheetPage() {
  const { topics, loading: topicsLoading, error } = useTopics();
  const { completed, loading: progressLoading, toggle } = useProgress();

  const loading = topicsLoading || progressLoading;

  const totalProblems = topics.reduce((acc, t) => acc + t.problems.length, 0);
  const doneCount     = completed.size;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          DSA Practice Sheet
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          {topics.length} topics · {totalProblems} problems
        </p>
        <ProgressBar completed={doneCount} total={totalProblems} />
      </div>

      {/* Topic cards */}
      <div>
        {topics.map((topic) => (
          <TopicCard
            key={topic._id}
            topic={topic}
            completed={completed}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
