const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res, next) => {
  res.send('<h1>API is up!</h1>');
});

module.exports = server;
