const { AUTH_ERROR } = require('../utils/constants');

class BadAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
}

module.exports = BadAuth;
