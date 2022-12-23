const jwt = require('jsonwebtoken');
const BadAuth = require('../errors/badAuthError');

module.exports = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  // const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new BadAuth('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key')
    console.log(payload)
  } catch (err) {
    return next(new BadAuth('Необходима авторизация'));
  }
  req.user = payload;

  next();
  return false;
};