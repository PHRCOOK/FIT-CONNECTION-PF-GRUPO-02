import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";

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
      .post("/api/shoppingCart", {
        user_id: "1",
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
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">Detalle de Productos</div>
      <Card>
        <Row>
          <Col>
            <Card.Img
              style={{ height: "300px", objectFit: "contain" }}
              variant="top"
              src={image_url}
            ></Card.Img>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Row>
                <Col xs="12" md="6">
                  <span className="fw-bold">Brand:</span> {brand}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Categoria:</span>{" "}
                  {category ? category.name : category}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Precio:</span> ${price}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Estado:</span>{" "}
                  {status ? "Activo" : "Inactivo"}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Cantidad:</span> {stock}
                </Col>
                <Col xs="12">
                  <span className="fw-bold">Descripcion: </span>
                  {description}
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
        <Button className="btn btn-primary d-grid gap-2 col-3 mx-auto my-3" onClick={handleClick}> agregar al carrito</Button>
      </Card >
    </Container>
  );
};

export default Detail;
