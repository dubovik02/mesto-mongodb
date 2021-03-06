/* eslint-disable max-len */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(avatar) {
        return validator.isURL(avatar);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
