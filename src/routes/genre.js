const router = require("express").Router();
const {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  genreRoutes,
} = require("../controllers/genresRouter");

router.get("/", getAllGenres);

router.get("/:id", getSingleGenre);

router.post("/", createGenre);

router.put("/:id", updateGenre);

module.exports = router;
