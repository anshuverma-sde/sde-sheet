const { getUserProgress, markDone, unmark } = require('./progress.service');

const getProgress = async (req, res) => {
  try {
    const completedIds = await getUserProgress(req.user.id);
    res.json({ completedIds });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markProblemDone = async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ message: 'problemId is required' });
    }
    await markDone(req.user.id, problemId);
    res.json({ message: 'Progress saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const unmarkProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    await unmark(req.user.id, problemId);
    res.json({ message: 'Progress removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProgress, markProblemDone, unmarkProblem };
