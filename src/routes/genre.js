const router = require("express").Router();
const {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteSingleGenre,
  createMovie,
} = require("../controllers/genres");

router.get("/", getAllGenres); // get all genres
router.get("/:id", getSingleGenre); // get single genre
router.post("/", createGenre); // create new genre
router.put("/:id", updateGenre); // update genre
router.delete("/:id", deleteSingleGenre); // delete single genre
router.post("/:genreId/movies", createMovie);

module.exports = router;
