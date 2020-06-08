const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/auth-router.js');
const UserRouter = require('../Routes/user/user-router.js');
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/department', UserRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.send('<h1>API IS UP<h1>');
});

module.exports = server;
