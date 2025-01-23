const express = require('express');
const passport = require('passport');
const router = express.Router();
const { User } = require('../models');
const { forwardAuthenticated } = require('../middleware/auth');

// Login page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { title: 'Login' });
});

// Register page
router.get('/register', forwardAuthenticated, (req, res) => {
  res.render('register', { title: 'Register' });
});

// Register handle
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;
    const errors = [];

    // Validation
    if (!username || !email || !password || !password2) {
      errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
      return res.render('register', {
        errors,
        username,
        email,
        title: 'Register'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (existingUser) {
      errors.push({ msg: 'Email is already registered' });
      return res.render('register', {
        errors,
        username,
        email,
        title: 'Register'
      });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password
    });

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');

  } catch (err) {
    console.error('Registration error:', err);
    return res.render('register', {
      errors: [{ msg: 'An error occurred during registration: ' + err.message }],
      username: req.body.username,
      email: req.body.email,
      title: 'Register'
    });
  }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// Logout handle
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;

