const express = require('express');
const reportController = require('../../controllers/reportController');
const auth = require('../../middleware/auth');
const router = express.Router();

// @route    GET api/reports/schedules
// @desc     Get schedules report
// @access   Private
router.get('/schedules', auth, async (req, res, next) => {
  try {
    await reportController.getSchedulesReport(req, res);
  } catch (error) {
    next(error);
  }
});

// @route    GET api/reports/availability
// @desc     Get availability report
// @access   Private
router.get('/availability', auth, async (req, res, next) => {
  try {
    await reportController.getAvailabilityReport(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
