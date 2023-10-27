const XLSX = require('xlsx');
const { Datos } = require('../../db');


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
        const postalCodelIndex = dataAsArray[0].indexOf("Cod_Postal_Legal");
        const phoneIndex = dataAsArray[0].indexOf("Teléfono");
        const prefixIndex = dataAsArray[0].indexOf("Característica");
        const adressIndex = dataAsArray[0].indexOf("Calle_Comercio");
        const nameLegalIndex = dataAsArray[0].indexOf("Nombre_Legal");
        const numberAdressIndex = dataAsArray[0].indexOf("Número");

        const parseInteger = (value) => {
            const parsedValue = parseInt(value, 10);
            return isNaN(parsedValue) ? undefined : parsedValue;
        };

        const postalCodesToKeep = [1706, 1708, 1712, 1714, 1718, 1722, 1742, 1744];

        const arrayOfObjects = dataAsArray
            .filter(row => postalCodesToKeep.includes(parseInteger(row[postalCodelIndex])))
            .map(row => ({
                Cuit: row[0],
                Numero_de_Comercio: row[1],
                Nombre_Comercio: row[2],
                Nombre_Titular: row[6],
                Cod_Postal_Legal: postalCodelIndex !== -1 ? parseInteger(row[postalCodelIndex]) : undefined,
                Teléfono: phoneIndex !== -1 ? `+549${parseInteger(row[prefixIndex])}${parseInteger(row[phoneIndex])}` : undefined,
                Calle_Comercio: adressIndex !== -1 ? row[adressIndex] : undefined,
                Número: numberAdressIndex !== -1 ? row[numberAdressIndex] : undefined,
                Nombre_Legal: nameLegalIndex !== -1 ? row[nameLegalIndex] : undefined,
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

module.exports = { extractDataFromWorksheet };