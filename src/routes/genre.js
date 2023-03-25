const router = require("express").Router();
const {
  getAllGenres,
  getSingleGenre,
  createGenre,
  genreRoutes,
} = require("../controllers/genresRouter");

router.get("/", getAllGenres);

router.get("/:id", getSingleGenre);

router.post("/", createGenre);

module.exports = router;
