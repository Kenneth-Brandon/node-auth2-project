const jwt = require('jsonwebtoken');

const secrets = require('../config/secret.js');

function checkJWT(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ errorMessage: 'provided token could not find' });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ errorMessage: "token doesn't exist" });
  }
}

module.exports = checkJWT;
