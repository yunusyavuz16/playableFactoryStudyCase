const mongoose = require("mongoose");
const config = require("./config");

mongoose.set("strictQuery", false);
mongoose.connect(
  config.connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: config.dbName
  },
  (err) => {
    if (err) {
      console.log("Error connecting to MongoDB: ", err);
    } else {
      console.log("Connected to MongoDB successfully!");
    }
  }
);
