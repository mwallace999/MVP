const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const seeder = require('./../database/mongo/mongoSeeder');

const port = 9001;
const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbRoute = 'mongodb://localhost:27017/voteData';
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const Data = require('../database/mongo/data.js');

db.once('open', () => console.log('Connected to Mongo db'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/getVote', (req, res) => {
  console.log('Server getting vote results from Mongo db');
  Data.find({ voteName: req.query.voteName }, (err, data) => {
    console.log('This is' + data);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

app.get('/seedVote', (req, res) => {
  console.log('Server seeding Mongo db');
  seeder.mongoSeeder('votes', false, req.query.voteName, req.query.quantity, req.query.choiceArr, req.query.maxChoice, () => { res.send('Yup'); });
});

app.listen(port, () => {
  console.log(`Port ${port} is alive!!!`);
});

app.get('/getCategories', (req, res) => {
  console.log('Server getting categories from Mongo db');
  Data.distinct('voteName', (err, data) => {
    console.log(data);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
