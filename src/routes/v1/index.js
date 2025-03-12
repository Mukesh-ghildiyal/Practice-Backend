const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes')
const userAuthRoutes = require('./userAuth-route')
router.use('/user', userRoutes)
router.use('/user-auth', userAuthRoutes)


module.exports = router;