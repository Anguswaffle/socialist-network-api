const { Thought, User } = require('../models');

// Total count of thoughts
const thoughtCount = async () =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughtCount: await thoughtCount(),
          thoughts
        };
        return res.json(thoughtObj);
      })
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(thought))
      .catch((err) => res.status.json(err))
  },
  thinkThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // Searches for user and adds thought to thoughts array
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought thunk, but found no user with that username' })
          : res.json('Created the thought 🧠'))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  reactToThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      {new: true})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
  }
}