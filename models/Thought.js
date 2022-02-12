const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema( 
  {
    thoughtText: {
      type: String,
      required: true,
      // Sets length to 1-280 characters
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => date.toLocaleString('en-US'),
    },
    username: {
      type: String,
      required: true,
    },
    // Reaction sub-document
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    versionKey: false,
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;