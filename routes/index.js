var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Inside the get / function...");
  if (! req.session.user) {
    console.log("no user found");
  } else {
    console.log("Found user in session");
    res.send(`Found user in session: ${req.session.user}`);
    return;
  }
  res.render('index', { title: 'Express' });
});

router.get('/clear', function(req, res, next) {
  // clear the session value
  delete req.session.user;
  res.render('index', { title: 'Express - deleted the session' });
});

router.post('/', function(req, res, next) {
  req.session.user = req.body.userID;
  res.send(`User name is ${req.session.userID}`);
  return;
});

module.exports = router;
