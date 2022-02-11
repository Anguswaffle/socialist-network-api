const connection = require('../config/connection');
const { Thought, User } = require('../models');
const casual = require('casual');

connection.on('error', (err) => err);

connection.once('open', async () => {
  connection.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  
})
