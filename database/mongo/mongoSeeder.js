/* mongoSeeder.js */
// Run by typing command: node database/mongo/mongoSeeder.js from project folder
const { MongoClient } = require('mongodb');

// Database & Connection Parameters
const url = 'mongodb://localhost:27017';
const dbName = 'voteData'; //*** Change to Database name

// Create data instances
const seed = (collect, client, voteName, quantity, choiceArr, maxChoice, callback) => {
  let votes = [];
  for (let i = 0; i < quantity; i++) {
    const oneVote = [];
    const choiceQuantity = Math.ceil(Math.random() * maxChoice);
    while (oneVote.length < choiceQuantity) {
      const choice = Math.ceil(Math.random() * choiceArr.length);
      if (!oneVote.includes(choice)) oneVote.push(choice);
    }
    const newVote = {
      voteName,
      voteOptions: choiceArr,
      vote: oneVote,
    };
    votes.push(newVote);
  }

  client.db(dbName).collection(collect).insertMany(votes)
    .then(votes = [])
    .then(() => {
      console.log('Database seeded!');
      client.close();
      callback();
    })
    .catch(console.log);
};

// Delete database and/or run seed
const mongoSeeder = (collection, overwrite, voteName, quantity, choiceArr, maxChoice, callback) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      return;
    }
    if (overwrite) {
      client.db(dbName).collection(collection).drop((error, del) => {
        if (error) throw error;
        if (del) console.log('Collection deleted');
        seed(collection, client, voteName, quantity, choiceArr, maxChoice, callback);
      });
    } else {
      seed(collection, client, voteName, quantity, choiceArr, maxChoice, callback);
    }
  });
};

exports.mongoSeeder = mongoSeeder;
