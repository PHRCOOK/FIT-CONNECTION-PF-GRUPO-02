import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="footer">
      <div className="social-media-buttons">
        <a
          href="https://www.facebook.com/tuPagina"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://wa.me/tuNumero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a
          href="https://www.instagram.com/tuPagina"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <div className="contact-info">
        <p>Contacto: +54 011 - 156 - 809032</p>
        <p>Dirección: Valle del sol 2541 - BUENOS AIRES - ARGENTINA</p>
        <p>PROYECTO FINAL SOY HENRY PT-15B GRUPO - 02</p>
      </div>
    </div>
  );
}
