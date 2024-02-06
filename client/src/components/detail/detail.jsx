import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error(error);
        console.error(error.response);
      });

    axios
      .get(`api/categories`)
      .then((response) => {
        console.log(response.data);
        if (response.data.Items && Array.isArray(response.data.Items)) {
          setCategories(response.data.Items);
        } else {
          console.error(
            "La respuesta no contiene un array en la propiedad Items"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response);
      });
  }, [id]);

  const {
    name,
    price,
    description,
    status,
    brand,
    image_url,
    stock,
    category_id,
  } = product;

  const category = categories.find((category) => category.id === category_id);

  //* funcion para crear el carrito de compras
  const handleClick = async (e) => {
    await axios
      .post("http://localhost:3001/api/shoppingCart", {
        user_id: "6",
        product_id: id,
        quantity: 1,
      })
      .then(({ data }) => {
        window.alert("Agregado correctamente al carrito");
      })
      .catch((error) => {
        window.alert(error);
      });
  };
  return (
    <Card>
      <Card.Img
        style={{ height: "300px", objectFit: "contain" }}
        variant="top"
        src={image_url}
      ></Card.Img>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Row>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Brand:</span> {brand}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Categoria:</span>{" "}
            {category ? category.name : category}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Estado:</span>{" "}
            {status ? "Activo" : "Inactivo"}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Cantidad:</span> {stock}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Descripcion: </span>
            {description}
          </Col>
        </Row>
        <button onClick={handleClick}> agregar al carrito</button>
      </Card.Body>
    </Card>
  );
};

export default Detail;
