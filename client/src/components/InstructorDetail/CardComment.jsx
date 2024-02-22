import React from "react";
import { Row, Col } from "react-bootstrap";
import { format } from "date-fns";

function CardComment({
  comment,
  id,
  instructor_id,
  post_at,
  raiting,
  user_id,
  Instructor,
  User,
}) {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      <Row>
        <Col xs="12">
          <span className="fw-bold">Usuario: </span> {User.name}
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <span className="fw-bold">Comentario: </span> {comment}
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <span className="fw-bold">Calificación: </span> {raiting}
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <span className="fw-bold">Fecha de publicación: </span>
          {format(new Date(post_at), "dd/MM/yyyy HH:mm:ss")}
        </Col>
      </Row>
    </div>
  );
}

export default CardComment;
