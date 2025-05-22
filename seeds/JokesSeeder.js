const Joke = require("../models/Joke.js");

const sampleJokes = [
  {
    question: "Quelle est la femelle du hamster ?",
    answer: "L'Amsterdam",
  },
  {
    question: "Que dit un oignon quand il se cogne ?",
    answer: "Aïe",
  },
  {
    question: "Quel est l'animal le plus heureux ?",
    answer: "Le hibou, parce que sa femme est chouette.",
  },
  {
    question: "Pourquoi le football c'est rigolo ?",
    answer: "Parce que Thierry en rit",
  },
  {
    question: "Quel est le sport le plus fruité ?",
    answer:
      "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
  },
  {
    question: "Que se fait un Schtroumpf quand il tombe ?",
    answer: "Un Bleu",
  },
  {
    question: "Quel est le comble pour un marin ?",
    answer: "Avoir le nez qui coule",
  },
  {
    question: "Qu'est ce que les enfants usent le plus à l'école ?",
    answer: "Le professeur",
  },
  {
    question: "Quel est le sport le plus silencieux ?",
    answer: "Le para-chuuuut",
  },
  {
    question: "Quel est le comble pour un joueur de bowling ?",
    answer: "C’est de perdre la boule",
  },
];

class JokesSeeder {
  static async seed() {
    try {
      // Check if jokes already exist
      const existingJokes = await Joke.findAll();

      if (existingJokes.length === 0) {
        await Joke.bulkCreate(sampleJokes);
        console.log("✅ Sample jokes seeded successfully!");
        console.log(`📊 Added ${sampleJokes.length} jokes to the database`);
      } else {
        console.log(
          `📊 Database already contains ${existingJokes.length} jokes - skipping seed`
        );
      }
    } catch (error) {
      console.error("❌ Error seeding jokes:", error);
    }
  }

  static async reset() {
    try {
      // Delete all existing jokes and add fresh sample data
      await Joke.destroy({ where: {} });
      await Joke.bulkCreate(sampleJokes);
      console.log("✅ Jokes reset with fresh sample data!");
    } catch (error) {
      console.error("❌ Error resetting jokes:", error);
    }
  }

  static getSampleData() {
    return sampleJokes;
  }
}

module.exports = JokesSeeder;
