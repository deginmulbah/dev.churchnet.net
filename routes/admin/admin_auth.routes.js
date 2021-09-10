const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const admin_auth = require('../../controller/admin/admin_auth.controller');
const User = require('../../model/admin/adminUser.model');

router.get('/', admin_auth.getLogin);
router.get('/signup', admin_auth.getSignup);

router.post('/createuser',
  check('username')
    .isEmail()
    .normalizeEmail()
    .withMessage("usename must be a valid email address")
    .custom(async value => {
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject('username already in use');
      }
    }),
  body('password')
    .isLength({ min: 5 })
    .withMessage("password must be greater then 5 char")
    .trim(),
  body('confirmPass')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match.');
      }
      return true;
    }), admin_auth.signUp);

router.post('/login',
  // body('username')
  //   .trim()
  //   .isEmail()
  //   .withMessage('Please enter a valid email address.')
  //   .normalizeEmail()
  admin_auth.loginuser);

router.post('/logout', admin_auth.logout)

module.exports = router