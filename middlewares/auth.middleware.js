const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401)
      .redirect('/sessions/create');
  }
}

module.exports.checkRole = (role) => {
  // should check if current user's role is the received one. Call next if OK, throw error if not!

  // delete this!
  return (req, res, next) => next();
}
