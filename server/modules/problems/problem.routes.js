const router = require('express').Router();
const { getByTopicId } = require('./problem.controller');
const { protect } = require('../../middleware/auth.middleware');

router.get('/', protect, getByTopicId);

module.exports = router;
