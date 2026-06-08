'use client';

import { useEffect, useState } from 'react';
import { fetchTopics } from '../sheet.api';

export function useTopics() {
  const [topics, setTopics]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(() => setError('Failed to load topics'))
      .finally(() => setLoading(false));
  }, []);

  return { topics, loading, error };
}
