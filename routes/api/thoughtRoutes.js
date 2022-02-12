const router = require('express').Router();
const {
  getThoughts,
  thinkThought
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(thinkThought);

module.exports = router;