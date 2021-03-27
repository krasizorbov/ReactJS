const mongoose = require('mongoose');

const FanProfileSchema = new mongoose.Schema({
  fan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fan',
  },
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  art: {
    type: String,
  },
  artPublicId: {
    type: String,
  },
  about: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('fanProfile', FanProfileSchema);
