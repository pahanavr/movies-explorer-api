const usersRouter = require('express').Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const {
  updateUserValidation,
} = require('../validation/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;
