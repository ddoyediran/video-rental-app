const express = require("express");
const Joi = require("joi");
const Genre = require("../models/genre");

const genreRoutes = express.Router();

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

// store genre type
const genreList = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Crime and mystery" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "History" },
  { id: 7, name: "Science fiction" },
];

/// Creating the routes ///

// GET all movies genres in the genre list
genreRoutes.get("/", async (req, res) => {
  // if (genreList.length === 0) {
  //   return res.status(200).json({ message: "Genres list is empty" });
  // }

  // res.status(200).json({ list: genreList });

  try {
    const allGenres = await Genre.find({});
    res.status(200).json({ allGenres });
  } catch (err) {
    console.error(err);
  }
});

// GET a single genre from the genre list
genreRoutes.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ message: "Genre not found!" });
    }

    res.status(200).json({ genre });
  } catch (err) {
    console.error(err);
  }

  // const genre = genreList.find((genre) => {
  //   return genre.id === parseInt(req.params.id);
  // });

  // if (!genre) {
  //   return res.status(404).json({ message: "Genre not in the Genre List" });
  // }

  // res.status(200).json({ genre });
});

// POST: Add a genre to the genre list
genreRoutes.post("/", async (req, res) => {
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

    res.status(201).json(savedGenre);
  } catch (err) {
    console.error(err);
  }

  // const result = validate({ name: req.body.name });
  // // if error
  // if (result.error) {
  //   // console.log(resultVal.error.details[0].message);
  //   return res.status(400).send(result.error.details[0].message);
  // }

  // // no error, then add to the genre array
  // const newGenre = { id: genreList.length + 1, ...result.value };

  // genreList.push(newGenre);

  // res.status(201).json({ message: "A new genre has been added" });
});

// PUT: Update existing genre in the genre list
genreRoutes.put("/:id", async (req, res) => {
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

    res.status(201).json({ genreUpdated });
  } catch (err) {
    console.error(err);
  }

  // let genreFound = genreList.find((genre) => {
  //   return genre.id === parseInt(req.params.id);
  // });

  // // if genre not in the genreList
  // if (!genreFound) {
  //   return res.status(404).json({ message: "Genre not found" });
  // }

  // const result = validate({ name: req.body.name });

  // // if error
  // if (result.error) {
  //   // console.log(resultVal.error.details[0].message);
  //   return res.status(400).send(result.error.details[0].message);
  // }

  // let updated = {
  //   id: genreFound.id,
  //   name: req.body.name,
  // };

  // const targetIndex = genreList.indexOf(genreFound);

  // genreList.splice(targetIndex, 1, updated);

  // res.status(200).json({ message: updated });
});

// DELETE: Delete a genre from the genre list
genreRoutes.delete("/:id", async (req, res) => {
  try {
    const deleteGenre = await Genre.findByIdAndRemove(req.params.id);

    res.status(204).end();
  } catch (err) {
    console.error(err);
  }

  // const genreIndex = genreList.findIndex((genre) => {
  //   return genre.id === parseInt(req.params.id);
  // });

  // // if the genre doesn't exist inside the genreList then we don't want to go ahead with performing the delete operation
  // if (genreIndex < 0) {
  //   return res.status(404).json({ message: "Can't find genre in the list" });
  // }

  // genreList.splice(genreIndex, 1); // delete the genre

  // res.status(200).json({ message: "Genre successfully deleted!" });
});

module.exports = genreRoutes;
