const XLSX = require('xlsx');
const { Datos } = require('../db');


const extractDataFromWorksheet = async (fileData) => {

    if (!fileData || !fileData.data) {
        console.log("El archivo no contiene datos válidos.");
        return null;
    }

    const fileBuffer = fileData.data;

    try {
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const dataAsArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const emailIndex = dataAsArray[0].indexOf("EMAIL");
        const codPostalIndex = dataAsArray[0].indexOf("Cod_Postal_Legal");
        const telefonoIndex = dataAsArray[0].indexOf("Teléfono");
        const caracteristicaIndex = dataAsArray[0].indexOf("Característica");
        const calleComercioIndex = dataAsArray[0].indexOf("Calle_Comercio");
        const nombreLegalIndex = dataAsArray[0].indexOf("Nombre_Legal");

        const parseInteger = (value) => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? undefined : parsedValue;
        };

        const postalCodesToKeep = [1706, 1708, 1712, 1714, 1718, 1722, 1742, 1744];

        const arrayOfObjects = dataAsArray
            .filter(row => postalCodesToKeep.includes(parseInteger(row[codPostalIndex])))
            .map(row => ({
                Cuit: row[0],
                Numero_de_Comercio: row[1],
                Nombre_Comercio: row[2],
                Nombre_Titular: row[6],
                Cod_Postal_Legal: codPostalIndex !== -1 ? parseInteger(row[codPostalIndex]) : undefined,
                Teléfono: telefonoIndex !== -1 ? `+549${parseInteger(row[caracteristicaIndex])}${parseInteger(row[telefonoIndex])}` : undefined,
                Calle_Comercio: calleComercioIndex !== -1 ? row[calleComercioIndex] : undefined,
                Nombre_Legal: nombreLegalIndex !== -1 ? row[nombreLegalIndex] : undefined,
                EMAIL: emailIndex !== -1 ? row[emailIndex] : undefined,
            }));


        for (const obj of arrayOfObjects) {
            try {
                const existingData = await Datos.findOne({ where: { Cuit: obj.Cuit } });
                const message = existingData
                    ? `Objeto ya existe en la base de datos, no se creará nuevamente:`
                    : `Objeto guardado en la base de datos:`;

                const result = existingData
                    ? existingData
                    : await Datos.create(obj);

                console.log(`${message}`, result);
            } catch (error) {
                console.error(`Error al guardar el objeto en la base de datos:`, error);
            }
        }


    } catch (error) {
        console.error("Error al procesar el archivo Excel:", error);
        return null;
    }
}

const getAllComerciosController = async (req, res) => {
    try {
        const allComercios = await Datos.findAll();
        return res.status(200).json(allComercios);

    } catch (error) {
        throw new Error("Error al objetener comercios" + error.message)
    }
}



const getComerciosByCodigoPostal = async (req, res) => {
    try {
        const codigoPostal = req.params.codigoPostal;
        const comercios = await Datos.findAll({ where: { Cod_Postal_Legal: codigoPostal } });

        const status = comercios.length === 0 ? 404 : 200;
        const message = comercios.length === 0
            ? 'No se encontraron comercios con ese código postal.'
            : undefined;

        res.status(status).json({ message, comercios });
    } catch (error) {
        console.error('Error al buscar comercios por código postal:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


module.exports = {
    extractDataFromWorksheet,
    getAllComerciosController,
    getComerciosByCodigoPostal
};
