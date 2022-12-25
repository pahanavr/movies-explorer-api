const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  regexLink,
  regexRuName,
  regexEnName,
} = require('../utils/constants');

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regexLink).required(),
    trailerLink: Joi.string().pattern(regexLink).required(),
    thumbnail: Joi.string().pattern(regexLink).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().pattern(regexRuName).required(),
    nameEN: Joi.string().pattern(regexEnName).required(),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
