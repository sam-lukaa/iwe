const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
