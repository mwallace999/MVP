const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const port = 9001;
const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Insert routes here
app.get('/getCoin', (req, res) => {
  const { endDate } = req.query;
  const { startDate } = req.query;
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    //.then((data) => { console.log(data.data.bpi); })
    .then((data) => { res.send(data.data.bpi); })
    .catch((err) => { console.log(err); });
});

//MONGO -----------------------------------------------------------------------------------------------

const dbRoute = 'mongodb://localhost:27017/';
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const Data = require('../database/mongo/data.js');

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/getImages', (req, res) => {
  console.log('Server getting from Mongo db');
  Data.find({ _id: req.query.productId }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    console.log(data[0]);
    return res.json({ success: true, data: data[0] }); //data[0].data
  });
});

// app.get('/getProducts/:productId', (req, res) => {
//   const productId = req.params.productId;
//   db.getProducts(productId, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.end();
//     } else {
//       res.send(results);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Port ${port} is alive!!!`);
});
