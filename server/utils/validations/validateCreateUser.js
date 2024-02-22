const validateCreateUser = ({ name, email, sub }) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) {
        throw new Error('Por favor ingrese un nombre.');
    }

    if (!email) {
        throw new Error('Por favor ingrese un email.');
    }

    if (!sub) {
        throw new Error('Por favor ingresa un sub.');
    }

    if (!isNaN(name)) {
        throw new Error('El nombre no puede ser un número.')
    }

    if (!isEmail.test(email)) {
        throw new Error('Por favor ingrese un email valido.');
    }

};


module.exports = { validateCreateUser };
