const express = require('express');
const router = express.Router();
const { postUserHandlder, getAllUserHandler } = require('../handlers/userHandler.js')

router.get('/', getAllUserHandler);

router.post('/user-create', postUserHandlder);


module.exports = router;
