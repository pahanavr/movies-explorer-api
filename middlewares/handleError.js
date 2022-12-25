const { SERVER_ERROR } = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
  const {
    statusCode = SERVER_ERROR, message,
  } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR ? 'Ошибка на сервере' : message,
    });
  next(err);
};
