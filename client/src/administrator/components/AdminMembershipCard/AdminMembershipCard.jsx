import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  Button,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { putMembership, getAllMemberships } from "../../../redux/action";
import Swal from "sweetalert2";

const AdminMembershipCard = ({
  id,
  name,
  price,
  description,
  image_url,
  descriptionMarginBottom = "4", // Valor por defecto, puedes ajustar según tus necesidades
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  const allMemberships = useSelector((state) => state.allMemberships);
  const membership = allMemberships.find((m) => m.id === id);

  const handleModify = (id) => {
    navigate(`/admin/membership/modify/${id}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const updatedStatus = !membership.status;
      await dispatch(putMembership(id, { status: updatedStatus }));

      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: updatedStatus
          ? "Membresía activada correctamente"
          : "Membresía desactivada correctamente",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo realizar la operación",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="p-3 h-100">
      <Card.Img
        className="my-1"
        style={{ height: "300px", objectFit: "contain" }}
        variant="top"
        src={image_url}
      />
      <CardBody className="d-flex flex-column">
        <CardTitle>{name}</CardTitle>
        <Row className={`mb-${descriptionMarginBottom}`}>
          <Col xs="12" md="6">
            <span className="fw-bold">${price}</span>
          </Col>
          <Col xs="12">
            <span>{description}</span>
          </Col>
        </Row>
        <Row className="mt-auto">
          <Col>
            <Button variant="primary" onClick={() => handleModify(id)}>
              Modificar
            </Button>
          </Col>
          <Col>
            <Button
              variant={membership.status ? "danger" : "success"}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : membership.status ? (
                "Desactivar"
              ) : (
                "Activar"
              )}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AdminMembershipCard;
