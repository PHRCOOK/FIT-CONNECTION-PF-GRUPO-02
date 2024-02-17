const validateCreateUser = ({ name, email, sub }) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) {
        throw new Error('Please enter a name.');
    }

    if (!email) {
        throw new Error('Please enter a email.');
    }

    if (!sub) {
        throw new Error('Please enter a password.');
    }

    if (!isNaN(name)) {
        throw new Error('The name cannot be a number.')
    }

    if (!isEmail.test(email)) {
        throw new Error('Please enter a valid email.');
    }

};


module.exports = { validateCreateUser };
