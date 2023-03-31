const Rental = require("../models/rental");
const Movie = require("../models/movie");
const Customer = require("../models/customer");

const rentMovie = async (req, res, next) => {
  try {
    const customerId = await Customer.findById(req.params.customerId); // to know customer renting a movie

    if (!customerId || !req.params.customerId) {
      res.status(404).json({ message: "Customer not found!" });
    }

    // check if the movie exist in the Movie collection
    const movie = await Movie.findOne({ title: req.body.title });
    // if movie not found
    if (!movie) {
      res.status(404).json({ message: "Movie not found!" });
    }

    // then rent out the movie and store the details in rental collection
    const rentedMovie = await Rental.create({
      dateReturned: req.body.dateReturned,
      rentalFee: req.body.rentalFee,
    });

    const rented = await Rental.findByIdAndUpdate(
      rentedMovie._id,
      {
        $addToSet: { movies: movie._id, customer: customerId },
      },
      { new: true }
    );

    // update number in stock
    movie.numberInStock = movie.numberInStock - 1;

    await movie.save();

    res.status(201).json({ rented: rented });
  } catch (err) {
    next(err);
  }
};

// Get all rented movies
const getRentedMovies = async (req, res, next) => {
  try {
    const rentedMovies = await Rental.find().sort("dateOut");
    if (!rentedMovies) {
      return res.status(404).json({ message: "No Movies rented!" });
    }
    res.status(200).json({ rentedMovies });
  } catch (err) {
    next(err);
  }
};

// Get one rented movie
const getSingleRentedMovie = async (req, res, next) => {
  try {
    const rentedMovie = await Rental.findById(req.params.id);

    if (!rentedMovie) {
      return res.status(404).json({ message: "No movie rented!" });
    }

    res.status(200).json({ rentedMovie });
  } catch (err) {
    next(err);
  }
};

// Delete a rental
const deleteRental = async (req, res, next) => {
  try {
    const deletedRental = await Rental.findByIdAndRemove(req.params.id);

    if (!deletedRental) {
      return res.status(404).json({ message: "Rental details not found!" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  rentMovie,
  getRentedMovies,
  deleteRental,
  getSingleRentedMovie,
};
