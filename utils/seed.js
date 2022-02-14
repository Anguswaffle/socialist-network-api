const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomArrItem,
  getUsername,
  getEmail,
  getThought,
  getReaction } = require('./data')

// Establishing connection to database
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create an empty array to hold users
  const users = [];

  // Create an empty array to hold thoughts
  const thoughts = [];

  // Create an empty array to hold reactions

  // Setting up users
  while (users.length < 25) {
    const username = getUsername();
    const email = getEmail();
    users.push({
      username,
      email
    })
  }

  // Add users to the collection
  await User.collection.insertMany(users)

  // Setting up thoughts
  while (thoughts.length < 100) {
    const username = getRandomArrItem(users).username;
    const thoughtText = getThought();
    thoughts.push({
      thoughtText,
      username
    })
  }

  // Add thoughts to the collection
  await Thought.collection.insertMany(thoughts)

  // Update users with thoughts and friends
  for (let i = 0; i < 100; i++) {
    const thought = thoughts[i];
    await User.collection.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought._id, 
        friends: getRandomArrItem(users)._id } },
    )
  }

  for(let i = 0 ; i < 300 ; i++) {
    const reactionBody = getReaction();
    const username = getRandomArrItem(users).username;
    const reaction = { reactionBody, username }
    const thoughtId = getRandomArrItem(thoughts)._id;
    await Thought.collection.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: reaction } },
    )
  }


  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
})