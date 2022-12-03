const express = require("express");

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
    return res.status(200).json({ message: "Genre not in the Genre List" });
  }

  return res.status(200).json({ genre });
});

// POST: Add a genre to the genre list
genreRoutes.post("/api/genres/", (req, res) => {
  const newGenre = { id: genreList.length + 1, ...req.body };

  genreList.push(newGenre);

  res.status(200).json({ message: "A new genre has been added" });
});

// PUT: Update existing genre in the genre list

// DELETE: Delete a genre from the genre list
genreRoutes.delete("/api/genres/:id", (req, res) => {
  const genreIndex = genreList.findIndex((genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (genreIndex < 0) {
    return res.status(200).json({ message: "Can't find genre in the list" });
  }

  genreList.splice(genreIndex, 1); // delete the genre

  return res.status(200).json({ message: "Genre successfully deleted!" });
});

module.exports = genreRoutes;
