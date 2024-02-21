import React from "react";
import Filters from "../components/filters/filters";
import AppCards from "../components/cards/cards";
import Page from "../components/page/page";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Store() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [show, setShow] = useState(false);
  const totalPages = useSelector((state) => state.totalPages);

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
            <AppCards statusSelection={true} />
          </Container>
        </Col>
      </Row>
      {totalPages > 1 && <Page />}
    </div>
  );
}

export default Store;
