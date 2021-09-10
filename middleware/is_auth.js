module.exports = (req, res, next) => {
  if (req.session.is_loggedIn) {
      next()
  } else {
      res.redirect('/')
  }
}