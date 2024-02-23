const validateCreateInstructor = ({ fullname, photo, description }) => {

    if (!fullname) {
        throw new Error('Por favor ingrese un nombre.');
    }

    if (!photo) {
        throw new Error('Por favor ingrese una foto.');
    }

    if (!description) {
        throw new Error('Por favor ingrese una descripción.');
    }

    if (!isNaN(fullname)) {
        throw new Error('El nombre no puede ser un número.')
    }

    if (!isNaN(photo)) {
        throw new Error('La foto no puede ser un número.')
    }

    if (!isNaN(description)) {
        throw new Error('La descripción no puede ser un número.')
    }

};

module.exports = { validateCreateInstructor };
