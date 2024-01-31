/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProduct, putProduct } from "../../../redux/action";

function product(props) {
  const {
    id,
    name,
    price,
    description,
    status,
    code,
    image_url,
    stock,
    category,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModify = (id) => {
    navigate(`/admin/modifyproduct/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.alert("Producto borrado correctamente");
    navigate("/admin");
  };

  return (
    <div>
      <h1>{name}</h1>
      <img src={image_url} alt={name} />
      <p>{description}</p>
      <h2>{price}</h2>
      <h2>{status}</h2>
      <h2>{stock}</h2>
      <h2>{code}</h2>
      <h2>{category}</h2>

      <button
        onClick={() => {
          handleModify(props.id);
        }}
      >
        MODIFICAR
      </button>
      <button
        onClick={() => {
          handleDelete(props.id);
        }}
      >
        ELIMINAR
      </button>
    </div>
  );
}

export default product;
