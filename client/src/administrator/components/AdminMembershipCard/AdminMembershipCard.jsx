import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { putMembership } from "../../../redux/action";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMembershipCard = ({
  id,
  name,
  price,
  description,
  status,
  image_url,
  statusSelection,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [newStatus, setNewStatus] = useState(status);

  const handleModify = (id) => {
    navigate(`/admin/membership/modify/${id}`);
  };

  const handleDelete = (id, status) => {
    const newStatus = !status;
    try {
      dispatch(putMembership(id, { status: newStatus }));
      // setNewStatus(newStatus);
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: statusSelection
          ? "Membresía activada correctamente"
          : "Membresía desactivada correctamente",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo realizar la operación",
      });
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src={image_url} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <p>{description}</p>
        <p>${price}</p>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => handleModify(id)}>
              Modificar
            </Button>
          </Col>
          <Col>
            <Button
              variant={newStatus ? "danger" : "success"}
              onClick={() => handleDelete(id, newStatus)}
            >
              {newStatus ? "Desactivar" : "Activar"}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AdminMembershipCard;
