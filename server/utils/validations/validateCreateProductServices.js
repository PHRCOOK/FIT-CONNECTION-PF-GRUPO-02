const validateCreateProductServices = ({ name, price, description, brand, image_url, stock, category_id }) => {

    if (!name) {
        throw new Error('Please enter a name.');
    }

    if (!price) {
        throw new Error('Please enter a price.');
    }

    if (!description) {
        throw new Error('Please enter a description.');
    }

    if (!brand) {
        throw new Error('Please enter a brand.');
    }

    // if (!image_url) {
    //     throw new Error('Please enter a image.');
    // }

    if (!stock) {
        throw new Error('Please enter a stock number.');
    }

    if (!category_id) {
        throw new Error('Must belong to a category.');
    }

    if (!isNaN(name)) {
        throw new Error('The name cannot be a number.')
    }
    // Comentado para el nuevo form
    // if (typeof price === "string") {
    //     throw new Error('The price must be a number.')
    // }

    // if (typeof stock === "string") {
    //     throw new Error('The stock must be a number.')
    // }


    if (!isNaN(description)) {
        throw new Error('The description cannot be a number.')
    }

    if (!isNaN(image_url)) {
        throw new Error('The image cannot be a number.')
    }

};

module.exports = { validateCreateProductServices };
