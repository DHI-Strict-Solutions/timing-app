const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const config = require('config');

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Authenticate User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Email' });
    }

    const resetToken = jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.get('EMAIL_USERNAME'),
        pass: config.get('EMAIL_PASSWORD')
      }
    });

    const mailOptions = {
      from: config.get('EMAIL_FROM'),
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n http://localhost:5000/api/auth/resetpassword/${resetToken}`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send('Error sending email');
      } else {
        res.status(200).json({ msg: 'Email sent' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const resetToken = req.params.resetToken;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(resetToken, config.get('jwtSecret'));

    let user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
ц