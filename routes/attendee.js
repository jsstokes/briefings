var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const {ObjectID} = require('mongodb');
const mongoURL = "mongodb://localhost:27017/briefings";
const dbName = "briefings";
const client = new MongoClient(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true});

/* GET attendee listing. */
router.get('/:briefingId', function(req, res, next) {
  res.render('attendee', {briefing: {_id: req.params.briefingId}});
});

router.post('/new', function(req, res, next) {
  console.log("--- Adding new attendee ---");
  var attendee = {};
  attendee.firstName = req.body.firstName;
  attendee.lastName = req.body.lastName;
  attendee.position = req.body.position;
  attendee.phone = req.body.phone;
  attendee.email = req.body.email;
  console.log(JSON.stringify(attendee));
  addAttendee(attendee, req.body.briefingId, res);
  // res.send('adding attendee for briefing with ID of ' + req.body.briefingId + "<br>" + JSON.stringify(attendee));
});

async function addAttendee(attendee, briefingId, res) {
  try {
    console.log("Attempting to add an attendee for briefing: " + briefingId);
    await client.connect();
    const db = client.db(dbName);
    var criteria = { "_id": ObjectID(briefingId) };
    var updateDoc = {"$push" : {
        attendees: attendee
      }
    };
    console.log("Criteria: " + JSON.stringify(criteria));
    console.log("statement: " + JSON.stringify(updateDoc));
    id = await db.collection('briefings').findOneAndUpdate(criteria, updateDoc);
    client.close();
    res.redirect('/briefings');
  } catch(err) {
    console.log(err.stack);
  }
}

module.exports = router;
