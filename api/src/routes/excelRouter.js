const express = require('express');
const router = express.Router();
const { extractDataHandler, getAllShopsHandler, getShopsyCplHandler } = require('../handlers/excelHandler');

router.post('/extractData', extractDataHandler);

router.get('/comercios', getAllShopsHandler);

router.get('/codigo_postal/:codigoPostal', getShopsyCplHandler);

module.exports = router;
