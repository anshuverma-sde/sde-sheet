const Problem = require('./problem.model');

const getByTopic = async (topicId) => {
  return Problem.find({ topicId }).sort({ order: 1 }).lean();
};

module.exports = { getByTopic };
