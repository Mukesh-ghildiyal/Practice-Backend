const express = require('express');
const { UserMiddleware } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

//  /api/v1/airplanes  POST
router.post('/', UserMiddleware.validateCreateRequest, UserController.createUser)

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUser)

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser)


module.exports = router