// Data faker
const casual = require('casual');

// Empty arrays to be filled
const usernames = [];
const emails = [];
const thoughts = [];
const reactions = [];

// Fills arrays
for (let i = 0; i < 300; i++) {
  if (i < 25) {
    usernames.push(casual.username)
    emails.push(casual.email)
  }
  if (i < 100) thoughts.push(casual.sentences(n = 2))
  reactions.push(casual.short_description)
}

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Retrieves a  item from a given array
const getArrItem = (arr) => arr.pop();

// Values needed to build a user
const getUsername = () => `${getArrItem(usernames)}`
const getEmail = () => `${getArrItem(emails)}`

const getThought = () => `${getArrItem(thoughts)}`
const getReaction = () => `${getArrItem(reactions)}`

module.exports = { getRandomArrItem, getUsername, getEmail, getThought, getReaction };
