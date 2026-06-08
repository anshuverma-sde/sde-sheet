const router = require('express').Router();
const { getAll } = require('./topic.controller');
const { protect } = require('../../middleware/auth.middleware');

router.get('/', protect, getAll);

module.exports = router;
