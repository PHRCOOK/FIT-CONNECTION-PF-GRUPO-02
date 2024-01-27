const { ProductServices, Categories } = require('../db')
const filterProducts = require('../../utils/filterProducts');
const { Op } = require("sequelize");

const getProductServices = async () => {
    try {
        const allProducts = await ProductServices.findAll({
            order: [
                ["name", "ASC"],
            ],            
        });
        return allProducts
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const getProductServicesById = async (id) => {
    try {
        const product = await ProductServices.findByPk(id);
        return product
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const getProductServicesByName = async (name) => {
    try {
        const product = await ProductServices.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
        });

        if (product.length === 0) {
            throw new Error("No se encontro un producto con ese nombre.")
        };
        return product
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const createProductServices = async (name, price, description, status, code, image_url, stock, category_id) => {
    try {
        // Buscamos la categoria correspondiente con el id proporcionado.
        const category = await Categories.findByPk(category_id);

        if (!category) {
            throw new Error("Categoría no encontrada.")
        };
         
        const product = await ProductServices.create({
            name,
            price,
            description,
            status,
            code,
            image_url,
            stock,
        });

        // Agregamos la categoría correspondiente al producto.
        await category.addProductServices(product);

        // Establecemos que un producto solo puede pertenecer a una categoría.
        await product.setCategories(category);

        return { message: "Producto creado con exito." };

    } catch (error) {
        throw new Error(`Error al crear el producto: ${error.message}`);

    }
}  


const updateProductServices = async (id, newData) => {
    try {
        const product = await ProductServices.findByPk(id);
        await product.update(newData);
        return { message: "Producto actualizado exitosamente." };
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const deleteProductServices = async (id) => {
    try {
        const product = await ProductServices.findByPk(id);
        await product.destroy();
        return {message: "Product deleted successfully"}
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const filterByCategory = async (category_id) => {
    try {
        const products = await ProductServices.findAll({
            where: {
                category_id: {
                    [Op.eq]: category_id,
                }
            },
            order: [
                ["price", "ASC"],
            ],
        });
        if (products.length === 0) {
            throw new Error("No se encontraron productos en esa categoría.")
        };

        return products;
        
    } catch (error) {
        throw new Error(error.message )
    };
};

const orderByPrice = async (minPrice, maxPrice) => {
    try {
        const productosByPrice = await ProductServices.findAll({
            where: {
                price: {
                    [Op.between]: [minPrice, maxPrice],
                },
            },
        });
        if (productosByPrice.length === 0) {
            throw new Error("No existen productos en ese rango de precio.")
        };
        
        return productosByPrice;
        
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    };
};

const productfilter = async (category_id, minPrice, maxPrice) => {
    try {

        const products = await ProductServices.findAll({
            where: filterProducts(category_id, minPrice, maxPrice),
            order: [
                ["price", "ASC"],
            ],
        });
        if (products.length === 0) {
            throw new Error("No se encontraron productos con la información proporcionada.")
        }
        return products;

    } catch (error) {
        throw new Error(error.message);
    };
};


module.exports = {
    getProductServices,
    getProductServicesById,
    getProductServicesByName,
    createProductServices,
    updateProductServices,
    deleteProductServices,
    filterByCategory,
    orderByPrice,
    productfilter,

}