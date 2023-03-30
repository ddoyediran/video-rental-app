const Joi = require("joi");
const Genre = require("../models/genre");
const Movie = require("../models/movie");

// Adding Joi schema for validating request input
const schema = Joi.object({
  name: Joi.string().min(3).required(),
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

/// Creating the routes ///

// GET all movies genres in the genre list
const getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find({}).sort("name");
    res.status(200).json({ genres });
  } catch (err) {
    next(err);
  }
};

// GET a single genre from the genre list
const getSingleGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ message: "Genre not found!" });
    }

    res.status(200).json({ genre });
  } catch (err) {
    next(err);
  }
};

// POST: Add a genre to the genre list
const createGenre = async (req, res, next) => {
  try {
    const result = validate({ name: req.body.name });
    // if validation error
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    // check if genre already exist in the database
    const genreExist = await Genre.exists({ name: req.body.name });

    if (genreExist) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const genre = new Genre(result.value);

    const savedGenre = await genre.save();

    res.status(201).json({ genre: savedGenre });
  } catch (err) {
    next(err);
  }
};

// PUT: Update existing genre in the genre list
const updateGenre = async (req, res, next) => {
  try {
    // validate the name
    const result = validate({ name: req.body.name });

    // if error
    if (result.error) {
      // console.log(resultVal.error.details[0].message);
      return res.status(400).send(result.error.details[0].message);
    }

    const name = req.body.name;

    const genreUpdated = await Genre.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!genreUpdated) {
      return res.status(404).json({ message: "Genre not found!" });
    }

    res.status(201).json({ genre: genreUpdated });
  } catch (err) {
    next(err);
  }
};

// DELETE: Delete a genre from the genre list
const deleteSingleGenre = async (req, res, next) => {
  try {
    const deleteGenre = await Genre.findByIdAndRemove(req.params.id);

    if (!deleteGenre) {
      return res.status(404).json({ message: "Genre not found!" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Create a movie with a genre
const createMovie = async (req, res, next) => {
  // create a new movie based on request body
  const newMovie = new Movie(req.body);
  // extract genreId from route
  const { genreId } = req.params;
  // set the movie's genre via route parameters
  newMovie.genre = genreId;

  return newMovie
    .save()
    .then((movie) => {
      // update the genre's movie array
      return Genre.findByIdAndUpdate(
        genreId,
        // add a set of new movies to the list of Genre movies
        // $addToSet is used instead of $push so we can ignore duplicate
        { $addToSet: { movies: movie._id } }
      );
    })
    .then(() => {
      return res.status(201).json({ movie: newMovie });
    })
    .catch((err) => {
      next(err);
    });

  // save the new movie
  // const savedMovie = await newMovie.save();
};

// Get all movies for a genre
const getAllMoviesForAGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.genreId)
      .populate("movies")
      .exec();

    if (!genre) {
      return res.status(404).json({ message: "No genre found!" });
    }

    res.status(200).json({ genre });
  } catch (err) {
    next(err);
  }
};

// Get a single movie for a genre
const getAMovieForAGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.genreId)
      .populate("movies")
      .exec();

    if (!genre) {
      return res.status(404).json({ message: "Genre not found!" });
    }

    const movies = await Movie.findById(req.params.movieId).select(["-genre"]);

    res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteSingleGenre,
  createMovie,
  getAMovieForAGenre,
  getAllMoviesForAGenre,
};
