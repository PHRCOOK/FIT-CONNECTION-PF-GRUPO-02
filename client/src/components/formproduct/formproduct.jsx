/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { postProduct, getAllCategories } from "../../redux/action";
import validate from "./validate";
import { FormControl, FormLabel, FormText, Row, Col } from "react-bootstrap";

export default function formproduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const allCategories = useSelector((state) => state.allCategories);

  const dispatch = useDispatch();

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    status: "", // debe quitarse y venir desde back en true por defecto
    code: "",
    image_url: "",
    stock: "",
    category_id: "",
  });

  useEffect(() => {
    if (params.id) {
      const productFiltered = productsToShow.filter(
        (product) => params.id === product.id.toString()
      );
      console.log(productFiltered[0].name);
    }
  }, [params]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;

    setProductForm({ ...productForm, [key]: value });
    setErrors(validate({ ...productForm, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(productForm));
    setProductForm({
      name: "",
      price: "",
      description: "",
      status: "",
      code: "",
      image_url: "",
      stock: "",
      category_id: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fs-4 mb-3 fw-bold text-center">
        Creación de producto o servicio
      </div>
      <Row>
        <Col xs="12" className="pb-3">
          <FormLabel className="form-label">Name</FormLabel>
          <FormControl
            type="text"
            name="name"
            className="form-control"
            value={productForm.name}
            onChange={handleChange}
          />
          {errors.name && (
            <FormText className="form-text">{errors.name}</FormText>
          )}
        </Col>
        <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
          <FormLabel className="form-label">Code</FormLabel>
          <FormControl
            type="text"
            name="code"
            className="form-control"
            value={productForm.code}
            onChange={handleChange}
          />
          {errors.code && (
            <FormText className="form-text">{errors.code}</FormText>
          )}
        </Col>
        <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
          <FormLabel className="form-label">Category</FormLabel>
          <select
            name="category_id"
            className="form-control"
            defaultValue={"DEFAULT"}
            onChange={handleChange}
          >
            <option value="DEFAULT" disabled hidden>
              --
            </option>
            {allCategories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name.toUpperCase()}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <FormText className="form-text">{errors.category_id}</FormText>
          )}
        </Col>
        <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
          <FormLabel className="form-label">Price</FormLabel>
          <FormControl
            type="text"
            name="price"
            className="form-control"
            value={productForm.price}
            onChange={handleChange}
          />
          {errors.price && (
            <FormText className="form-text">{errors.price}</FormText>
          )}
        </Col>
        <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
          <FormLabel className="form-label">Stock</FormLabel>
          <FormControl
            type="text"
            name="stock"
            className="form-control"
            value={productForm.stock}
            onChange={handleChange}
          />
          {errors.stock && (
            <FormText className="form-text">{errors.stock}</FormText>
          )}
        </Col>
        <Col xs="12" md="8" lg="6" className="pb-3">
          <FormLabel className="form-label">Image</FormLabel>
          <FormControl
            type="text"
            name="image_url"
            className="form-control"
            value={productForm.image_url}
            onChange={handleChange}
          />
        </Col>
        <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
          <FormLabel className="form-label">Status</FormLabel>
          <select
            name="status"
            className="form-control"
            defaultValue={"DEFAULT"}
            onChange={handleChange}
          />
          {errors.status && <div className="form-text">{errors.status}</div>}
        </div>
        <div className="col-12 pb-3">
          <label className="form-label">Description</label>
          <textarea
            rows="5"
            name="description"
            as="textarea"
            value={productForm.description}
            onChange={handleChange}
          />
          {errors.description && <div className="form-text">{errors.description}</div>}
        </div>
        <div className="col-12 pb-3">
          <button className="btn btn-primary" type="submit" disabled={Object.keys(errors).length > 0}>
            Create Product
          </button>
        </Col>
      </Row>
    </form>
  );
}