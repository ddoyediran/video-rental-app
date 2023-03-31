const router = require("express").Router();
const {
  rentMovie,
  getRentedMovies,
  deleteRental,
  getSingleRentedMovie,
} = require("../controllers/rentals");

router.get("/", getRentedMovies); // Get all rented movies
router.get("/:id", getSingleRentedMovie); // Get one rented movie
router.post("/:customerId", rentMovie); // Rent a movie
router.delete("/:id", deleteRental); // Delete rented movie

module.exports = router;
