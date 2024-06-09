const express = require('express');
const { check, validationResult } = require('express-validator');
const availabilityController = require('../../controllers/availabilityController');
const auth = require('../../middleware/auth');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// @route    POST api/availability
// @desc     Create availability
// @access   Private
router.post(
  '/',
  limiter,
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
router.get('/', limiter, auth, availabilityController.getAvailability);

module.exports = router;
