const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const express = require('express');
const { SuccessResponse, ErrorResponse } = require("../utils/common");
/**
 * POST:/user
 * re-body{Name:"",password:""}
 */


async function createUser(req, res) {
    try {
        const user = await UserService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        SuccessResponse.data = user
        SuccessResponse.message = "user created succesfully"
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in user controller"
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}


async function getAllUsers(req, res) {
    try {
        const users = await UserService.getAllUsers();
        SuccessResponse.data = users
        SuccessResponse.message = "User data fetched succesfully"
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in user controller"
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}


async function getUser(req, res) {
    try {
        const user = await UserService.getUser(req.params.id);
        SuccessResponse.data = user
        SuccessResponse.message = "get user data succesfully"
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in user controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}


async function deleteUser(req, res) {
    try {
        const user = await UserService.deleteUser(req.params.id)
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in user controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}


async function updateUser(req, res) {
    try {
        const user = await UserService.updateUser(req.params.id, req.body)
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in airplane controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    createUser, updateUser, deleteUser, getAllUsers, getUser
}