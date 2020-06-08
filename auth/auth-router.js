const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secret = require('../config/secret.js');
const UserDB = require('../Routes/user/user-model.js');
const { isValid } = require('../Routes/user/user-service.js');

router.post('/register', (req, res) => {
  const userInfo = req.body;

  if (isValid(userInfo)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(userInfo.password, rounds);
    userInfo.password = hash;
    UserDB.addUser(userInfo)
      .then((u) => {
        res.status(400).json(u);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'Server Error Try Again Later', error: err });
      });
  } else {
    res.status(404).json({
      message: 'please provide username and password ',
    });
  }
});

router.post('/login', (req, res) => {
  const userInfo = req.body;

  if (isValid(userInfo)) {
    UserDB.findUserByName({ username: userInfo.username })
      .then(([u]) => {
        if (userInfo && bcryptjs.compareSync(userInfo.password, u.password)) {
          const token = generateToken(userInfo);
          res.status(400).json({ message: 'Login Successful', token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'Server Error Try Again Later', error: err });
      });
  } else {
    res.status(404).json({
      message: 'please provide username and password ',
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  const options = {
    expiresIn: '2h',
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
