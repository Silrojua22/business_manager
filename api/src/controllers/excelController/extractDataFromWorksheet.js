const XLSX = require('xlsx');
const { Datos } = require('../../db');

const parseInteger = (value) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? undefined : parsedValue;
};

const getColumnIndex = (headerRow, columnName) => {
    return headerRow.indexOf(columnName);
};

const processDataRow = (row, headerRow, postalCodesToKeep) => {
    const postalCodeIndex = getColumnIndex(headerRow, "Cod_Postal_Legal");
    const phoneIndex = getColumnIndex(headerRow, "Teléfono");
    const prefixIndex = getColumnIndex(headerRow, "Característica");
    const addressIndex = getColumnIndex(headerRow, "Calle_Comercio");
    const nameLegalIndex = getColumnIndex(headerRow, "Nombre_Legal");
    const numberAddressIndex = getColumnIndex(headerRow, "Número");
    const categoryIndex = getColumnIndex(headerRow, "RUBRO SEMANA NX");

    const filteredRow = {
        Cuit: row[0],
        Numero_de_Comercio: row[1],
        Nombre_Comercio: row[2],
        Nombre_Titular: row[6],
        Cod_Postal_Legal: postalCodeIndex !== -1 ? parseInteger(row[postalCodeIndex]) : undefined,
        Teléfono: phoneIndex !== -1 ? `+549${parseInteger(row[prefixIndex])}${parseInteger(row[phoneIndex])}` : undefined,
        Calle_Comercio: addressIndex !== -1 ? row[addressIndex] : undefined,
        Número: numberAddressIndex !== -1 ? row[numberAddressIndex] : undefined,
        Nombre_Legal: nameLegalIndex !== -1 ? row[nameLegalIndex] : undefined,
        EMAIL: getColumnIndex(headerRow, "EMAIL") !== -1 ? row[headerRow.indexOf("EMAIL")] : undefined,
        Promoción: categoryIndex !== -1 ? row[categoryIndex] : undefined,
    };

    return postalCodesToKeep.includes(parseInteger(filteredRow.Cod_Postal_Legal)) ? filteredRow : null;
};

const insertOrUpdateDataInDatabase = async (data) => {
    for (const obj of data) {
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
};

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

        const headerRow = dataAsArray[0];
        const postalCodesToKeep = [1716, 1718, 1722, 1723, 1727, 1742, 1744, 1746, 1748, 1761, 6700, 1664, 1721, 1749];

        const filteredData = dataAsArray
            .slice(1) // Exclude the header row
            .map((row) => processDataRow(row, headerRow, postalCodesToKeep))
            .filter((row) => row !== null);

        await insertOrUpdateDataInDatabase(filteredData);

    } catch (error) {
        console.error("Error al procesar el archivo Excel:", error);
        return null;
    }
};

module.exports = { extractDataFromWorksheet };
