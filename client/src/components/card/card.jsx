import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppCard({ id, name, price, description, brand, image_url }) {
  return (
    <Card className="h-100">
      <Link to={`/detail/${id}`} className="card-link">
        <Card.Img
          className="card-image"
          variant="top"
          src={image_url}
          alt={name}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/detail/${id}`} className="card-link">
          <Card.Title className="card-title flex-fill">{name}</Card.Title>
        </Link>
        <Card.Text className="card-id">Id: {id}</Card.Text>
        <Row className="mb-2">
          <Col>
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col>
            <span className="fw-bold">Marca:</span> {brand}
          </Col>
        </Row>
        <Card.Text className="card-description">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AppCard;
