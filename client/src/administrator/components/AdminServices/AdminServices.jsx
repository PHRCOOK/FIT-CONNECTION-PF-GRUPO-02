import MembershipsCards from "../../../components/cards_memberships/cards_memberships";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pathroutes from "../../../components/helpers/pathroutes";
import { getAllMemberships } from "../../../redux/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminMembershipCard from "../AdminMembershipCard/AdminMembershipCard"
import { useSelector } from "react-redux";


const AdminServices = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);
  
  const navigate = useNavigate();
  const allMemberships = useSelector((state) => state.allMemberships);

  return (
    <div>
      <div className="fs-4 mb-3 fw-bold text-center">Membresia</div>
      <Button
        variant="primary"
        onClick={() => {
          navigate(pathroutes.FORMSERVICE);
        }}
      >
        Crear Membresia
      </Button>
      <Row>
        <Col>
        <Row>
        <Col>
          <Container>
            {/* Mapea todas las membresías y renderiza una tarjeta de membresía para cada una */}
            {allMemberships.map((membership) => (
              <AdminMembershipCard
                key={membership.id}
                id={membership.id}
                name={membership.name}
                price={membership.price}
                description={membership.description}
                image_url={membership.image_url}
                status={membership.status}
              />
            ))}
          </Container>
        </Col>
      </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AdminServices;
