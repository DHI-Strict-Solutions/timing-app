const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../../controllers/authController');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['admin', 'manager', 'driver', 'pilot']),
  ],
  validate,
  authController.registerUser
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  validate,
  authController.loginUser
);

// @route    POST api/auth/forgotpassword
// @desc     Send reset password email
// @access   Public
router.post(
  '/forgotpassword',
  [check('email', 'Please include a valid email').isEmail()],
  validate,
  authController.forgotPassword
);

// @route    PUT api/auth/resetpassword/:resetToken
// @desc     Reset password
// @access   Public
router.put(
  '/resetpassword/:resetToken',
  [check('password', 'Password is required').not().isEmpty()],
  validate,
  authController.resetPassword
);

module.exports = router;
