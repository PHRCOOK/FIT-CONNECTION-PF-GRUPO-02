/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  postCategory,
  putCategory,
  getAllCategories,
} from "../../../redux/action";
import validate from "./validate";

import { FormControl, FormLabel, FormText, Row, Col } from "react-bootstrap";

function Admincategoryform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const allCategories = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (params.id && allCategories.length) {
      const categoryFiltered = allCategories.filter(
        (category) => params.id === category.id.toString()
      );
      setCategoryForm({
        name: categoryFiltered[0].name,
        status: categoryFiltered[0].status,
        is_service: categoryFiltered[0].is_service,
      });
    }
  }, [params, allCategories]);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    status: "",
    is_service: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await dispatch(putCategory(params.id, categoryForm));
        window.alert("Categoria modificada exitosamente");
      } else {
        await dispatch(postCategory(categoryForm));
        window.alert("Categoria creada exitosamente");
      }
      setCategoryForm({
        name: "",
        status: "",
        is_service: "",
      });
      navigate("/admin/categories");
    } catch (error) {
      window.alert(error);
    }
  };

  const handleChange = (e) => {
    // console.log(categoryForm);
    let key = [e.target.name];
    let value = e.target.value;
    console.log(value);
    setCategoryForm({ ...categoryForm, [key]: value });
    setErrors(validate({ ...categoryForm, [key]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fs-4 mb-3 fw-bold text-center">
          {params.id ? "Modificacion de categoria" : "Creación de categoria"}
        </div>
        <Row>
          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Nombre de la categoría</FormLabel>
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
            <FormLabel className="form-label">Está disponible?</FormLabel>
            <select
              name="status"
              className="form-control"
              onChange={handleChange}
              value={categoryForm.status}
            >
              <option value="" disabled hidden>
                --
              </option>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
            {errors.status && (
              <FormText className="form-text">{errors.status}</FormText>
            )}
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Es un servicio?</FormLabel>
            <select
              name="is_service"
              className="form-control"
              onChange={handleChange}
              value={categoryForm.is_service}
            >
              <option value="" disabled hidden>
                --
              </option>
              <option value="true">Si</option>
              <option value="false">No</option>
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
              {params.id ? "Actualizar categoría" : "Crear categoría"}
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default Admincategoryform;
