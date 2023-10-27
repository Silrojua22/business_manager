const { extractDataFromWorksheet, get } = require('../controllers/excelController/extractDataFromWorksheet.js');
const { getAllShopsController } = require('../controllers/excelController/getAllShopsController.js');
const { getShopsByCpController } = require('../controllers/excelController/getShopsByCpController.js');

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
}

const getShopsyCplHandler = async (req, res) => {
    try {
        const comerciosCp = await getShopsByCpController(req, res)
        res.status(200).send(comerciosCp);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
module.exports = {
    extractDataHandler,
    getAllShopsHandler,
    getShopsyCplHandler

};
