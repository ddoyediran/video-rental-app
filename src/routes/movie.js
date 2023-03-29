const router = require("express").Router();
const { createMovie } = require("../controllers/genres");
const { getMovies } = require("../controllers/movies");

router.get("/", getMovies);

module.exports = router;
