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
    <div>
      <h1>id: {id}</h1>
      <h1>name: {name}</h1>
      <p>description: {description}</p>
      <p>code: {code}</p>
      <img src={image_url} alt={name} />
    </div>
  );
}

export default AppCard;
