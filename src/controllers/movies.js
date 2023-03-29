const Movie = require("../models/movie");
const Joi = require("joi");

// Adding Joi schema for validating request input
const schema = Joi.object({
  title: Joi.string().min(3).required(),
  phone: Joi.number().min(9).required(),
  isGold: Joi.boolean().required(),
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

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().sort("title");

    if (!movies) {
      return res.status(404).json({ message: "No movie found!" });
    }

    res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
};
