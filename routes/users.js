const router = require('express').Router();
const {
  createUser, readUsers, findUserById, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', readUsers);
router.get('/:id', findUserById);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
