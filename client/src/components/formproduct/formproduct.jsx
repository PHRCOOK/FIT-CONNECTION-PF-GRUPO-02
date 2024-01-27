/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
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
    status: false,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setErrors((prevErrors) => {
        const { image_url, ...rest } = prevErrors;
        return { ...rest };
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm({ ...productForm, image_url: reader.result });
        const imageErrors = validate({ image_url: reader.result });
        if (imageErrors.image_url) {
          setErrors((prevErrors) => ({ ...prevErrors, ...imageErrors }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postProduct(productForm));
    setProductForm({
      name: "",
      price: "",
      description: "",
      status: false,
      code: "",
      image_url: "",
      stock: "",
      category_id: "",
    });
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
      {errors.name && <p>{errors.name}</p>}
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
      {errors.price && <p>{errors.price}</p>}
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
      {errors.description && <p>{errors.description}</p>}
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
      {errors.status && <p>{errors.status}</p>}
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
      {errors.code && <p>{errors.code}</p>}
      <br />
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {productForm.image_url && (
        <img src={productForm.image_url} alt="Selected" />
      )}
      {errors.image_url && <p>{errors.image_url}</p>}
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
      {errors.stock && <p>{errors.stock}</p>}
      <br />
      <div>
        <label>Category</label>
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
        {errors.category_id && <p>{errors.category_id}</p>}
      </div>
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Create Product
      </button>
    </form>
  );
}
