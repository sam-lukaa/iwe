const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "book",
    required: true,
    unique: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Bookmark = mongoose.model("bookmark", BookmarkSchema);
