const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.Register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{ failureFlash: true, failureRedirect: '/login'}),users.login)

router.route('/logout')
    .get(users.logout)

module.exports = router;