const express = require("express");
const app = express();

const connectDB = require("./config/db");
const { static } = require("express");

connectDB();

app.get("/", (req, res) => res.send("API running"));

app.use(express.json({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/book", require("./routes/api/book"));
app.use("/api/collections", require("./routes/api/collections"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/bookmark", require("./routes/api/bookmark"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
