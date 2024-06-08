const Schedule = require('../models/Schedule');
const Availability = require('../models/Availability');

// @route    GET api/reports/schedules
// @desc     Get schedules report
// @access   Private
exports.getSchedulesReport = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route    GET api/reports/availability
// @desc     Get availability report
// @access   Private
exports.getAvailabilityReport = async (req, res) => {
  try {
    const availability = await Availability.find();
    res.json(availability);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
