import { useNavigate } from "react-router-dom";
import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const MembershipCard = ({ id, name, price, description, image_url,  }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Access loginWithRedirect from useAuth0

  const handlePayment = async () => {
    try {
      const payload = {
        id,name, price,
        description, image_url
      };
      const paymentResponse = await axios.post(`/api/memberships/checkout`, payload); // Envía una solicitud POST al backend con los datos del carrito
      // Maneja la respuesta del pago según tus necesidades
      //window.location.href = paymentResponse.data.sandbox_init_point;
      console.log(paymentResponse)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al procesar el pago: ${error.message}`,
      });
    }
  };
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
              Login
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MembershipCard;
