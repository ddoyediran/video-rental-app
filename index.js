const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const genreRoutes = require("./controllers/genresRouter");
const config = require("./utils/config");

const port = process.env.PORT || 4500;

const app = express();

// connecting to mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error(err.message);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/genres", genreRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});
