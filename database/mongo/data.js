const mongoose = require('mongoose');

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    _id: Number,
    productName: String,
    image: String,
  },
  { collection: 'productData' },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema);
