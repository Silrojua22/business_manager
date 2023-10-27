const express = require('express');
const router = express.Router();
const { extractDataHandler, getAllComerciosHandler, getComerciobyCodigoPostalHandler } = require('../handlers/excelHandler');

router.post('/extractData', extractDataHandler);

router.get('/comercios', getAllComerciosHandler);

router.get('/codigo_postal/:codigoPostal', getComerciobyCodigoPostalHandler);

module.exports = router;
