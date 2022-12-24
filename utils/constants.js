const regexLink = /https?:\/\/(www\.)?[\w-.]+\.[a-z]{2,3}[\w-.~:/?#[\]@!$&'()*+,;=]*#?/;
const regexRuName = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
const regexEnName = /^[?!,.a-zA-Z0-9\s]+$/;

const DB_PATH = 'mongodb://localhost:27017/bitfilmsdb';

const OK = 200;
const BAD_REQUEST = 400;
const AUTH_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND = 404;
const SAME_EMAIL = 409;
const SERVER_ERROR = 500;

module.exports = {
  DB_PATH,
  OK,
  BAD_REQUEST,
  AUTH_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND,
  SAME_EMAIL,
  SERVER_ERROR,
  regexLink,
  regexRuName,
  regexEnName,
};
