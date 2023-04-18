import userService from "services/user.service.js";
import { Request, Response, NextFunction } from "express";
import { NewLogin, NewUser, checkId } from "protocols/user.protocol";


export async function createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body as NewUser;
    try {
        await userService.createUser({ name, email, password });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.findUsers();

        return res.send(users)
    } catch (err) {
        next(err);
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as NewLogin;
    try {
        const token = await userService.loginUser({ email, password });

        return res.send({ token })
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as checkId;
    try {
        await userService.deleteUser(id)
        return res.sendStatus(204)
    } catch (err) {
        next(err);
    }
}