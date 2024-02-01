// import React from "react";
import { Card, Row, Col, CardBody, CardTitle } from "react-bootstrap";

function AppCard({
  id,
  name,
  price,
  description,
  status,
  code,
  image_url,
  stock,
  category,
}) {
  return (
    <Card>
      <Card.Img style={{ height: '300px', objectFit: 'contain' }} variant="top" src={image_url}/>
      <CardBody>
        <CardTitle>Nombre: {name}</CardTitle>
        <CardTitle>Id: {id}</CardTitle>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" md="6">
            <span className="fw-bold">Codigo:</span> {code}
          </Col>
          <Col xs="12">{description}</Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default AppCard;