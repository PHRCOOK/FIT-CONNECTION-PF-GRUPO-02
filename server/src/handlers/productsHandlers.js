const {
  validateCreateProductServices,
} = require("../../utils/validations/validateCreateProductServices");
const {
  getProductServicesById,
  createProductServices,
  updateProductServices,
  filterAndOrder,
} = require("../controllers/productsController");

const getProductServicesByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProductServicesById(id);
    if (!response) {
      throw new Error("Not found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createProductServicesHandler = async (req, res) => {
  const { name, price, description, status, brand, stock, category_id } =
    req.body;
  const { image_url } = req.file;

  console.log("image_url", image_url);

  try {
    validateCreateProductServices({
      name,
      price,
      description,
      status,
      brand,
      // image_url,
      stock,
      category_id,
    });
    const response = await createProductServices(
      name,
      price,
      description,
      status,
      brand,
      image_url,
      stock,
      category_id
    );
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
  console.log(req.file);
};

const updateProductServicesHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, status, code, image_url, stock } = req.body;
  console.log("body", req.body);
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
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const productFilterAndOrderHandler = async (req, res) => {
  const {
    category_id,
    name,
    brand,
    minPrice,
    maxPrice,
    sortOrder,
    page,
    size,
  } = req.query;
  try {
    const response = await filterAndOrder(
      sortOrder,
      minPrice,
      maxPrice,
      category_id,
      name,
      brand,
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
  productFilterAndOrderHandler,
};
