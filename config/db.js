const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get("mongoURI");

require("dotenv").config({});

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Database connection successful...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); //freaky comment
  }
};

module.exports = connectDB;
