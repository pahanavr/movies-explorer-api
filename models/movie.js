const mongoose = require('mongoose');
const {
  regexLink,
  regexRuName,
  regexEnName,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => regexLink.test(image),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => regexLink.test(link),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => regexLink.test(thumbnail),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (name) => regexRuName.test(name),
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (name) => regexEnName.test(name),
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);