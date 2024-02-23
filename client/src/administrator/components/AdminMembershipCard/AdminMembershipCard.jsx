import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { putMembership, getAllMemberships } from "../../../redux/action";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMembershipCard = ({
  id,
  name,
  price,
  description,
  image_url,
  status,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Llama a la acción getAllMemberships cuando el componente se monta
  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  // Obtener el estado de la membresía desde el estado global
  const allMemberships = useSelector((state) => state.allMemberships);
  const membership = allMemberships.find((m) => m.id === id);

  // Estado local para el nuevo estado de la membresía
  const [newStatus, setNewStatus] = useState(membership ? membership.status : status);

  const handleModify = (id) => {
    navigate(`/admin/membership/modify/${id}`);
  };

  const handleDelete = () => {
    const updatedStatus = !newStatus; // Nuevo estado de la membresía
    try {
      dispatch(putMembership(id, { status: updatedStatus }));
      setNewStatus(updatedStatus); // Actualizar el estado local
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: updatedStatus ? "Membresía activada correctamente" : "Membresía desactivada correctamente",
      });
    } catch (error) {
      console.error(error);
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
        <CardTitle>{membership ? membership.name : name}</CardTitle>
        <p>{membership ? membership.description : description}</p>
        <p>${membership ? membership.price : price}</p>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => handleModify(id)}>
              Modificar
            </Button>
          </Col>
          <Col>
            <Button
              variant={newStatus ? "danger" : "success"}
              onClick={handleDelete}
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
