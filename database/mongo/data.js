const mongoose = require('mongoose');
const { Schema } = mongoose;

// PizzaToppings data structure
const DataSchema = new Schema(
  {
    voteName: String,
    voteOptions: [String],
    vote: [Number],
  },
  { collection: 'votes' },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema);
