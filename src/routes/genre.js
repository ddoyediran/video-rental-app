const router = require("express").Router();
const { getAllGenres, genreRoutes } = require("../controllers/genresRouter");

router.get("/", getAllGenres);

module.exports = router;
