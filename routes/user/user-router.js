const router = require('express').Router();
const userDB = require('./user-model');
const checkJWT = require('../../auth/restricted-middleware.js');
const checkDept = require('../../auth/check-department.js');

router.get('/', checkJWT, (req, res, next) => {
  const dept = req.decodeJwt.department;

  if (checkDept(dept) && dept === 'admin') {
    userDB
      .findAllUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: 'server error', err });
      });
  } else {
    userDB
      .filterByDepartment(dept)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: 'server error', err });
      });
  }
});

module.exports = router;
