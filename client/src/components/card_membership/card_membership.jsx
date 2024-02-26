import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Swal from "sweetalert2";

const MembershipCard = ({ id, name, price, description, image_url }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [userD, setUser] = useState({});
  const user = useSelector((state) => state.userShopping);

  const handlePayment = async () => {
    try {
      const userId = userD.id;
      const payload = {
        id,
        name,
        price,
        description,
        image_url,
        userId,
      };

      const paymentResponse = await axios.post(
        `/api/membershipPurchases/checkout`,
        payload
      );
      window.location.href = paymentResponse.data.sandbox_init_point;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al procesar el pago: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return (
    <Card
      className="mb-3"
      style={{
        border: "1px solid #ddd",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        height: "550px",
      }}
    >
      <Card.Img
        style={{ height: "300px", objectFit: "contain" }}
        variant="top"
        src={image_url}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" className="mt-2">
            {description}
          </Col>
        </Row>
        <div className="mt-auto">
          {isAuthenticated ? (
            <Button variant="primary" onClick={handlePayment}>
              Suscribirse
            </Button>
          ) : (
            <Button variant="primary" onClick={() => loginWithRedirect()}>
              Iniciar Sesión
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MembershipCard;
