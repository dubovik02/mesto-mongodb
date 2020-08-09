const Cards = require('../models/card');
// Список карточек
module.exports.readCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при получении списка карточек' });
    });
};
// Создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при добавлении карточки' });
    });
};
// Удаление карточки
module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка c ID ${req.params.id} не существует` });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при удалении карточки' });
    });
};
// Like
module.exports.like = (req, res) => {
  // eslint-disable-next-line max-len
  Cards.findByIdAndUpdate({ _id: req.params.cardId }, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).send({ message: 'Like++', count: result.likes.length });
      } else {
        res.status(404).send({ message: `Карточка с ID ${req.params.cardId} не найдена.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера в процессе Like-процедуры' });
    });
};
// Dislike
module.exports.dislike = (req, res) => {
  // eslint-disable-next-line max-len
  Cards.findByIdAndUpdate({ _id: req.params.cardId }, { $pull: { likes: req.user._id } }, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).send({ message: 'Like--', count: result.likes.length });
      } else {
        res.status(404).send({ message: `Карточка с ID ${req.params.cardId} не найдена.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера в процессе Dislike' });
    });
};
