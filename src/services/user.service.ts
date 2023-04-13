import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "../errors/index.js";
import { userRepository } from "../repositories/user.repository.js"
import { NewUser, NewLogin } from "protocols/user.protocol.js";
import 'dotenv/config';

async function create({ name, email, password }: NewUser) {
    const checkEmail = await userRepository.findByEmail(email);
    if (checkEmail) throw errors.duplicatedEmailError(email);

    const hashPassword: string = await bcrypt.hash(password, 10)
    await userRepository.createUser({ name, email, password: hashPassword })
}

async function read() {
    const users = await userRepository.findUsers();
    if (!users) throw errors.notFoundError();
    return users;
}

async function update({ email, password }: NewLogin) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    if (!user.token) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        await userRepository.loginUser(token, user.id);
        return token;
    }
}

async function deleteUser(id: string){
    const userId = parseInt(id)
    const user = await userRepository.findById(userId);
    if (!user) throw errors.notFoundError();

    await userRepository.deleteUser(userId);
}

export default {
    create,
    read,
    update,
    deleteUser
}