const mongoose = require('mongoose');

const urlValidator = /(http:\/\/|https:\/\/)(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([A-Za-z0-9\-_]+\.)+[A-Za-z]{2,}))(:\d{2,5})?([A-Za-z0-9/-]+#?)?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return urlValidator.test(v);
      },
      message: (props) => `${props.value} - некорректная web-ссылка`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
