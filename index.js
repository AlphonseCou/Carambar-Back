const express = require("express");
const app = express();
const PORT = 7000;
//const generateLandingPage = require("../Carambar Front/pages/index-get.js");

const sequelize = require("./models/database.js");
const Joke = require("./models/Joke.js");
const JokesSeeder = require("./seeds/JokesSeeder.js");
const JokesController = require("./controllers/JokeController.js");

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully");

    // Si aucune blague n'existe, on insert les blagues d'exemple
    await JokesSeeder.seed();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initializeDatabase();

app.use("/blague", JokesController.getAllJokes);
app.use("/blague/:id", JokesController.getJokeById);
app.use("/blague/random", JokesController.getRandomJoke);
app.use("/blague/create", JokesController.createJoke);

app.listen(PORT, () => {
  console.log("Serveur démarré");
});
