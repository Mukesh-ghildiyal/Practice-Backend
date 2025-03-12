const express = require('express');
const { UserAuthController } = require('../../controllers');
const router = express.Router();

router.post('/signup', UserAuthController.signup)
router.post('/login', UserAuthController.login)

module.exports = router;