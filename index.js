import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import sequelize from "./models/database.js";
import JokesSeeder from "./seeds/JokesSeeder.js";
import JokesController from "./controllers/JokeController.js";

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jokes API",
      version: "1.0.0",
      description: "API pour gérer les blagues Carambar",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de la blague
 *         question:
 *           type: string
 *           description: La question de la blague
 *         answer:
 *           type: string
 *           description: La réponse de la blague
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 *       example:
 *         id: 1
 *         question: "Quelle est la femelle du hamster ?"
 *         answer: "L'Amsterdam"
 *         createdAt: "2025-05-22T20:11:06.488Z"
 *         updatedAt: "2025-05-22T20:11:06.488Z"
 */

/**
 * @swagger
 * /blagues:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */
app.use("/blagues", JokesController.getAllJokes);

/**
 * @swagger
 * /blague/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 */
app.use("/blague/random", JokesController.getRandomJoke);

/**
 * @swagger
 * /blague/create:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 description: La question de la blague
 *               answer:
 *                 type: string
 *                 description: La réponse de la blague
 *             example:
 *               question: "Pourquoi les plongeurs plongent-ils toujours en arrière ?"
 *               answer: "Parce que sinon, ils tombent dans le bateau !"
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Données invalides
 */
app.use("/blague/create", JokesController.createJoke);

/**
 * @swagger
 * /blague/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: La blague demandée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 */
app.use("/blague/:id", JokesController.getJokeById);

app.listen(PORT, () => {
  console.log("Serveur démarré");
  console.log(
    `Swagger documentation disponible sur: http://localhost:${PORT}/api-docs`
  );
});
