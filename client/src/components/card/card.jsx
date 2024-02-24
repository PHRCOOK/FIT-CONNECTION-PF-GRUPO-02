import React from "react";
import { Card, Row, Col, CardBody, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppCard({
  id,
  name,
  price,
  description,
  status,
  brand,
  image_url,
  stock,
  category,
}) {
  return (
    <Card className="p-3">
      <Link to={`/detail/${id}`}>
        <Card.Img
          className="my-1"
          style={{ height: "300px", objectFit: "contain" }}
          variant="top"
          src={image_url}
        />
      </Link>
      <CardBody>
        <Link to={`/detail/${id}`}>
          <CardTitle>Nombre: {name}</CardTitle>
        </Link>
        <CardTitle>Id: {id}</CardTitle>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" md="6">
            <span className="fw-bold">Marca:</span> {brand}
          </Col>
          <Col xs="12">{description}</Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default AppCard;
