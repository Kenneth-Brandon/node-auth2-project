const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secret = require('../config/secret.js');
const userDB = require('../routes/user/user-model.js');
const { isValid } = require('../routes/user/user-service.js');

router.post('/register', (req, res, next) => {
  const userInfo = req.body;

  if (isValid(userInfo)) {
    userDB
      .addUser(userInfo)
      .then((u) => {
        res.status(400).json(u);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'server error try again later', error: err });
      });
  } else {
    res.status(404).json({ message: 'please provide username and password' });
  }
});

router.post('/login', (req, res, next) => {
  const userInfo = req.body;

  if (isValid(userInfo)) {
    userDB
      .findUserByName({ username: userInfo.username })
      .then((u) => {
        res.status(400).json(u);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'server error try again later', error: err });
      });
  } else {
    res.status(404).json({ message: 'please provide username and password' });
  }
});

module.exports = router;
