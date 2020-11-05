const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");
const Book = require("../../models/Book");
const auth = require("../../middleware/auth");

//  @route    POST api/cart
//  @desc     Add order
//  @access   Private
router.post("/", auth, async (req, res) => {
  try {
    let cartBooks = await Book.findById(req.body.book);

    if (!cartBooks) {
      return res.status(404).json({ msg: "Book not found" });
    }

    cartBooks = new Cart({
      book: req.body.book,
    });

    const cart = await cartBooks.save();

    res.status(200).json({ msg: "Book added to cart" });
  } catch (err) {
    console.error(error.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    GET api/cart
//  @desc     Add cart
//  @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("book", "author title price brief bookImage")
      .sort({ date: -1 });

    if (!cartItems) {
      res.status(404).json({ msg: "Cart is empty" });
    }

    res.status(200).json({
      count: cartItems.length,
      cartItems: cartItems.map((cartItem) => {
        return {
          _id: cartItem.id,
          book: cartItem.book,
        };
      }),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    DELETE api/cart
//  @desc     Remove cart
//  @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    const cartItems = await Cart.deleteMany();

    if (!cartItems) res.status(404).json({ msg: "No cart item to remove" });

    res.status(200).json({ msg: "Cart items removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//  @route    DELETE api/cart/:id
//  @desc     Remove cart item
//  @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) return res.status(404).json({ msg: "Item not found in cart" });

    await cartItem.remove();

    res.status(200).json({ msg: "Item removed from cart" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      res.status(404).json({ msg: "Item not found in cart" });
    
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
