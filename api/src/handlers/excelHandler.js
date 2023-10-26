const { extractDataFromWorksheet, getAllComerciosController, getComerciosByCodigoPostal } = require('../controllers/excelController.js');

const extractDataHandler = (req, res) => {
    const workSheet = req.files.file1;
    const data = extractDataFromWorksheet(workSheet);
    res.json(data)
};

const getAllComerciosHandler = async (req, res) => {
    try {
        const allComercios = await getAllComerciosController();
        res.status(200).send(allComercios);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const getComerciobyCodigoPostalHandler = async (req, res) => {
    try {
        const comerciosCp = await getComerciosByCodigoPostal(req, res)
        res.status(200).send(comerciosCp);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
module.exports = {
    extractDataHandler,
    getAllComerciosHandler,
    getComerciobyCodigoPostalHandler,

};
