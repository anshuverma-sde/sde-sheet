import axiosInstance from '@/modules/shared/lib/axiosInstance';

export const fetchTopics = () =>
  axiosInstance.get('/api/topics').then((r) => r.data.topics);

export const fetchProgress = () =>
  axiosInstance.get('/api/progress').then((r) => r.data.completedIds);

export const markDone = (problemId) =>
  axiosInstance.post('/api/progress', { problemId });

export const unmark = (problemId) =>
  axiosInstance.delete(`/api/progress/${problemId}`);
