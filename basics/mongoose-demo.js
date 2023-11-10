// Import the mongoose module
const mongoose = require("mongoose");
const BreakFastSchema = require('./breakfastSchema.js');

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/my_db";

mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
  insert().catch((err) => {console.log('Failed : ' + err);})
});

process.on('SIGINT', () => {
  if(db) {
    db.close()
      .then((result) => console.log('DB connection closed'))
      .catch((err) => console.log(err));
  }
  console.log('process terminated');
})

async function insert() {
    let brkfstSchema = BreakFastSchema({eggs: 7, drink: 'Tea'})
    await brkfstSchema.save();
    console.log('Created Entry : ' + {eggs: 7, drink: 'Tea'});
}

async function insertMany(entries) {
  try {
    const result = await BreakfastModel.insertMany(entries);
    console.log(`${result.length} entries successfully inserted.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}