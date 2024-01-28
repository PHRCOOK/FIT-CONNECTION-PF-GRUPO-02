/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { postProduct, getAllCategories } from "../../redux/action";
import validate from "./validate";

export default function formproduct() {
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const allCategories = useSelector((state) => state.allCategories);

  const dispatch = useDispatch();

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    status: false, // debe quitarse y venir desde back en true por defecto
    code: "",
    image_url: "",
    stock: "",
    category_id: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;
    setProductForm({ ...productForm, [key]: value });
    setErrors(validate({ ...productForm, [key]: value }));
  };

  const handleSubmit = async (e) => {
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
      <h1 className="fw-bold text-center">Creación de producto o servicio</h1>
      <div className="row">
        <div className="col-12 pb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={productForm.name}
            onChange={handleChange}
          />
          {errors.name && <div className="form-text">{errors.name}</div>}
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
          <label className="form-label">Code</label>
          <input
            type="text"
            name="code"
            className="form-control"
            value={productForm.code}
            onChange={handleChange}
          />
          {errors.code && <div className="form-text">{errors.code}</div>}
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
          <label className="form-label">Category</label>
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
          {errors.category_id && <div className="form-text">{errors.category_id}</div>}
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={productForm.price}
            onChange={handleChange}
          />
          {errors.price && <div className="form-text">{errors.price}</div>}
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
          <label className="form-label">Stock</label>
          <input
            type="text"
            name="stock"
            className="form-control"
            value={productForm.stock}
            onChange={handleChange}
          />
          {errors.stock && <div className="form-text">{errors.stock}</div>}
        </div>
        <div className="col-12 col-md-8 col-lg-9 pb-3">
          <label className="form-label">Image</label>
          <input
            type="text"
            name="image_url"
            className="form-control"
            value={productForm.image_url}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            name="status"
            className="form-control"
            value={productForm.status}
            onChange={handleChange}
          />
          {errors.status && <div className="form-text">{errors.status}</div>}
        </div>
        <div className="col-12 pb-3">
          <label className="form-label">Description</label>
          <textarea
            rows="5"
            name="description"
            className="form-control"
            value={productForm.description}
            onChange={handleChange}
          />
          {errors.description && <div className="form-text">{errors.description}</div>}
        </div>
        <div className="col-12 pb-3">
          <button className="btn btn-primary" type="submit" disabled={Object.keys(errors).length > 0}>
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
}
