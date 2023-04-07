import { Router } from "express";
import userController from "../controllers/user.controller.js"

const userRoutes = Router();

userRoutes.post('/signup', userController.createUser);
userRoutes.put('/signin', userController.loginUser);
userRoutes.get('/', userController.getUsers);
userRoutes.delete('/delete', userController.deleteUser);

export default userRoutes;