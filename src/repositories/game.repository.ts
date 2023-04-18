import prisma from "@/config/database.connection";
import { GameEntity } from "@/protocols/game.protocols.js";


async function findGame(id: number) {
    return await prisma.games.findFirst({
        where: { id }
    })
}

async function findAllGames(){
    return await prisma.games.findMany();
}


async function addGame(id: number, title: string, released: string) {
    return await prisma.games.upsert({
        where: { id },
        update: {},
        create: {
            id,
            title,
            release_date: released,
        }
    })
}

export const gameRepository = {
    addGame,
    findGame,
    findAllGames
}