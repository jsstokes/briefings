var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoURL = "mongodb://localhost:27017/briefings";
const dbName = "briefings";
const client = new MongoClient(mongoURL,{useNewUrlParser: true, useUnifiedTopology: true});
const {ObjectID} = require('mongodb');


/* GET users listing. */
router.get('/', function(req, res, next) {
  retrieveAndRenderBriefings(res);
  // res.render('briefings', {briefings: briefings});
});

router.get('/new', function(req, res, next) {
  res.render('newBriefing', {});
});

router.get('/details/:briefingId', function (req,res, next){
  console.log(`Getting Briefing details for ${req.params.briefingId}`);
  getBriefingDetails(req.params.briefingId, res);
});

router.post('/new', function(req, res, next) {
  var briefing = {};
  briefing.title = req.body.title;
  briefing.customer = req.body.customer;
  briefing.description = req.body.description;
  briefing.date = new Date(req.body.date);
  briefing.rep = "test rep";
  briefing.attendees = [];
  addAndRetrieveBriefings(briefing,res);
});

async function getBriefingDetails(briefingId, res) {
  try {
    console.log("Attempting to retrieve briefing: " + briefingId);
    await client.connect();
    const db = client.db(dbName);
    var briefing = await db.collection('briefings').findOne(new ObjectID(briefingId));
    console.log(`retrieved briefing`);
    console.log(briefing);
    client.close();
    res.render("briefingDetails", {"briefing": briefing});
  } catch(err) {
    console.log(err.stack);
  }
}

async function addAndRetrieveBriefings(newBriefing, res) {
  try {
    console.log("Attempting to insert");
    await client.connect();
    const db = client.db(dbName);
    id = await db.collection('briefings').insertOne(newBriefing);
    var allBriefings = await db.collection("briefings").find().sort({date: 1}).toArray();
    console.log(`attempting to return ${allBriefings.length} briefings`);
    console.log(allBriefings);
    client.close();
    res.redirect('/briefings');
  } catch(err) {
    console.log(err.stack);
  }
}

async function retrieveAndRenderBriefings(res) {
  try {
    console.log("Attempting to insert");
    await client.connect();
    const db = client.db(dbName);
    var allBriefings = await db.collection("briefings").aggregate([
      { "$project": {
          title:1,
          customer: 1,
          date: 1,
          attendeeCount: {$size: "$attendees"}
      }},
      { "$sort": {date: 1}}
    ]).toArray();
    // console.log(`attempting to return ${allBriefings.length} briefings`);
    // console.log(allBriefings);
    client.close();
    // res.render('briefings', {briefings: allBriefings});
    res.render('briefings', {briefings: allBriefings});
  } catch(err) {
    console.log(err.stack);
  }
}



module.exports = router;
