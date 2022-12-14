const express = require("express");
require("dotenv").config();

const genreRoutes = require("./routes/genresRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4500;
app.use(genreRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
