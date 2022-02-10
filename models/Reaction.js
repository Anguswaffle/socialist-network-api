const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => date.toLocaleString('en-US'),
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Only the schema is required for Thought sub-document
module.exports = reactionSchema;