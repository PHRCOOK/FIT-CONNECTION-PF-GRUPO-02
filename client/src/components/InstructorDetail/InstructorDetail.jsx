import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import StarRating from "./StarRating";

const InstructorDetail = () => {
  const { id } = useParams();
  const [instructorInfo, setInstructorInfo] = useState({
    description: "",
    fullname: "",
    id: 0,
    photo: "",
    status: false,
  });
  const [rating, setRating] = useState(0);

  const fetchInstructor = async (id) => {
    try {
      const { data } = await axios(`/api/instructors/${id}`);
      setInstructorInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  // const submitRating = async (instructorId, rating) => {
  //   try {
  //     // Envia la calificación al servidor (ajustar la URL y los datos según tu API)
  //     await axios.post(`/api/instructors/${instructorId}/ratings`, { rating });
  //     console.log("Calificación enviada exitosamente");
  //     // Puedes realizar alguna acción adicional después de enviar la calificación
  //   } catch (error) {
  //     console.error("Error al enviar la calificación", error);
  //   }
  // };

  useEffect(() => {
    if (id) {
      fetchInstructor(id);
    }
  }, [id]);

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
              <Card.Title>{instructorInfo.fullname}</Card.Title>
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
      <div className="my-3 text-center">
        <span className="fw-bold">Calificación: </span>
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
        <Button
          variant="primary"
          onClick={() => submitRating(instructorInfo.id, rating)}
        >
          Enviar Calificación
        </Button>
      </div>
    </Container>
  );
};

export default InstructorDetail;
