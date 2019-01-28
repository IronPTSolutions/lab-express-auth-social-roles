const passport = require('passport');
const User = require("../models/user.model.js")

module.exports.create = (req, res, next) => {
  res.render("sessions/create");
}

module.exports.doCreate = (req, res, next) => {

  function renderWithErrors(errors) {
    res.status(400).render('sessions/create', {
      user: req.body,
      errors: errors
    });
  }

  const email =req.body.email;
  const password = req.body.password; 
  if ((!email) || (!password)) {
    res.render("sessions/create", {
      user: req.body,
      errors: {
        email: (email) ? undefined : "Email is required",
        password: (password) ? undefined : "Password is required"
    }})
  } else {
    passport.authenticate("local-auth", (error, user, validation) => {
      if (error) {
        next(error);
      } else if (!user) {
        console.log(validation);
        renderWithErrors(validation);
      } else {
        req.login(user, (error) => {
          if (error) {
            next(error)
          } else {
            res.redirect(`/users`)
          }
        });
      }
    })(req, res, next);
  } 
}

module.exports.delete = (req, res, next) => {
  req.logout();
  res.redirect("/sessions/create");
}

module.exports.createWithIDPCallback = (req, res, next) => {
  /* res.send(`
    TODO: callback for social login. use the right strategy (check req.params)
  `); */
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect(`/users`)
        }
      });
    }
  })(req, res, next);
}
