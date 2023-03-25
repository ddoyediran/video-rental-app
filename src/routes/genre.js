const router = require("express").Router();
const {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteSingleGenre,
} = require("../controllers/genresRouter");

router.get("/", getAllGenres);
router.get("/:id", getSingleGenre);
router.post("/", createGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteSingleGenre);

module.exports = router;
