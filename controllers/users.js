const User = require('../models/user');
// Создание
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при добавлении пользователя' });
    });
};
// Поиск по ИД
module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь c ID ${req.params.id} не существует` });
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при получении пользователя по ID.' });
    });
};
// Список
module.exports.readUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при получении списка пользователей' });
    });
};
// Обновление данных пользователя
module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.updateOne({ _id: req.user._id }, { name, about })
    .then((result) => {
      if (result.n) {
        res.status(200).send({ message: `Данные пользователя c ID ${req.user._id} обновлены.` });
      } else {
        res.status(404).send({ message: `Пользователь c ID ${req.user._id} не найден.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при обновлении данных пользователя' });
    });
};
// Обновление аватара
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const validationProp = { runValidators: true };
  User.updateOne({ _id: req.user._id }, { avatar }, validationProp)
    .then((result) => {
      if (result.n) {
        res.status(200).send({ message: `Аватар пользователя c ID ${req.user._id} обновлен.` });
      } else {
        res.status(404).send({ message: `Пользователь c ID ${req.user._id} не найден.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера при обновлении данных аватара пользователя' });
    });
};
