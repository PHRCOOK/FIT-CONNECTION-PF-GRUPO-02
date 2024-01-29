import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = ({ id }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const {
    name,
    precio,
    description,
    status,
    code,
    image_url,
    stock,
    category,
  } = product;

  return (
    <div className="detail">
      <img className="detail__image" src={image_url} alt={name} />
      <h2 className="detail__name">Nombre: {name}</h2>
      <p className="detail__description">Descripcion: {description}</p>
      <p className="detail__code">Código: {code}</p>
      <p className="detail__price">Precio: ${precio}</p>
      <p className="detail__status">Estado: {status}</p>
      <p className="detail__stock">Stock: {stock}</p>
      <p className="detail__category">Categoría: {category}</p>
    </div>
  );
};

export default Detail;
