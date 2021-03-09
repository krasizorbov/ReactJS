const mongoose = require('mongoose');

const ArtistProfileSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'artist',
  },
  bandName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  genreTags: {
    type: [String],
  },
  paypalEmail: {
    type: String,
    required: true,
  },
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  tracks: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
        default: 0.99,
      },
      about: {
        type: String,
      },
      art: {
        type: String,
      },
      audio: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('artistProfile', ArtistProfileSchema);
