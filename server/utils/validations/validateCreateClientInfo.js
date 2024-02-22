const validateCreateClientInfo = ({ address, phone, dni, birth_date }) => {
    const addressRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/; // Determina que debe tener letras y números.

    if (!address) {
        throw new Error('Por favor ingrese una dirección');        
    }

    if (!addressRegex.test(address)) {
        throw new Error('Por favor ingrese una dirección valida')
    }

    if (!phone) {
        throw new Error('Por favor ingrese un número de telefono');
    }

    if (typeof phone === 'string') {
        throw new Error('El valor debe ser un número.')
    }

    if (!dni) {
        throw new Error('Por favor ingrese un número de dni.');
    }

    if (typeof dni === 'string') {
        throw new Error('El valor debe ser un número.')
    }

    if (!birth_date) {
        throw new Error('Por favor ingrese una fecha.');
    }

}


module.exports = { validateCreateClientInfo }