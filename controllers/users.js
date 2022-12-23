const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SameEmailError = require('../errors/sameEmailError');
const BadRequestError = require('../errors/badRequestError');
const User = require('../models/user');
const {
  OK,
} = require('../utils/constants');
const NotFoundError = require('../errors/notFoundErrors');
const BadAuth = require('../errors/badAuthError');

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findOne({
    email,
  }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new BadAuth('Неправильные данные'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new BadAuth('Неправильные данные'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secret-key',
        {
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({
        token,
      });
    })
    .catch(() => next(new BadAuth('Неправильные данные')));
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(OK).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные введены некорректно'));
      } else if (err.code === 11000) {
        next(new SameEmailError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const {
    email,
    name,
  } = req.body;

  User.findByIdAndUpdate(userId, {
    email,
    name,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные введены некорректно'));
        return;
      }
      next(err);
    });
};
