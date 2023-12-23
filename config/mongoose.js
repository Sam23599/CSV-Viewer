const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/eCell");
const atlasConnectionString = "mongodb+srv://satyamvirat:jIgWDruT8WhmPT88@cluster0.7alzrxi.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(atlasConnectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('MongoDb connected');
});

module.exports = db;