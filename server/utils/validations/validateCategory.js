const validateCategory = (name) => {
    if (!name) {
        throw new Error('Por favor ingrese un nombre para la categoria.')
    }

    if (!isNaN(name)) {
        throw new Error('El nombre no puede ser un número.')
    }
}

module.exports = { validateCategory };