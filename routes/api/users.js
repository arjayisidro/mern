const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users route
// @access Private
router.get('/test', (req, res) => res.json({ msg: 'User Works' }));

// @route GET api/users/register
// @desc Register user
// @access Pubic
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist.';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
              let transporter = nodemailer.createTransport({
                service: 'Gmail',
                secure: false,
                // port: 25,
                auth: {
                  user: 'tmcca.noreply@gmail.com',
                  pass: 'tmcaP@ss123'
                },
                tls: {
                  rejectUnauthorized: false
                }
              });

              // send mail with defined transport object
              transporter.sendMail({
                from:
                  '"Trece Martirez City College 👻" <tmcca.noreply@gmail.com>', // sender address
                to: req.body.email,
                subject: 'Welcome to Trece Martirez City College!',
                text: `Welcome, ${req.body.name}!`,
                html:
                  'This is your e-mail confirmation that you have been registered to Trece martirez city college!'
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/register
// @desc Login User / Returning JWT Token
// @access Pubic
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by e-mail
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found.';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User match

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload

        // Sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password Incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
