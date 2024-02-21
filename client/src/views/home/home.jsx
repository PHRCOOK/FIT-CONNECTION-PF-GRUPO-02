import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import gym1 from "../../assets/img/gym1.jpg";
import gym2 from "../../assets/img/gym2.jpg";
import gym3 from "../../assets/img/gym3.jpg";
import gym4 from "../../assets/img/gym4.jpg";
import gym5 from "../../assets/img/gym5.jpg";
import gym6 from "../../assets/img/gym6.png";
import entrenadores from "../../assets/img/entrenadores.jpg";
import nutricion from "../../assets/img/nutricion.webp";
import pesas from "../../assets/img/pesas.jpg";
import imagen from "../../assets/img/imagen.jpeg";

import { Container, Carousel, Image, Row, Col } from "react-bootstrap";

export default function home() {
  return (
    <>
      <Container fluid>
        <Row className="align-items-center">
          <Col xs="12" md="5">
            <p className="fs-1 fw-bold text-center">
              ¡VEN! CONOCE NUESTRO GIMNASIO
            </p>
            <p className="h4 text-center fw-light">AUMENTA TU POTENCIAL</p>
          </Col>
          <Col xs="12" md="7">
            <Carousel fade className="bg-dark rounded">
              <Carousel.Item className="text-center bg-dark">
                <Image src={logo} className="rounded object-fit-contain" />
              </Carousel.Item>
              <Carousel.Item className="text-center bg-dark">
                <Image src={gym1} className="rounded object-fit-contain" />
              </Carousel.Item>
              <Carousel.Item className="text-center bg-dark">
                <Image src={gym2} className="rounded object-fit-contain" />
              </Carousel.Item>
              <Carousel.Item className="text-center bg-dark">
                <Image src={gym3} className="rounded object-fit-contain" />
              </Carousel.Item>
              <Carousel.Item className="text-center bg-dark">
                <Image src={gym4} className="rounded object-fit-contain" />
              </Carousel.Item>
              <Carousel.Item className="text-center bg-dark">
                <Image src={gym5} className="rounded object-fit-contain" />
              </Carousel.Item>
              <Carousel.Item className="text-center bg-dark">
                <Image src={gym6} className="rounded object-fit-contain" />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Link to="/services">
          <Row className="align-items-center">
            <Col xs="12" md="7">
              <Image
                fluid
                src={nutricion}
                className="rounded m-3 object-fit-contain"
              />
            </Col>
            <Col xs="12" md="5">
              <p className="h1 fw-bold text-center">NUESTROS SERVICIOS</p>
              <p className="h4 text-center fw-light">
                Los mejores planes de entrenamiento, variedad de implementos
                deportivos
              </p>
            </Col>
          </Row>{" "}
        </Link>
      </Container>
      <Container fluid>
        <Link to="/instructors">
          <Row className="align-items-center">
            <Col xs="12" md="5">
              <p className="h1 fw-bold text-center">
                CONOCE NUESTROS ENTRENADORES{" "}
              </p>
              <p className="h4 text-center fw-light">
                Preparación de rutinas de entrenamiento, conocimiento en TRX,
                Streiching, fortalecimiento muscular y más
              </p>
            </Col>
            <Col xs="12" md="7">
              <Image fluid src={entrenadores} className="rounded my-3" />
            </Col>
          </Row>
        </Link>
      </Container>
    </>
  );
}
