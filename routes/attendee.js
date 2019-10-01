var express = require('express');
var router = express.Router();

/* GET attendee listing. */
router.get('/:briefingId', function(req, res, next) {
  res.send('attendee for briefing with ID of ' + req.params.briefingId);
});

module.exports = router;
