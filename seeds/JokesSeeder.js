import jokesData from "../data/jokes.js";
import Joke from "../models/Joke.js";

class JokesSeeder {
  static async seed() {
    try {
      // Check if jokes already exist
      const existingJokes = await Joke.findAll();

      if (existingJokes.length === 0) {
        await Joke.bulkCreate(jokesData);
        console.log("✅ Sample jokes seeded successfully!");
        console.log(`📊 Added ${jokesData.length} jokes to the database`);
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

export default JokesSeeder;
