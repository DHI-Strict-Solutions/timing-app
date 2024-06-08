const express = require('express');
const { check, validationResult } = require('express-validator');
const availabilityController = require('../../controllers/availabilityController');
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

// @route    POST api/availability
// @desc     Create availability
// @access   Private
router.post(
  '/',
  [
    check('date', 'Date is required').not().isEmpty(),
    check('available', 'Availability status is required').isBoolean(),
  ],
  validate,
  auth,
  availabilityController.createAvailability
);

// @route    GET api/availability
// @desc     Get availability
// @access   Private
router.get('/', auth, availabilityController.getAvailability);

module.exports = router;
