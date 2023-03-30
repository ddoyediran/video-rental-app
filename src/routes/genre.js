const router = require("express").Router();
const {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteSingleGenre,
  createMovie,
  getAMovieForAGenre,
  getAllMoviesForAGenre,
} = require("../controllers/genres");

router.get("/", getAllGenres); // get all genres
router.get("/:id", getSingleGenre); // get single genre
router.post("/", createGenre); // create new genre
router.put("/:id", updateGenre); // update genre
router.delete("/:id", deleteSingleGenre); // delete single genre
router.post("/:genreId/movies", createMovie); // create a movie
router.get("/:genreId/movies/:movieId", getAMovieForAGenre); // Display a single movie for an genre
router.get("/:genreId/movies", getAllMoviesForAGenre); // Display all movies for an genre

module.exports = router;
