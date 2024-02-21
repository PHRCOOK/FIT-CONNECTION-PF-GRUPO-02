import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";

function InstructorDetail() {
  const { fullname, id } = useParams();
  const params = useParams();
  const [instructorInfo, setInstructorInfo] = useState({
    description: "",
    fullname: "",
    id: 0,
    photo: "",
    status: false,
  });

  const fetchInstructor = async (id) => {
    try {
      const { data } = await axios(`/api/instructors/${id}`);
      console.log(data);
      setInstructorInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInstructor(id);
    }
  }, [fullname]);

  return (
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">
        Detalle del Instructor
      </div>
      <Card>
        <Row>
          <Col>
            <Card.Img
              className="my-3"
              style={{ height: "300px", objectFit: "contain" }}
              variant="top"
              src={instructorInfo.photo}
            ></Card.Img>
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Row>
                <Col xs="12" md="6">
                  <span className="fw-bold">Nombre:</span>{" "}
                  {instructorInfo.fullname}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Identificación:</span>{" "}
                  {instructorInfo.id}
                </Col>
                <Col xs="12">
                  <span className="fw-bold">Descripcion: </span>{" "}
                  {instructorInfo.description}
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default InstructorDetail;
