
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req, res, next) {
    if (!req.body.name || !req.body.password) {

        ErrorResponse.message = "name and pass  are required",
            ErrorResponse.error = new AppError(["name and pass  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateCreateRequest
}