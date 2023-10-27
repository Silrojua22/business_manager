const express = require('express');
const router = express.Router();
const { extractDataHandler, getAllComerciosHandler, getComerciobyCodigoPostalHandler } = require('../handlers/excelHandler');

router.get('/', getAllComerciosHandler);

router.get('/comercios/codigo_postal/:codigoPostal', getComerciobyCodigoPostalHandler);

router.post('/extractData', extractDataHandler);



module.exports = router;
