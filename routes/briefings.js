var express = require('express');
var router = express.Router();

var briefings = [
  {
      title: "Briefing 1",
      customer: "Customer 1",
      date: new Date(),
      rep: "123"
  },
  {
      title: "Briefing 2",
      customer: "Customer 2",
      date: new Date(),
      rep: "123"
  }

];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('briefings', {briefings: briefings});
});

module.exports = router;
