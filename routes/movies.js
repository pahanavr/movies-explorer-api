const router = require('express').Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  regexLink,
  regexRuName,
  regexEnName,
} = require('../utils/constants');

router.get('/', getMovies);

router.post('/', celebrate({
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
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
