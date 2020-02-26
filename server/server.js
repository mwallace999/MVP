const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const port = 9002;
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
