const routes = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  signUpValidation,
  signInValidation,
} = require('../validation/users');

routes.post('/signup', signUpValidation, createUser);
routes.post('/signin', signInValidation, login);

routes.use('/users', auth, usersRoutes);
routes.use('/movies', auth, moviesRoutes);

module.exports = routes;
