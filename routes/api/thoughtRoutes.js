const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  thinkThought
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(thinkThought);

router.route('/:thoughtId').get(getSingleThought)

module.exports = router;