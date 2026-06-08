'use client';

import { useEffect, useState } from 'react';
import { fetchProgress, markDone, unmark } from '../sheet.api';

export function useProgress() {
  const [completed, setCompleted] = useState(new Set());
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetchProgress()
      .then((ids) => setCompleted(new Set(ids)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (problemId) => {
    const isDone = completed.has(problemId);

    // Optimistic update
    setCompleted((prev) => {
      const next = new Set(prev);
      isDone ? next.delete(problemId) : next.add(problemId);
      return next;
    });

    try {
      if (isDone) {
        await unmark(problemId);
      } else {
        await markDone(problemId);
      }
    } catch {
      // Revert on failure
      setCompleted((prev) => {
        const next = new Set(prev);
        isDone ? next.add(problemId) : next.delete(problemId);
        return next;
      });
    }
  };

  return { completed, loading, toggle };
}
