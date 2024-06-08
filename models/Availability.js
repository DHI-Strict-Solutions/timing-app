const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    required: true
  },
  available: {
    type: Boolean,
    default: false
  }
});

AvailabilitySchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('availability', AvailabilitySchema);
