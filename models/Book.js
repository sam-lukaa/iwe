const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  bookImage: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

module.exports = Book = mongoose.model("book", BookSchema);
