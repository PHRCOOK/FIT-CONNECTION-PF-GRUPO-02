/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postCategory } from "../../../redux/action";

import { FormControl, FormLabel, FormText, Row, Col } from "react-bootstrap";

function admincategoryform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    status: "",
    is_service: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCategory(categoryForm));
    window.alert("Categoria creada exitosamente");
    setCategoryForm({
      name: "",
      status: "",
      is_service: "",
    });
    navigate("/admin/categories");
  };

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;
    setCategoryForm({ ...categoryForm, [key]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fs-4 mb-3 fw-bold text-center">
          Creación de CATEGORIA
        </div>
        <Row>
          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Name</FormLabel>
            <FormControl
              type="text"
              name="name"
              className="form-control"
              value={categoryForm.name}
              onChange={handleChange}
            />
            {errors.name && (
              <FormText className="form-text">{errors.name}</FormText>
            )}
          </Col>

          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Status</FormLabel>
            <select
              name="status"
              className="form-control"
              defaultValue={"DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled hidden>
                --
              </option>
              <option>TRUE</option>
              <option>FALSE</option>
            </select>
            {errors.status && (
              <FormText className="form-text">{errors.status}</FormText>
            )}
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Service</FormLabel>
            <select
              name="is_service"
              className="form-control"
              defaultValue={"DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled hidden>
                --
              </option>
              <option>TRUE</option>
              <option>FALSE</option>
            </select>
            {errors.status && (
              <FormText className="form-text">{errors.status}</FormText>
            )}
          </Col>

          <Col xs="12" className="pb-3">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={Object.values(categoryForm).some(
                (value) => value === ""
              )}
            >
              CREAR
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default admincategoryform;
