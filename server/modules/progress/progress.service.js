const UserProgress = require('./progress.model');

const getUserProgress = async (userId) => {
  const records = await UserProgress.find({ userId }).lean();
  return records.map((r) => r.problemId.toString());
};

const markDone = async (userId, problemId) => {
  await UserProgress.findOneAndUpdate(
    { userId, problemId },
    { userId, problemId },
    { upsert: true, new: true }
  );
};

const unmark = async (userId, problemId) => {
  await UserProgress.findOneAndDelete({ userId, problemId });
};

module.exports = { getUserProgress, markDone, unmark };
