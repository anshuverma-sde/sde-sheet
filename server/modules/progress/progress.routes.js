const router = require('express').Router();
const { getProgress, markProblemDone, unmarkProblem } = require('./progress.controller');
const { protect } = require('../../middleware/auth.middleware');

router.get('/',                protect, getProgress);
router.post('/',               protect, markProblemDone);
router.delete('/:problemId',   protect, unmarkProblem);

module.exports = router;
