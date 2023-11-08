const express = require('express');
const router = express.Router();
const {
    postUserHandlder,
    getAllUserHandler,
    assignFileNumberHandler,
    getUserByPkHanlder,
    getUserByLegajoHandler
} = require('../handlers/userHandler.js')

router.get('/all_users', getAllUserHandler);

router.get('/user-id/:userId', getUserByPkHanlder)

router.post('/user-create', postUserHandlder);

router.post('/user-assign', assignFileNumberHandler)

router.get('/user_legajo/:userLegajo', getUserByLegajoHandler)


module.exports = router;
