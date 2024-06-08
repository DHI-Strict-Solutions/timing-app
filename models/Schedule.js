const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  task: {
    type: String,
    required: true
  }
});

ScheduleSchema.index({ user: 1, startTime: 1 });

module.exports = mongoose.model('schedule', ScheduleSchema);
