require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize MongoDB Connection
const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1/cache_db';
mongoose.connect(mongoDBUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error',
  console.error.bind(console, 'MongoDB connection error:')
);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ message: 'Not found.' });
});

module.exports = app;
