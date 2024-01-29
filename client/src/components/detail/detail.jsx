import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";

const Detail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const {
    name,
    price,
    description,
    status,
    code,
    image_url,
    stock,
    category,
  } = product;

  return (
    <Card>
      <Card.Img style={{ height: '300px', objectFit: 'contain' }} variant="top" src={image_url}></Card.Img>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Row>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Codigo:</span> {code}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Categoria:</span> {category}
          </Col>
          <Col xs="12" md="6" lg="3">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" md="6" lg="3"><span className="fw-bold">Estado:
          </span> {status ? 'Activo' : 'Inactivo'}
          </Col>
          <Col xs="12" md="6" lg="3"><span className="fw-bold">Cantidad:
          </span> {stock}
          </Col>
          <Col xs="12">{description}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Detail;
