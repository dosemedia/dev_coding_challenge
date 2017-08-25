/* eslint-disable max-params*/
/* eslint-disable no-console*/
'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'home.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.status) {
    return res
    .status(err.status)
    .send(err.errors[0].messages[0]);
  }

  if (err.output && err.output.statusCode) {
    return res
    .status(err.output.statusCode)
    .set('Content-Type', 'text/plain')
    .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

module.exports = app;
