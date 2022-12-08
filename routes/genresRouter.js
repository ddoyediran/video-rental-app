const express = require("express");
const Joi = require("joi");

// Adding Joi schema for validating request input
const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

const genreRoutes = express.Router();

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
genreRoutes.get("/api/genres", (req, res) => {
  if (genreList.length === 0) {
    return res.status(200).json({ message: "Genres list is empty" });
  }

  return res.status(200).json({ list: genreList });
});

// GET a single genre from the genre list
genreRoutes.get("/api/genres/:id", (req, res) => {
  const genre = genreList.find((genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (!genre) {
    return res.status(404).json({ message: "Genre not in the Genre List" });
  }

  return res.status(200).json({ genre });
});

// POST: Add a genre to the genre list
genreRoutes.post("/api/genres/", (req, res) => {
  const result = validate({ name: req.body.name });

  //   result.then(function (result) {
  //     console.log(result); // "Some User token"

  //     const newGenre = { id: genreList.length + 1, ...result };

  //     genreList.push(newGenre);

  //     return res.status(200).json({ message: "A new genre has been added" });
  //   });

  // console.log(result);
  // if error
  if (result.error) {
    // console.log(resultVal.error.details[0].message);
    return res.status(400).send(result.error.details[0].message);
  }

  // no error, then add to the genre array
  if (result.value) {
    const newGenre = { id: genreList.length + 1, ...result.value };

    genreList.push(newGenre);

    return res.status(200).json({ message: "A new genre has been added" });
  }
});

// PUT: Update existing genre in the genre list
genreRoutes.put("/api/genres/:id", (req, res) => {
  let genreFound = genreList.find((genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (genreFound) {
    const result = validate({ name: req.body.name });

    // if error
    if (result.error) {
      // console.log(resultVal.error.details[0].message);
      return res.status(400).send(result.error.details[0].message);
    }

    if (result.value) {
      let updated = {
        id: genreFound.id,
        name: req.body.name,
      };

      const targetIndex = genreList.indexOf(genreFound);

      genreList.splice(targetIndex, 1, updated);

      return res.status(200).json({ message: updated });
    }

    // let updated = {
    //   id: genreFound.id,
    //   name: req.body.name,
    // };

    // const targetIndex = genreList.indexOf(genreFound);

    // genreList.splice(targetIndex, 1, updated);

    // return res.status(200).json({ message: updated });
  }

  return res.status(404).json({ message: "Genre not found" });
});

// DELETE: Delete a genre from the genre list
genreRoutes.delete("/api/genres/:id", (req, res) => {
  const genreIndex = genreList.findIndex((genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (genreIndex < 0) {
    return res.status(404).json({ message: "Can't find genre in the list" });
  }

  genreList.splice(genreIndex, 1); // delete the genre

  return res.status(200).json({ message: "Genre successfully deleted!" });
});

// Helper Function
// INPUT: an object paramter that contain property to validate
// OUTPUT: return outcome of the validation
// async function validate(inputObj) {
//   try {
//     const value = await schema.validateAsync(inputObj);
//     return value;
//   } catch (err) {
//     console.error(err);
//   }
// }

/**
 *
 * @param {params} inputObj
 * @returns {object}
 */
function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

module.exports = genreRoutes;
