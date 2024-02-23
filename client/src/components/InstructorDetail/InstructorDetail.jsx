import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Feedback from "./Feedback";
import Comments from "./Comments";
import promedio from "./promedio";
import Swal from "sweetalert2";

const InstructorDetail = () => {
  const { id } = useParams();
  const [instructorInfo, setInstructorInfo] = useState({
    description: "",
    fullname: "",
    id: 0,
    photo: "",
    status: false,
  });

  const [raiting, setRaiting] = useState("");

  const [comments, setComments] = useState([]);

  const fetchInstructor = async (id) => {
    try {
      const { data } = await axios(`/api/instructors/${id}`);
      setInstructorInfo(data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Entrenador no encontrado", "error");
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios("/api/feedbacks");
      const raiting = promedio(
        data.Items.filter(
          (c) => c.Instructor.id === Number(id) && c.status === true
        ).map((c) => c.raiting)
      );
      setComments(data.Items);
      setRaiting(raiting);
    } catch (error) {
      console.log(error);
      // const message = error.response.data.error;
      Swal.fire("Error", "Error al cargar los comentarios", "error");
    }
  };

  useEffect(() => {
    if (id) {
      fetchInstructor(id);
      fetchComments();
    }
  }, [id]);

  return (
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">
        Detalle del Instructor
      </div>
      <Card className="p-3">
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
              <Card.Title>{instructorInfo.fullname}</Card.Title>
              <Row>
                <Col xs="12" md="6">
                  <span className="fw-bold">Nombre</span>{" "}
                  {instructorInfo.fullname}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Identificación</span>{" "}
                  {instructorInfo.id}
                </Col>
                <Col xs="12">
                  <span className="fw-bold">Calificacion promedio </span>{" "}
                  {raiting}
                </Col>
                <Col xs="12">
                  <Row>
                    <span className="fw-bold">Descripcion </span>
                  </Row>
                  <Row>
                    <span className="fw">{instructorInfo.description}</span>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Row>
        <div className="my-3 text-center">
          <Comments id_instructor={id} comments={comments} />
        </div>
      </Row>
      <Row>
        <div className="my-3 text-center">
          <Feedback fetchComments={fetchComments} />
        </div>
      </Row>
    </Container>
  );
};

export default InstructorDetail;
