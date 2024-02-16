import React from "react";
import Filters from "../../../components/filters/filters";
import Cards from "../../../components/cards/cards";
import Page from "../../../components/page/page";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";

function Store() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="fs-4 mb-3 fw-bold text-center">Nuestros Productos</div>
      <Button
        className="d-md-none btn btn-primary"
        variant="primary"
        onClick={handleShow}
      >
        Buscar Productos
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Filters />
        </Offcanvas.Body>
      </Offcanvas>
      <Row>
        <Col className="d-none d-md-block" xs="2">
          <Filters />
        </Col>
        <Col>
          <Container>
            <Cards />
          </Container>
        </Col>
      </Row>
      <Page />
    </div>
  );
}

export default Store;
