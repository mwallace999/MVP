const mongoose = require('mongoose');

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    voteName: String,
    voteOptions: [String],
    vote: [Number],
  },
  { collection: 'pizzaToppings' },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema);
