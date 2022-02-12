const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  thinkThought,
  reactToThought
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(thinkThought);

router.route('/:thoughtId').get(getSingleThought)

router.route('/:thoughtId/reactions').post(reactToThought)

module.exports = router;