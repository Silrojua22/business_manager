const regexEmail = /^[A-Z0-9._%+-]+@naranjax\.com$/i;
const validateNumero = /^[0-9]+$/;

export const validate = (inputs) => {
    const errors = {};

    if (!regexEmail.test(inputs.email)) {
        errors.email = "Debe ser un E-Mail de naranjax.com";
    }

    if (!inputs.email) {
        errors.email = "No puede ser vacío";
    }

    if (inputs.email.length > 35) {
        errors.email = "No puede tener más de 35 caracteres";
    }
    if (!inputs.legajo || !validateNumero.test(inputs.legajo) || inputs.legajo.toString().length > 10) {
        errors.legajo = "Debe ser un número y tener hasta 10 caracteres";
    }


    if (inputs.nombre.length > 35) {
        errors.nombre = "No puede tener más de 35 caracteres";
    }

    if (inputs.apellido.length > 35) {
        errors.apellido = "No puede tener más de 35 caracteres";
    }

    return errors;
};
