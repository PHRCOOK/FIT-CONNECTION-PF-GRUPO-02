/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css-modules/styles.css";

import { postProduct, getAllCategories } from "../../redux/action";

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
    status: false,
    code: "",
    image_url: "",
    stock: "",
    category_id: "",
  });

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;
    setProductForm({ ...productForm, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postProduct(productForm));
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-5">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={productForm.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">Price:</label>
        <input
          type="text"
          name="price"
          className="form-control"
          placeholder="Price"
          value={productForm.price}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">Description:</label>
        <textarea
          type="text"
          name="description"
          className="form-control"
          placeholder="Leave a description here"
          rows="3"
          value={productForm.description}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">Status:</label>
        <input
          type="text"
          name="status"
          className="form-control"
          value={productForm.status}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">Code:</label>
        <input
          type="text"
          name="code"
          className="form-control"
          placeholder="Code"
          value={productForm.code}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">Image URL:</label>
        <input
          type="text"
          name="image_url"
          className="form-control"
          placeholder="Image URL"
          value={productForm.image_url}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">
          Stock:
        </label>
        <input
          type="text"
          name="stock"
          className="form-control"
          placeholder="Stock"
          value={productForm.stock}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-5">
        <label className="form-label">CATEGORY</label>
        <select
          className="form-select"
          name="category_id"
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
      </div>
      <div className="col-12">
        <button className=".btn btn-danger" type="submit">Create Product</button>
      </div >
    </form >
  );
}
