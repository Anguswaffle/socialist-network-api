const router = require('express').Router();
const {
  // Thought controllers
  getThoughts,
  getSingleThought,
  thinkThought,
  reactToThought,
  deleteReaction
} = require('../../controllers/thoughtController');

// Routes for thoughts
router.route('/').get(getThoughts).post(thinkThought);
router.route('/:thoughtId').get(getSingleThought)
router.route('/:thoughtId/reactions').post(reactToThought)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;