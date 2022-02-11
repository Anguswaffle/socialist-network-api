const casual = require('casual');

const usernames = [];
const emails = [];
const thoughts = [];

for (let i = 0; i < 100; i++) {
  if (i < 25) {
    usernames.push(casual.username);
    emails.push(casual.email);
  }
  thoughts.push(casual.sentence);
}

