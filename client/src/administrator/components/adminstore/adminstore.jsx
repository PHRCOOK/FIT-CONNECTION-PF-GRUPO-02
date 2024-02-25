import React, { useState } from "react";
import { Container, Row, Col, Offcanvas, Button, Form } from "react-bootstrap";
import Filters from "../../../components/filters/filters";
import Cards from "../../../components/cards/cards";
import Page from "../../../components/page/page";
import { useNavigate } from "react-router-dom";
import pathroutes from "../../../components/helpers/pathroutes";

function Store() {
  const [show, setShow] = useState(false);
  const [statusSelection, setStatusSelection] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleStatusSelect = (event) => {
    const status = event.target.value === "true";
    setStatusSelection(status);
  };

  return (
    <div>
      <div className="fs-4 mb-3 fw-bold text-center">Productos</div>
      <Row>
        <Col>
          <div className="mb-3">
            <label htmlFor="statusSelect" className="form-label">
              Seleccionar estado
            </label>
            <Form.Select
              id="statusSelect"
              name="statusSelect"
              onChange={handleStatusSelect}
              value={statusSelection.toString()}
            >
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
      <Button
        className="d-md-none btn btn-primary"
        variant="primary"
        onClick={handleShow}
      >
        Buscar Productos
      </Button>

      <Button
        variant="primary"
        onClick={() => {
          navigate(pathroutes.CREATE_PRODUCT);
        }}
      >
        Crear Producto
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
            <Cards statusSelection={statusSelection} />
          </Container>
        </Col>
      </Row>
      <Page />
    </div>
  );
}

export default Store;
