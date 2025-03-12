const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const UserAuthRepository = require("../repositories/userAuth-repository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require("../config");

const userAuthRepository = new UserAuthRepository()

async function signup(data) {
    const { email, password, usertype, phone } = data;
    const existingUser = await userAuthRepository.findByEmail(email);
    if (existingUser) {
        throw new AppError("User already exist", StatusCodes.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userAuthRepository.create({
        email,
        password: hashedPassword,
        salt,
        usertype,
        phone
    })
    return newUser;
}



async function login(data) {
    const { email, password } = data
    const user = await userAuthRepository.findByEmail(email)
    if (!user) {
        throw new AppError("User Already Exist", StatusCodes.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new AppError("Invalid Email or Password", StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({ id: user._id, email: user.email }, ServerConfig.JWT_SECRET_KEY, {
        'expiresIn': '1h'
    })
    return { user, token }
}



module.exports = {
    signup, login
}