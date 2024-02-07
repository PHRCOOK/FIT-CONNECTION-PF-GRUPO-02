const validateCreateInstructor = ({ fullname, photo, description }) => {

    if (!fullname) {
        throw new Error('Please enter a name.');
    }

    if (!photo) {
        throw new Error('Please enter a photo.');
    }

    if (!description) {
        throw new Error('Please enter a description.');
    }

    if (!isNaN(fullname)) {
        throw new Error('The name cannot be a number.')
    }

    if (!isNaN(photo)) {
        throw new Error('The photo cannot be a number.')
    }

    if (!isNaN(description)) {
        throw new Error('The description cannot be a number.')
    }

};

module.exports = { validateCreateInstructor };
