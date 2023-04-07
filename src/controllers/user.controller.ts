import userService from "services/user.service.js";
import { Request, Response, NextFunction } from "express";
import { NewLogin, NewUser, checkId } from "protocols/user.protocol";


async function createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body as NewUser;
    try {
        await userService.create({ name, email, password });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.read();

        return res.send({ users })
    } catch (err) {
        next(err);
    }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as NewLogin;
    try {
        const token = await userService.update({ email, password });

        return res.send({ token })
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body as checkId;
    try {
        await userService.deleteUser(id)
        return res.sendStatus(204)
    } catch (err) {
        next(err);
    }
}

export default {
    createUser,
    getUsers,
    loginUser,
    deleteUser
}