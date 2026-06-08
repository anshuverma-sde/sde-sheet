const { getByTopic } = require('./problem.service');

const getByTopicId = async (req, res) => {
  try {
    const { topicId } = req.query;
    if (!topicId) {
      return res.status(400).json({ message: 'topicId query param required' });
    }
    const problems = await getByTopic(topicId);
    res.json({ problems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getByTopicId };
