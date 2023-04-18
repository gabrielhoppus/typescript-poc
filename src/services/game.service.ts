import errors from "@/errors/index.js";
import { request } from '@/utils/request.js';
import { gameRepository } from "@/repositories/game.repository.js";
import { GameEntity, ApiEntity } from "@/protocols/game.protocols.js";


async function getAllGames(){
    const games = await gameRepository.findAllGames();
    if (!games) throw errors.notFoundError();
    return games;
}

async function getGameById(id: number) {
    const result = await request.get(`${process.env.GAME_URL}/games/${id}?key=${process.env.GAME_KEY}`);
    if (!result.data) {
        throw errors.notFoundError();
    }
    const { name, released } = result.data as ApiEntity;

    const game: GameEntity = {
        id: id,
        title: name,
        released: released,
    };
    return game;
}

async function addGame(id: number) {
    try {
        const { title, released } = await getGameById(id) as GameEntity;
        
        await gameRepository.addGame(id, title, released)


    } catch {
        throw errors.invalidDataError(['Id inválido']);
    }

}

export default {
    addGame,
    getAllGames
}