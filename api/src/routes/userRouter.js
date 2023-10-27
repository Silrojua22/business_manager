const express = require('express');
const router = express.Router();
const { postUserHandlder } = require('../handlers/userHandler.js')

router.post('/user-create', postUserHandlder);

module.exports = router;
