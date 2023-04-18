import { Router } from "express";
import { addGame, getGames } from "@/controllers/game.controller.js";
import { validateSchema } from "@/middlewares/validateSchema.middleware.js";
import { gameSchema } from "@/schemas/game.schema.js";

const gameRoutes = Router();

gameRoutes
    .post('/add', validateSchema(gameSchema), addGame)
    .get('/', getGames)

export default gameRoutes;