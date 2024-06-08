const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['admin', 'manager', 'driver', 'pilot']),
  ],
  validate,
  userController.createUser
);

// @route    GET api/users
// @desc     Get all users
// @access   Private/Admin
router.get('/', auth, role('admin'), userController.getUsers);

module.exports = router;
