const { SAME_EMAIL } = require('../utils/constants');

class SameEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SAME_EMAIL;
  }
}

module.exports = SameEmailError;
