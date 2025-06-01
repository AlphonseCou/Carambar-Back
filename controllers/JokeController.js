const sequelize = require("../models/database.js");
const Joke = require("../models/Joke.js");

// Fonction pour une blague au hasard
function getRandomJoke(req, res) {
  Joke.findOne({
    order: sequelize.random(),
  })
    .then((joke) => {
      res.json(joke);
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}
// Fonction pour une blague via son id
function getJokeById(req, res) {
  const jokeId = req.params.id;

  Joke.findByPk(jokeId)
    .then((joke) => {
      if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
      }
      res.json(joke);
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}

// Fonction ajout d'une blague
function createJoke(req, res) {
  const { content, author } = req.body;

  Joke.create({ content, author })
    .then((joke) => {
      res.status(201).json(joke);
    })
    .catch((error) => {
      console.error("Error creating joke:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}

// Fonction pour avoir toutes blagues
function getAllJokes(req, res) {
  Joke.findAll()
    .then((jokes) => {
      res.json(jokes);
    })
    .catch((error) => {
      console.error("Error fetching jokes:", error);
      res.status(500).json({ error: "Internal server error" });
    });
}

module.exports = {
  getRandomJoke,
  getJokeById,
  createJoke,
  getAllJokes,
};
