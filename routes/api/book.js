const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const multer = require("multer");

const auth = require("../../middleware/auth");
const Book = require("../../models/Book");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { filesize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.post(
  "/addBook",
  upload.single("bookImage"),
  [
    auth,
    [
      // check("bookImage", "Please upload a book image").not().isImage(),
      check("title", "Enter a title").not().isEmpty(),
      check("author", "Enter an author").not().isEmpty(),
      check("brief", "Enter a brief on the book").isLength({ max: 100 }),
      check("price", "Enter a book price").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    console.log(req.file);

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // Create Book
      const newCollection = new Book({
        user: req.user.id,
        bookImage: req.file.path,
        bookFilename: req.file.filename,
        title: req.body.title,
        author: req.body.author,
        brief: req.body.brief,
        price: req.body.price,
      });

      const collection = await newCollection.save();

      res.json({
        filename: collection.bookFilename,
        image: collection.bookImage,
        title: collection.title,
        author: collection.author,
        url: "http://localhost:5000/api/book/" + book._id,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!!!");
    }
  }
);

// @route   GET api/book
// @Desc    Get all books
// @access  Public
router.get("/", async (req, res) => {
  try {
    const books = await Collection.find()
      .select("bookImage author brief price title date")
      .sort({ date: -1 });

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/book/:id
// @Desc    Get book by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const book = await Collection.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(500).send("Server error!!!");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const collectionItem = await Collection.findOneAndRemove({
      _id: req.params.id,
    });

    if (!collectionItem) {
      return res.status(404).json({ msg: "Book not found in collections" });
    }

    res.status(200).json({ msg: "Book removed from collections" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found in collections" });
    }

    res.status(500).send("Server error");
  }
});

module.exports = router;
