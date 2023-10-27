const express = require('express');
const router = express.Router();
const { postUserHandlder, getAllUserHandler } = require('../handlers/userHandler.js')

router.get('/all_users', getAllUserHandler);

router.post('/user-create', postUserHandlder);


module.exports = router;
