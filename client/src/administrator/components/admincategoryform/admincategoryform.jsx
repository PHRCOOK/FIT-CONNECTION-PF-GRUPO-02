/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postCategory, putCategory } from "../../../redux/action";
import validate from "./validate";

import { FormControl, FormLabel, FormText, Row, Col } from "react-bootstrap";

function admincategoryform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const allCategories = useSelector((state) => state.allCategories);

  useEffect(() => {
    if (params.id) {
      const categoryFiltered = allCategories.filter(
        (category) => params.id === category.id.toString()
      );
      setCategoryForm({
        name: categoryFiltered[0].name,
        status: categoryFiltered[0].status,
        is_service: categoryFiltered[0].is_service,
      });
    }
  }, [params]);

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
    let key = [e.target.name];
    let value = e.target.value;
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
              {params.id ? "Update category" : "Create category"}
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default admincategoryform;
