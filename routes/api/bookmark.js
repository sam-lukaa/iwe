const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Bookmark = require("../../models/Bookmarks");
const Book = require("../../models/Book");
const User = require("../../models/User");

//  @route    GET api/bookmarks
//  @desc     Add bookmark
//  @access   Private
router.post("/", auth, async (req, res) => {
  try {
    let newBookmark = await Book.findById(req.body.book);

    let existingBook = await Bookmark.findOne({ book: req.body.book });

    if (!newBookmark) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (existingBook) {
      return res.status(400).json({ msg: "Book exists already" });
    }

    newBookmark = new Bookmark({
      book: req.body.book,
    });

    const bookmark = await newBookmark.save();

    res.json({
      message: "Bookmark added",
      createdBookmark: {
        _id: bookmark._id,
        book: bookmark.book,
      },
      request: {
        type: "GET",
        url: "http://localhost:5000/api/bookmark" + bookmark._id,
      },
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
});

//  @route    GET api/bookmarks
//  @desc     Get bookmarks
//  @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find()
      .select("book _id")
      .sort({ date: -1 })
      .populate("book", "user bookImage title author brief");

    if (!bookmarks) {
      res.status(404).json({ msg: "No Bookmarks" });
    }

    res.json({
      count: bookmarks.length,
      bookmarks: bookmarks.map((bookmark) => {
        return {
          _id: bookmark.id,
          book: bookmark.book,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/bookmark" + bookmark._id,
          },
        };
      }),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//  @route    GET api/bookmarks/:id
//  @desc     Get bookmarks by id
//  @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const book = await Bookmark.findById(req.params.id)
      .select("book")
      .populate(" book");

    if (!book) {
      res.status(404).json({ msg: "Book not found" });
    }

    res.json({
      bookmark: book,
      request: {
        type: "GET",
        url: "http://localhost:5000/api/bookmark",
      },
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
});

//  @route    DELETE api/bookmarks/:id
//  @desc     Delete bookmarks by id
//  @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const bookId = await Bookmark.findById(req.params.id);

    if (!bookId) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await bookId.remove();

    res.status(200).json({ msg: "Book deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
});

//  @route    DELETE api/bookmarks
//  @desc     Delete bookmarks
//  @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    await Bookmark.deleteMany();

    res.status(200).json({ msg: "Bookmarks deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
