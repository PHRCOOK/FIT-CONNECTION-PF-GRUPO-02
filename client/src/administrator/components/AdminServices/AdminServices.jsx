import React, { useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pathroutes from "../../../components/helpers/pathroutes";
import { getAllMemberships } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import AdminMembershipCard from "../AdminMembershipCard/AdminMembershipCard";

const AdminServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  const allMemberships = useSelector((state) => state.allMemberships);

  return (
    <div>
      <div className="fs-4 mb-3 fw-bold text-center">Membresía</div>
      <Button
        variant="primary"
        onClick={() => {
          navigate(pathroutes.FORMSERVICE);
        }}
      >
        Crear Membresía
      </Button>
      <Row>
        <Container>
          <Row>
            {allMemberships &&
              allMemberships.map((membership) => (
                <Col xs="12" md="6" lg="4" className="p-3" key={membership.id}>
                  <AdminMembershipCard
                    id={membership.id}
                    name={membership.name}
                    price={membership.price}
                    description={membership.description}
                    image_url={membership.image_url}
                    status={membership.status}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </Row>
    </div>
  );
};

export default AdminServices;
