const { Schema, model } = require('mongoose');

const userSchema = new Schema( 
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z]{2,6})$/
    },
    thoughts: [
      {
        type: Schema.types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model('user', userSchema)

module.exports = User;