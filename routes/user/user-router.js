const router = require('express').Router();
const UserDB = require('./user-model.js');
const checkJWT = require('../../auth/restricted-midd.js');
const checkDpt = require('../../auth/check-department.js');

router.get('/', checkJWT, (req, res) => {
  const dep = req.decodedJwt.department;
  console.log('department ', dep);
  if (checkDpt(dep) && dep === 'admin') {
    UserDB.findAllUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: 'server Error', err });
      });
  } else {
    UserDB.filterByDepartment(dep)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: 'server Error', err });
      });
  }
});

module.exports = router;
