const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../routes/user/user-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/department', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res, next) => {
  res.send('<h1>API is up!</h1>');
});

module.exports = server;
