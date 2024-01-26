/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={productForm.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={productForm.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={productForm.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={productForm.status}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Code:
        <input
          type="text"
          name="code"
          value={productForm.code}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          name="image_url"
          value={productForm.image_url}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Stock:
        <input
          type="text"
          name="stock"
          value={productForm.stock}
          onChange={handleChange}
        />
      </label>
      <br />
      <div>
        <label>CATEGORY</label>
        <select
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
      <button type="submit">Create Product</button>
    </form>
  );
}
