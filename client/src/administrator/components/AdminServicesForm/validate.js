const validate = (input) => {
    const errors = {};
    if (!input.name) {
        errors.name = "It cannot be empty.";
    }
    if (input.price < 0) {
        errors.price = "The price cannot be a negative number.";
    }
    if (!input.price) {
        errors.price = "It cannot be empty.";
    }
    if (input.description.length > 200) {
        errors.description = "The description cannot exceed 200 characters.";
    }
    if (!input.description) {
        errors.description = "It cannot be empty.";
    }
    if (!input.status) {
        errors.status = "Select one status.";
    }

    return errors;
}

export default validate;