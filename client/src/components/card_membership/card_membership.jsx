import { Link } from "react-router-dom";
import { Card, Row, Col, CardBody, CardTitle } from "react-bootstrap";

const MembershipCard = ({id, name, price, description, image_url }) => {
  return (
    <Card className="p-3">
      <Link to={`/detailMembership/${id}`}>
        <Card.Img
          className="my-1"
          style={{ height: "300px", objectFit: "contain" }}
          variant="top"
          src={image_url}
        />
      </Link>
      <CardBody>
        <Link to={`/detailMembership/${id}`}>
          <CardTitle>Nombre: {name}</CardTitle>
        </Link>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12">{description}</Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default MembershipCard