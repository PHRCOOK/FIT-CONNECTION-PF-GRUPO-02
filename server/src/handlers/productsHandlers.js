const {
  validateCreateProductServices,
} = require("../../utils/validations/validateCreateProductServices");
const {
  getProductServices,
  getProductServicesById,
  createProductServices,
  updateProductServices,
  deleteProductServices,
  filterAndOrder,
} = require("../controllers/productsController");


const getProductServicesByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProductServicesById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const createProductServicesHandler = async (req, res) => {
  const {
    name,
    price,
    description,
    status,
    code,
    stock,
    category_id,
  } = req.body;
  const image_url = req.file;
  try {
    validateCreateProductServices({
      name,
      price,
      description,
      status,
      code,
      image_url,
      stock,
      category_id,
    });
    const response = await createProductServices(
      name,
      price,
      description,
      status,
      code,
      image_url,
      stock,
      category_id
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductServicesHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, status, code, image_url, stock } = req.body;
  try {
    const response = await updateProductServices(id, {
      name,
      price,
      description,
      status,
      code,
      image_url,
      stock,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductServicesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteProductServices(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const productFilterAndOrderHandler = async (req, res) => {
  const { category_id, name, code, minPrice, maxPrice, sortOrder, page, size } =
    req.query;
  try {
    const response = await filterAndOrder(
      sortOrder,
      minPrice,
      maxPrice,
      category_id,
      name,
      code,
      page,
      size
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error desconocido" });
  }
};

module.exports = {
  getProductServicesByIdHandler,
  createProductServicesHandler,
  updateProductServicesHandler,
  deleteProductServicesHandler,
  productFilterAndOrderHandler,
};
