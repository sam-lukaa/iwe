const express = require("express");
const router = express.Router();
const multer = require("multer");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Collection = require("../../models/Collections");

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

// router.post(
//   "/addBook",
//   upload.single("bookImage"),
//   [
//     auth,
//     [
//       // check("bookImage", "Please upload a book image").not().isImage(),
//       check("title", "Enter a title").not().isEmpty(),
//       check("author", "Enter an author").not().isEmpty(),
//       check("brief", "Enter a brief on the book").isLength({ max: 100 }),
//       check("price", "Enter a book price").not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     console.log(req.file);

//     const errors = validationResult(req);

//     if (!errors.isEmpty())
//       return res.status(400).json({ errors: errors.array() });

//     try {
//       // Create Book
//       const newCollection = new Collection({
//         user: req.user.id,
//         bookImage: req.file.path,
//         bookFilename: req.file.filename,
//         title: req.body.title,
//         author: req.body.author,
//         brief: req.body.brief,
//         price: req.body.price,
//       });

//       const collection = await newCollection.save();

//       res.json({
//         filename: collection.bookFilename,
//         image: collection.bookImage,
//         title: collection.title,
//         author: collection.author,
//         url: "http://localhost:500/api/book/" + book._id,
//       });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error!!!");
//     }
//   }
// );

// @route   PUT api/collection/editBook/:id
// @Desc    Edit book
// @access  Private
router.put(
  "/editBook/:id",
  upload.single("bookImage"),
  auth,
  async (req, res) => {
    try {
      let collectionItem = await Collection.findOne({ _id: req.params.id });

      if (!collectionItem)
        return res.status(404).json({ msg: "Book not found in collection" });

      const newCollectionItem = new Collection({
        _id: req.params.id,
        bookName: req.file.filename,
        bookImage: req.file.path,
        title: req.body.title,
        author: req.body.author,
        brief: req.body.brief,
        price: req.body.price,
      });

      collectionItem = await Collection.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newCollectionItem },
        { new: true }
      );

      res.status(200).json({
        bookName: collection.bookName,
        image: collectionItem.bookImage,
        title: collectionItem.title,
        url: "http://localhost:5000/api/collections/" + collectionItem._id,
      });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "Book not found" });
    }
  }
);

// @route   GET api/collections
// @Desc    Get current user books
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user.id }).sort({
      date: -1,
    });

    if (!collections) {
      res.status(404).json({ msg: "Books not found" });
    }

    res.json(collections);
    /* */
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Books not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   GET api/collection/:id
// @Desc    Get collection by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const collectionId = await Collection.findById(req.params.id);

    if (!collectionId) return res.status(404).json({ msg: "Book not found" });

    res.status(200).json({
      id: collectionId._id,
      image: collectionId.bookImage,
      title: collectionId.title,
      author: collectionId.author,
      brief: collectionId.brief,
      price: collectionId.price,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Book not found" });
  }
});

// @route   DELETE api/collections
// @Desc    Delete current user books
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Collection.deleteMany({ user: req.user.id });
    const collectionExist = await Book.find();

    if (collectionExist) {
      return res.status(404).json({ msg: "Books not found" });
    }

    res.json({ msg: "All book collections deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Books not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/collection/:id
// @Desc    Delete book from collection by id
// @access  Private
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const collectionItem = await Book.findOneAndRemove({ _id: req.params.id });

//     if (!collectionItem) {
//       return res.status(404).json({ msg: "Book not found in collections" });
//     }

//     res.status(200).json({ msg: "Book removed from collections" }, collectionItem);
//   } catch (err) {
//     console.error(err.message);

//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Book not found in collections" });
//     }

//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
