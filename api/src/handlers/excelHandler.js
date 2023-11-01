const { extractDataFromWorksheet } = require('../controllers/excelController/extractDataFromWorksheet.js');
const { getAllShopsController } = require('../controllers/excelController/getAllShopsController.js');
const { getShopsByCpController } = require('../controllers/excelController/getShopsByCpController.js');
const { managementController } = require("../controllers/excelController/putShopsManagement.js");
const { getShopsByIdController } = require('../controllers/excelController/getShopsByIdController.js')

const extractDataHandler = (req, res) => {
    const workSheet = req.files.file1;
    const data = extractDataFromWorksheet(workSheet);
    res.json(data)
};

const getAllShopsHandler = async (req, res) => {
    try {
        const allComercios = await getAllShopsController();
        res.status(200).send(allComercios);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
};

const getShopsyCplHandler = async (req, res) => {
    try {
        const comerciosCp = await getShopsByCpController(req, res)
        res.status(200).send(comerciosCp);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const managementHandler = async (req, res) => {
    try {
        const message = await managementController(req, res);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getShopsByIdHandler = async (req, res) => {
    try {
        const shopsId = req.params.id;
        const shop = await getShopsByIdController(shopsId);
        res.status(200).json(shop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    extractDataHandler,
    getAllShopsHandler,
    getShopsyCplHandler,
    managementHandler,
    getShopsByIdHandler,

};
