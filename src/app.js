const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db/connect");
//const genreRoutes = require("./controllers/genresRouter");
const config = require("./utils/config");
const genreRoutes = require("./routes/genre");
const customerRoutes = require("./routes/customer");
const movieRoutes = require("./routes/movie");
const rentalRoutes = require("./routes/rental");

const app = express();

// connecting to mongoose
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(config.MONGODB_URI)
//   .then((result) => {
//     console.log("Connected to database!");
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/rentals", rentalRoutes);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    // connect to Mongodb
    const connected = await connectDB(config.MONGODB_URI);
    if (connected) {
      console.log("Connected to database!");
    }

    // start the server
    app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start();
