const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  mobile: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "book",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
