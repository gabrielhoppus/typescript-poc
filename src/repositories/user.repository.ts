import { NewUser, UserEntity, NewLogin, CheckEmail, checkId } from "protocols/user.protocol.js";
import { db } from "../config/database.connection.js";
import { QueryResult } from "pg";


async function findByEmail(email : string) : Promise<QueryResult<CheckEmail>>{
    return await db.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
    )
}

async function createUser({ name, email, password } : NewUser) : Promise<QueryResult<NewUser>> {
    return await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
        [name, email, password]
    );
}

async function findUsers() : Promise<QueryResult<UserEntity>>{
    return await db.query(`SELECT id, name FROM users;`)
}

async function loginUser(token: string, id: number): Promise<QueryResult<NewLogin>>{
    return await db.query(`UPDATE users SET token=$1 WHERE id=$2;`,
    [token, id]);
}

async function findById(id: string) : Promise<QueryResult<checkId>>{
    return await db.query(
        `SELECT * FROM users WHERE id=$1`,
        [id]
    )
}

async function deleteUser(id: string){
    return await db.query(`DELETE FROM users WHERE id=$1`,
    [id]);
}

export const userRepository = {
    findByEmail,
    createUser,
    findUsers,
    loginUser,
    deleteUser,
    findById,
}