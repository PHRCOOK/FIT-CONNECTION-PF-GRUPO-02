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
  FormSelect,
  Button,
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

    settingsToApply = { ...settingsToApply, [key]: value || "", page: 1 };

    deleteUndefined(settingsToApply);

    dispatch(applySettings(settingsToApply));
  };

  const handleReset = () => {
    dispatch(resetSettings());
    // dispatch(applySettings(filterSettings));
  };

  return (
    <Container>
      <Row>
        <Col xs="12" className="py-1">
          <FormLabel className="fw-bold" htmlFor="name">
            Nombre
          </FormLabel>
          <FormControl
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            onChange={handleFilter}
            value={filterSettings.name || ""}
          />
        </Col>
        <Col xs="12" className="py-1 fw-bold">
          <FormLabel htmlFor="code">Brand</FormLabel>
          <FormControl
            id="brand"
            name="brand"
            type="text"
            autoComplete="off"
            onChange={handleFilter}
            value={filterSettings.brand || ""}
          />
        </Col>
        <Col xs="12" className="py-1">
          <div>
            <FormLabel className="fw-bold" htmlFor="valorMinimo">
              Valor mínimo
            </FormLabel>
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
        <Col xs="12" className="py-1">
          <FormLabel className="fw-bold" htmlFor="valorMaximo">
            Valor máximo
          </FormLabel>
          <FormControl
            type="number"
            id="maxPrice"
            key="maxPrice"
            name="maxPrice"
            value={filterSettings.maxPrice || ""}
            onChange={handleFilter}
          />
        </Col>
        <span className="fw-bold">Categorias</span>
        <Col xs="12" className="py-2">
          <FormSelect
            onChange={handleFilter}
            aria-label="Default select example"
            name="category_id"
          >
            <option value="">Selecciona una categoría</option>
            {categories
              .filter((category) => category.status === true)
              .map((category) => {
                if (!category.is_service) {
                  return (
                    <option
                      key={category.id}
                      id={category.id}
                      name="category_id"
                      value={category.id}
                      // value={
                      //   Number(filterSettings.category_id) === category.id
                      // }
                    >
                      {category.name}
                    </option>
                  );
                }
              })}
          </FormSelect>
        </Col>
        <Col xs="12" className="py-2">
          <span className="fw-bold">Orden por precio</span>
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
        Limpiar filtros
      </Button>
    </Container>
  );
}

export default Filters;
