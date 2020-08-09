/* eslint-disable max-len */
const mongoose = require('mongoose');

const urlValidator = /(http:\/\/|https:\/\/)(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([A-Za-z0-9\-_]+\.)+[A-Za-z]{2,}))(:\d{2,5})?([A-Za-z0-9/-]+#?)?/;

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
      validator(v) {
        return urlValidator.test(v);
      },
      message: (props) => `${props.value} - некорректная web-ссылка`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
