const Movie = require("../models/movie");
const Joi = require("joi");

// Adding Joi schema for validating request input
const schema = Joi.object({
  title: Joi.string().required(),
  numberInStock: Joi.number().required(),
  dailyRentalRate: Joi.number().required(),
});

/**
 * Helper method to validate client input
 * @param {params} inputObj
 * @returns {object}
 */
function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

// Get All Movies
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).sort("title");

    if (!movies) {
      return res.status(404).json({ message: "Movies not found!" });
    }

    res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
};

// Get single movie
const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found!" });
    }

    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};

// update a movie
const updateMovie = async (req, res, next) => {
  try {
    const validated = validate({
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    if (validated.error) {
      return res.status(400).send(validated.error.details[0].message);
    }

    const update = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { ...update },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found!" });
    }

    res.status(201).json({ movie: updatedMovie });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  getMovie,
  updateMovie,
};
