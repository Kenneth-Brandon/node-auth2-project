function checkUserDepartment(dept) {
  return function (req, res, next) {
    if (req.decodedJwt.department && req.decodedJwt.department === dept) {
      next();
    } else {
      res
        .status(403)
        .json({
          errorMessage: 'only related department can reach this section',
        });
    }
  };
}

module.exports = checkUserDepartment;
