const express = require('express');
const { check, validationResult } = require('express-validator');
const scheduleController = require('../../controllers/scheduleController');
const auth = require('../../middleware/auth');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route    POST api/schedules
// @desc     Create schedule
// @access   Private
router.post(
  '/',
  [
    check('startTime', 'Start time is required').not().isEmpty(),
    check('endTime', 'End time is required').not().isEmpty(),
    check('task', 'Task is required').not().isEmpty(),
  ],
  validate,
  auth,
  scheduleController.createSchedule
);

// @route    GET api/schedules
// @desc     Get schedules
// @access   Private
router.get('/', auth, scheduleController.getSchedules);

module.exports = router;
