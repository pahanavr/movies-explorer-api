const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  errors,
} = require('celebrate');

const {
  PORT = 3000,
  NODE_ENV,
  PRODUCTION_DB_PATH,
} = process.env;
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const { DB_PATH } = require('./utils/constants');
const { handleError } = require('./middlewares/handleError');
const NotFoundError = require('./errors/notFoundErrors');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const app = express();

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect(NODE_ENV === 'production' ? PRODUCTION_DB_PATH : DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
