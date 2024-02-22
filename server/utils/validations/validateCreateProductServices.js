const validateCreateProductServices = ({ name, price, description, brand, image_url, stock, category_id }) => {

    if (!name) {
        throw new Error('Por favor ingrese un nombre.');
    }

    if (!price) {
        throw new Error('Por favor ingrese un precio.');
    }

    if (!description) {
        throw new Error('Por favor ingrese una descripción.');
    }

    if (!brand) {
        throw new Error('Ppr favor ingrese una marca.');
    }

    // if (!image_url) {
    //     throw new Error('Please enter a image.');
    // }

    if (!stock) {
        throw new Error('Por favor ingrese un número de existencia.');
    }

    if (!category_id) {
        throw new Error('Debe pertenecer a una categoría..');
    }

    if (!isNaN(name)) {
        throw new Error('El nombre no puede ser un número..')
    }
    // Comentado para el nuevo form
    // if (typeof price === "string") {
    //     throw new Error('The price must be a number.')
    // }

    // if (typeof stock === "string") {
    //     throw new Error('The stock must be a number.')
    // }


    if (!isNaN(description)) {
        throw new Error('La descripción no puede ser un número.')
    }

    if (!isNaN(image_url)) {
        throw new Error('La imagen no puede ser un número.')
    }

};

module.exports = { validateCreateProductServices };
