const router = require('express').Router();
const userDB = require('./user-model');
const checkJWT = require('../../auth/restricted-middleware.js');

router.get('/', checkJWT, (req, res, next) => {
  userDB
    .findAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'server error', err });
    });
});

module.exports = router;
