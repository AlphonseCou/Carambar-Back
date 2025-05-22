const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database.js");

class Joke extends Model {}

Joke.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Joke",
  }
);

module.exports = Joke;
