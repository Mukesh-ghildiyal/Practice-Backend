const { StatusCodes } = require("http-status-codes");
const { UserAuthService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");



async function signup(req, res) {
    try {
        const user = await UserAuthService.signup(req.body);
        SuccessResponse.data = user
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        console.error(error); // Log error for debugging
        ErrorResponse.error = error.message;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function login(req, res) {
    try {
        const user = await UserAuthService.login(req.body)
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        console.error(error); // Log error for debugging
        ErrorResponse.error = error.message;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    signup, login
}