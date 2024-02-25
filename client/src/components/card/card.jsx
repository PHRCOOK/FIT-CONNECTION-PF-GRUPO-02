import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppCard({ id, name, price, description, brand, image_url }) {
  return (
    <Card
      className="h-100"
      style={{
        border: "1px solid #ddd",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Link to={`/detail/${id}`} className="card-link">
        <Card.Img
          style={{ height: "200px", objectFit: "contain" }}
          variant="top"
          src={image_url}
          alt={name}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/detail/${id}`} className="card-link">
          <Card.Title className="card-title flex-fill">{name}</Card.Title>
        </Link>
        <Row className="mb-2">
          <Col>
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <span className="fw-bold">Marca:</span> {brand}
          </Col>
        </Row>
        <Card.Text className="card-description mb-2">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AppCard;
