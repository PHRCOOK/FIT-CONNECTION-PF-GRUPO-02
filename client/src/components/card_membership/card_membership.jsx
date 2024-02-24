import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

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
    <Card className="p-3">
      <Card.Img
        className="my-1"
        style={{ height: "300px", objectFit: "contain" }}
        variant="top"
        src={image_url}
      />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12">{description}</Col>
        </Row>
        <div className="d-flex justify-content-center">
          {isAuthenticated ? (
            <Button variant="primary" onClick={handlePayment}>
              Suscribirse
            </Button>
          ) : (
            <Button variant="primary" onClick={() => loginWithRedirect()}>
              Log in
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MembershipCard;
