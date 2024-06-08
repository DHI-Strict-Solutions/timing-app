const Availability = require('../models/Availability');

// @route    POST api/availability
// @desc     Create availability
// @access   Private
exports.createAvailability = async (req, res) => {
  const { date, available } = req.body;

  try {
    const newAvailability = new Availability({
      user: req.user.id,
      date,
      available
    });

    const availability = await newAvailability.save();
    res.json(availability);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route    GET api/availability
// @desc     Get availability
// @access   Private
exports.getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({ user: req.user.id });
    res.json(availability);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
