// import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { putMembership, getAllMemberships } from "../../../redux/action";
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminMembershipCard = ({
//   id,
//   name,
//   price,
//   description,
//   image_url,
//   status,
// }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Llama a la acción getAllMemberships cuando el componente se monta
//   useEffect(() => {
//     dispatch(getAllMemberships());
//   }, [dispatch]);

//   // Obtener el estado de la membresía desde el estado global
//   const allMemberships = useSelector((state) => state.allMemberships);
//   const membership = allMemberships.find((m) => m.id === id);

//   // Estado local para el nuevo estado de la membresía
//   const [newStatus, setNewStatus] = useState(membership ? membership.status : status);

//   const handleModify = (id) => {
//     navigate(`/admin/membership/modify/${id}`);
//   };

//   const handleDelete = async () => {
//     const updatedStatus = !newStatus; // Nuevo estado de la membresía
//     try {
//       await dispatch(putMembership(id, { status: updatedStatus }));
//       setNewStatus(updatedStatus); // Actualizar el estado local
//       Swal.fire({
//         icon: "success",
//         title: "Proceso Exitoso",
//         text: updatedStatus ? "Membresía activada correctamente" : "Membresía desactivada correctamente",
//       });
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "No se pudo realizar la operación",
//       });
//     }
//   };

//   return (
//     <Card className="p-3">
//       <Card.Img className="my-1"
//         style={{ height: "300px", objectFit: "contain" }}
//         variant="top" src={image_url} />
//       <CardBody>
//         <CardTitle>{membership ? membership.name : name}</CardTitle>
//         <Row>
//          <Col xs="12" md="6"> 
//         <span className="fw-bold">${membership ? membership.price : price}</span>
//         </Col>
//         <Col xs="12">
//         <span>{membership ? membership.description : description}</span>
//         </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Button variant="primary" onClick={() => handleModify(id)}>
//               Modificar
//             </Button>
//           </Col>
//           <Col>
//             <Button
//               variant={newStatus ? "danger" : "success"}
//               onClick={handleDelete}
//             >
//               {newStatus ? "Desactivar" : "Activar"}
//             </Button>
//           </Col>
//         </Row>
//       </CardBody>
//     </Card>
//   );
// };

// export default AdminMembershipCard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, CardBody, CardTitle, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { putMembership, getAllMemberships } from "../../../redux/action";
import Swal from "sweetalert2";

const AdminMembershipCard = ({
  id,
  name,
  price,
  description,
  image_url,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Estado para controlar la visualización del indicador de carga
  const [loading, setLoading] = useState(false);

  // Llama a la acción getAllMemberships cuando el componente se monta
  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  // Obtener el estado de la membresía desde el estado global
  const allMemberships = useSelector((state) => state.allMemberships);
  const membership = allMemberships.find((m) => m.id === id);

  const handleModify = (id) => {
    navigate(`/admin/membership/modify/${id}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true); // Mostrar indicador de carga
      
      const updatedStatus = !membership.status; // Obtener el estado actualizado de la membresía desde el estado global
      await dispatch(putMembership(id, { status: updatedStatus }));
      
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: updatedStatus ? "Membresía activada correctamente" : "Membresía desactivada correctamente",
      });
      
      // Ocultar indicador de carga
      setLoading(false);
      
      // Recargar la página después de completar la acción
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo realizar la operación",
      });
      setLoading(false); // Ocultar indicador de carga en caso de error
    }
  };

  return (
    <Card className="p-3">
      <Card.Img className="my-1"
        style={{ height: "300px", objectFit: "contain" }}
        variant="top" src={image_url} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">${price}</span>
          </Col>
          <Col xs="12">
            <span>{description}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => handleModify(id)}>
              Modificar
            </Button>
          </Col>
          <Col>
            {/* Mostrar indicador de carga si loading es true */}
            <Button
              variant={membership.status ? "danger" : "success"}
              onClick={handleDelete}
              disabled={loading} // Deshabilitar botón durante la carga
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                membership.status ? "Desactivar" : "Activar"
              )}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AdminMembershipCard;

