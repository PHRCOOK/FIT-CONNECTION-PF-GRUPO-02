import React from "react";
import { Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";

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
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleRaitingChange = (star) => {
    // Lógica para manejar cambios en la calificación
    console.log(`Selected Raiting: ${star}`);
  };

  return (
    <Card style={{ width: "20rem", margin: "10px", padding: "20px" }}>
      <Card.Body>
        <Card.Title style={{ textAlign: "left" }}>{User.name}</Card.Title>
        <Card.Subtitle
          style={{ textAlign: "left" }}
          className="mb-2 text-muted"
        >
          {stars.map((star) => (
            <span
              key={star}
              onClick={() => handleRaitingChange(star)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: star <= raiting ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </Card.Subtitle>
        <Card.Text>{comment}</Card.Text>
        <Card.Text
          style={{ textAlign: "left" }}
          className="mb-2 text-muted small"
        >
          {format(new Date(post_at), "dd/MM/yyyy hh:mm a", { timeZone: "UTC" })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComment;
