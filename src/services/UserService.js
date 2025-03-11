const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const UserRepository = require("../repositories/user-repository");

const userRepository = new UserRepository()

async function createUser(data) {
    try {
        const user = await userRepository.create(data)
        return user
    } catch (error) {
        console.log("error", error)
        if (error.name === 'ValidationError') {
            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            console.log("explanation", explanation)
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(id) {
    try {
        const user = await userRepository.get(id);
        return user;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The user you requested is not present", error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the user by given id', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function getAllUsers() {
    try {
        const users = await userRepository.getAll();
        return users;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the users', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function deleteUser(id) {
    try {
        const user = await userRepository.destroy(id);
        return user;

    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The user you requested to delete is not present", error.statusCode)
        }
        throw new AppError('Cannot delete data of all the user by given id', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateUser(id, data) {
    try {
        const artist = await userRepository.update(id, data);
        if (!artist) {
            throw new AppError('The user you requested to update is not present', StatusCodes.NOT_FOUND);
        }
        return artist;
    } catch (error) {
        console.log("error", error)
        if (error.name === 'ValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot update user data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    updateUser, deleteUser, getAllUsers, getUser, createUser
}