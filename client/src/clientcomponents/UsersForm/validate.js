

const regexEmail = /^[A-Z0-9._%+-]+@naranjax\.com$/i;
const validateNumero = new RegExp(/^(?=.*\d)(?=.*[a-z]).{6,10}$/);

export const validate = (inputs) => {
    const errors = {};

    if (!regexEmail.test(inputs.userName)) {
        errors.userName = "Debe ser un E-Mail";
    }

    if (!inputs.userName) {
        errors.userName = "No puede ser vacío";
    }

    if (inputs.userName.length > 35) {
        errors.userName = "No puede tener más de 35 caracteres";
    }

    if (!validateNumero.test(inputs.password)) {
        errors.password = "Debe contener al menos un número";
    }

    if (inputs.password.length < 6 || inputs.password.length > 10) {
        errors.password = "Debe tener entre 6 y 10 caracteres";
    }

    if (!inputs.legajo) {
        errors.legajo = "No puede ser vacío";
    }

    if (!/^\d+$/.test(inputs.legajo)) {
        errors.legajo = "Debe ser un número";
    }

    if (inputs.email.length > 35) {
        errors.email = "No puede tener más de 35 caracteres";
    }

    if (inputs.nombre.length > 35) {
        errors.nombre = "No puede tener más de 35 caracteres";
    }

    if (inputs.apellido.length > 35) {
        errors.apellido = "No puede tener más de 35 caracteres";
    }

    return errors;
};
