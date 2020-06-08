function checkUserDepartment(dep) {
  return function (req, res, next) {
    // console.log("dep check" , dep)
    if (req.decodedJwt.department && req.decodedJwt.department === dep) {
      next();
    } else {
      res
        .status(403)
        .json({
          errorMessage: `Only related department can reach that section`,
        });
    }
  };
}

module.exports = checkUserDepartment;
