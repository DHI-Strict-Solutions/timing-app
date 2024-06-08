const Schedule = require('../models/Schedule');

// @route    POST api/schedules
// @desc     Create schedule
// @access   Private
exports.createSchedule = async (req, res) => {
  const { startTime, endTime, task } = req.body;

  try {
    const newSchedule = new Schedule({
      user: req.user.id,
      startTime,
      endTime,
      task
    });

    const schedule = await newSchedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route    GET api/schedules
// @desc     Get schedules
// @access   Private
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.user.id });
    res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
