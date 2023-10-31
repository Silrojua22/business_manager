const express = require('express');
const router = express.Router();
const {
    extractDataHandler,
    getAllShopsHandler,
    getShopsyCplHandler,
    managementHandler,
    getShopsByIdHandler
} = require('../handlers/excelHandler');

router.post('/extractData', extractDataHandler);

router.get('/comercios', getAllShopsHandler);

router.get('/codigo_postal/:codigoPostal', getShopsyCplHandler);

router.get('/comercios/:id', getShopsByIdHandler);

router.put('/gestion/:id', managementHandler);



module.exports = router;
