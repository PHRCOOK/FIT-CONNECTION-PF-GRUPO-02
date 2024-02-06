const validateCreateUser = ({ fullname, email, password }) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/;

    if (!fullname) {
        throw new Error('Please enter a name.');
    }

    if (!email) {
        throw new Error('Please enter a email.');
    }

    if (!password) {
        throw new Error('Please enter a password.');
    }

    if (!isNaN(fullname)) {
        throw new Error('The name cannot be a number.')
    }

    if (!isEmail.test(email)) {
        throw new Error('Please enter a valid email.');
    }

    if (!passwordRegex.test(password)) {
        throw new Error('The password must contain at least 8 characters, at least one number, one lowercase letter and one uppercase letter.');
    }
};

module.exports = { validateCreateUser };
