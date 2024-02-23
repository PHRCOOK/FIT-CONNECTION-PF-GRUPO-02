import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="bg-secondary">
      <Container>
        <footer className="py-5">
          <Row>
            <Col xs="12" md="8">
              <div>
                <span className="fw-bold">Contacto:</span> +54 011 - 156 -
                809032
              </div>
              <div>
                <span className="fw-bold">Dirección:</span> Valle del sol 2541 -
                BUENOS AIRES - ARGENTINA
              </div>
              <div className="fw-bold my-3">
                PROYECTO FINAL SOY HENRY PT-15B GRUPO - 02
              </div>
            </Col>
            <Col xs="12" md="4" className="fs-2 text-md-end text-center my-3">
              <a
                className="mx-3"
                href="https://www.facebook.com/tuPagina"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                className="mx-3"
                href="https://wa.me/tuNumero"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                className="mx-3"
                href="https://www.instagram.com/tuPagina"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </Col>
          </Row>
          <div className="border-top text-center py-3">
            {new Date().getFullYear()}
          </div>
        </footer>
      </Container>
    </div>
  );
}
