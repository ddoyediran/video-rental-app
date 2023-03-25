const router = require("express").Router();
const {
  getAllGenres,
  getSingleGenre,
  genreRoutes,
} = require("../controllers/genresRouter");

router.get("/", getAllGenres);

router.get("/:id", getSingleGenre);

module.exports = router;
