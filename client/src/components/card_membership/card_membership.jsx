import { useNavigate } from "react-router-dom";
import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";

const MembershipCard = ({id, name, price, description, image_url }) => {
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate('/checkout');
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
          <Button variant="primary" onClick={handleSubscribeClick}>Suscribirse</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default MembershipCard