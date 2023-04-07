import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "../errors/index.js";
import { userRepository } from "../repositories/user.repository.js"
import { NewUser, NewLogin } from "protocols/user.protocol.js";
import 'dotenv/config';

async function create({ name, email, password }: NewUser) {
    const { rowCount } = await userRepository.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const hashPassword: string = await bcrypt.hash(password, 10)
    await userRepository.createUser({ name, email, password: hashPassword })
}

async function read() {
    const { rows, rowCount } = await userRepository.findUsers();
    if (!rowCount) throw errors.notFoundError();
    return rows;
}

async function update({ email, password }: NewLogin) {
    const {
        rowCount,
        rows: [user],
    } = await userRepository.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    if (!user.token) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        await userRepository.loginUser(token, user.id);
        return token;
    }
}

async function deleteUser(id: number){
    const { rowCount } = await userRepository.findById(id);
    if (!rowCount) throw errors.notFoundError();

    await userRepository.deleteUser(id);
}

export default {
    create,
    read,
    update,
    deleteUser
}