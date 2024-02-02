import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  applySettings,
  resetSettings,
} from "../../redux/action";
import {
  Container,
  Row,
  Col,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
  Modal,
} from "react-bootstrap";
import deleteUndefined from "./deleteUndefined";

function Filters() {
  const categories = categoriesDemo;

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Filtrar y Ordenar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs="12" md="6" className="py-1">
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <FormControl
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                onChange={handleFilter}
                value={filterSettings.name || ""}
              />
            </Col>
            <Col xs="12" md="6" className="py-1">
              <FormLabel htmlFor="code">Codigo</FormLabel>
              <FormControl
                id="code"
                name="code"
                type="text"
                autoComplete="off"
                onChange={handleFilter}
                value={filterSettings.code || ""}
              />
            </Col>
            <Col xs="12" md="6" className="py-1">
              <div>
                <FormLabel htmlFor="valorMinimo">Valor mínimo</FormLabel>
                <FormControl
                  type="number"
                  id="minPrice"
                  key="minPrice"
                  name="minPrice"
                  value={filterSettings.minPrice || ""}
                  onChange={handleFilter}
                />
              </div>
            </Col>
            <Col xs="12" md="6" className="py-1">
              <FormLabel htmlFor="valorMaximo">Valor máximo</FormLabel>
              <FormControl
                type="number"
                id="maxPrice"
                key="maxPrice"
                name="maxPrice"
                value={filterSettings.maxPrice || ""}
                onChange={handleFilter}
              />
            </Col>
            <Col xs="12" md="6" className="py-2">
              <span className="fw-bold">Categorias</span>
              {categories.map((category, index) => {
                if (!category.is_service) {
                  return (
                    <div key={index}>
                      <FormCheck
                        type="radio"
                        id={category.id}
                        name="category_id"
                        value={category.id}
                        label={category.name}
                        checked={
                          Number(filterSettings.category_id) === category.id
                        }
                        onChange={handleFilter}
                      />
                    </div>
                  );
                }
              })}
            </Col>
            <Col xs="12" md="6" className="py-2">
              <span className="fw-bold">Orden</span>
              <div key="ASC">
                <FormCheck
                  type="radio"
                  id="ASC"
                  name="sortOrder"
                  label="Ascendente"
                  value="ASC"
                  checked={filterSettings.sortOrder === "ASC"}
                  onChange={handleFilter}
                />
              </div>
              <div key="DESC">
                <FormCheck
                  type="radio"
                  id="DESC"
                  label="Descendente"
                  name="sortOrder"
                  value="DESC"
                  checked={filterSettings.sortOrder === "DESC"}
                  onChange={handleFilter}
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReset}>
            Reset Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Filters;
