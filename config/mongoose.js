const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/eCell");
const atlasConnectionString = "mongodb+srv://satyamvirat:4IUKA5MtN31PsMY6@cluster0.ln9gz3n.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(atlasConnectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('MongoDb connected');
});

module.exports = db;

