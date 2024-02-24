const validateMembership = ({name, price, duration, description}) => {
    if (!name) {
        throw new Error('Por favor ingrese un nombre.');
    }

    if (!price) {
        throw new Error('Por favor ingrese un precio.');
    }

    if (!description) {
        throw new Error('Por favor ingrese una descripción.');
    }

    if (!duration) {
        throw new Error('Por favor ingrese la duración.');
    }

    if (!isNaN(name)) {
        throw new Error('El nombre no puede ser un número..')
    }

    if (!isNaN(description)) {
        throw new Error('La descripción no puede ser un número.')
    }

}

module.exports = { validateMembership };