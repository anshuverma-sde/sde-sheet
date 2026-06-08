const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Tough'],
      required: true,
    },
    youtubeLink: {
      type: String,
      default: '',
    },
    practiceLink: {
      type: String,
      default: '',
    },
    articleLink: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);
