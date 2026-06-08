const Topic = require('./topic.model');
const Problem = require('../problems/problem.model');

const getAllTopicsWithProblems = async () => {
  const topics = await Topic.find().sort({ order: 1 }).lean();

  const topicsWithProblems = await Promise.all(
    topics.map(async (topic) => {
      const problems = await Problem.find({ topicId: topic._id })
        .sort({ order: 1 })
        .lean();
      return { ...topic, problems };
    })
  );

  return topicsWithProblems;
};

module.exports = { getAllTopicsWithProblems };
