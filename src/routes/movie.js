const router = require("express").Router();
// const { createMovie } = require("../controllers/genres");
const { getMovies, getMovie, updateMovie } = require("../controllers/movies");

router.get("/", getMovies); // Get all movies
router.get("/:id", getMovie); // Get a movie by id
router.put("/:id", updateMovie); // Update a movie by id

module.exports = router;
