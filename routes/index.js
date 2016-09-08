var express = require('express');
var router = express.Router();
var googleAuth = require('./auth/google');

/* GET home page. */
router.get('/google/oauth', function(req, res, next) {
  res.redirect(googleAuth.googleUrl());
});

router.get('/google/callback', function(req, res, next) {
  googleAuth.googleTokens(req.query.code);
});

module.exports = router;
