const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw new AppError('Error creating resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            if (!response) {
                throw new AppError("Resource not found to delete", StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            throw new AppError('Error deleting resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async get(id) {
        try {
            const response = await this.model.findById(id);
            if (!response) {
                throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            throw new AppError('Error fetching resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            throw new AppError('Error fetching all resources', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            });
            if (!response) {
                throw new AppError("Resource not found to update", StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            throw new AppError('Error updating resource', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = CrudRepository;