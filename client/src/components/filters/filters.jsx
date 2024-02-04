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
  Accordion
} from "react-bootstrap";
import deleteUndefined from "./deleteUndefined";

function Filters() {
  // const categories = categoriesDemo;
  const categories = useSelector((state) => state.allCategories);
  const filterSettings = useSelector((state) => state.filterSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());

    const settingsToApply = { ...filterSettings };

    deleteUndefined(settingsToApply);

    dispatch(applySettings(settingsToApply));
  }, []);

  const handleFilter = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    let settingsToApply = { ...filterSettings };

    settingsToApply = { ...settingsToApply, [key]: value || "" };

    deleteUndefined(settingsToApply);

    dispatch(applySettings(settingsToApply));
  };

  const handleReset = () => {
    dispatch(resetSettings());
    // dispatch(applySettings(filterSettings));
  };

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>¡Encuentra nuestros productos!</Accordion.Header>
          <Accordion.Body>
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
            <Button variant="primary" onClick={handleReset}>
              Reset Filters
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default Filters;
