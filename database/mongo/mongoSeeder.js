/* mongoSeeder.js */
// Run by typing command: node database/mongo/mongoSeeder.js from project folder

const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database & Collection Names & Parameters
const dbName = 'voteData'; //*** Change to Database name
const collectionName = 'votes'; //*** Change to Collection name
const quantity = 100; //*** Total number of data instances to add to db
const dataBlockSize = 10; //*** Size of each Array that is pushed to db

const pizzaArr = ['onions', 'peppers', 'mushrooms', 'olives', 'pepperoni', 'pineapple', 'sausage'];

const choiceArr = pizzaArr;
let counter = 1;
const maxChoice = 4;
const voteName = 'Pizza Toppings';


// Create data instances
const seed = (collect, client) => {
  let votes = [];
  for (let i = counter; i < counter + dataBlockSize; i++) {
    const oneVote = [];
    const choiceQuantity = Math.ceil(Math.random() * maxChoice);
    while (oneVote.length < choiceQuantity) {
      const choice = Math.ceil(Math.random() * choiceArr.length);
      if (!oneVote.includes(choice)) oneVote.push(choice);
    }
    const newVote = {
      voteName,
      voteOptions: pizzaArr,
      vote: oneVote,
    };
    votes.push(newVote);
  }

  client.db(dbName).collection(collect).insertMany(votes)
    .then(votes = [])
    .then(console.log(`Partial seed completed ${Math.ceil(counter / dataBlockSize)} of ${Math.floor(quantity / dataBlockSize)}`))
    .then(() => {
      if (counter + dataBlockSize <= quantity) {
        counter += dataBlockSize;
        seed(collect, client);
      } else {
        console.log('Database seeded!');
        client.close();
      }
    })
    .catch(console.log);
};

// Delete database and/or run seed
const mongoSeeder = (collection, overwrite) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      return;
    }
    if (overwrite) {
      client.db(dbName).collection(collection).drop((error, del) => {
        if (error) throw error;
        if (del) console.log('Collection deleted');
        seed(collection, client);
      });
    } else {
      seed(collection, client);
    }
  });
};

mongoSeeder(collectionName, false);
