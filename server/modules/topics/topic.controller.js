const { getAllTopicsWithProblems } = require('./topic.service');

const getAll = async (req, res) => {
  try {
    const topics = await getAllTopicsWithProblems();
    res.json({ topics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll };
