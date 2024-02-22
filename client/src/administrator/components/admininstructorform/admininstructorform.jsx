/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  postInstructor,
  putInstructor,
  getAllInstructors,
} from "../../../redux/action";
import validate from "./validate";

import {
  FormControl,
  FormLabel,
  FormText,
  Row,
  Col,
  Container,
} from "react-bootstrap";

function AdminInstructorForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const allInstructors = useSelector((state) => state.allInstructors);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  useEffect(() => {
    if (params.id && allInstructors.length) {
      const instructorFiltered = allInstructors.find(
        (instructor) => params.id === instructor.id.toString()
      );
      if (instructorFiltered) {
        setInstructorForm({
          fullname: instructorFiltered.fullname,
          photo: instructorFiltered.photo,
          description: instructorFiltered.description,
          status: instructorFiltered.status,
        });
      }
    }
  }, [params, allInstructors]);

  const [instructorForm, setInstructorForm] = useState({
    fullname: "",
    photo: "",
    description: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(instructorForm));
    if (Object.keys(errors).length === 0) {
      try {
        if (params.id) {
          await dispatch(putInstructor(params.id, instructorForm));
          Swal.fire("¡Éxito!", "Instructor modificado exitosamente", "success");
        } else {
          await dispatch(postInstructor(instructorForm));
          Swal.fire("¡Éxito!", "Instructor creado exitosamente", "success");
        }
        navigate("/admin/instructor");
      } catch (error) {
        let errorMessage = "Algo salió mal!";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        Swal.fire("Error", errorMessage, "error");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructorForm({ ...instructorForm, [name]: value });
    setErrors(validate({ ...instructorForm, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fs-4 mb-3 fw-bold text-center">
          {params.id ? "Modificación de Instructor" : "Creación de Instructor"}
        </div>
        <Container>
          <Row>
            <Col xs="12" className="pb-3">
              <FormLabel className="form-label">Nombre completo</FormLabel>
              <FormControl
                type="text"
                name="fullname"
                className="form-control"
                value={instructorForm.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <FormText className="text-danger">{errors.fullname}</FormText>
              )}
            </Col>
            <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
              <FormLabel className="form-label">¿Está disponible?</FormLabel>
              <select
                name="status"
                className="form-control"
                value={String(instructorForm.status)}
                onChange={handleChange}
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              {errors.status && (
                <FormText className="text-danger">{errors.status}</FormText>
              )}
            </Col>
            <Col xs="12" className="pb-3">
              <FormLabel className="form-label">Foto</FormLabel>
              <FormControl
                type="text"
                name="photo"
                className="form-control"
                value={instructorForm.photo}
                onChange={handleChange}
              />
              {errors.photo && (
                <FormText className="text-danger">{errors.photo}</FormText>
              )}
            </Col>
            <Col xs="12" className="pb-3">
              <FormLabel className="form-label">Descripción</FormLabel>
              <FormControl
                as="textarea"
                name="description"
                className="form-control"
                value={instructorForm.description}
                onChange={handleChange}
              />
              {errors.description && (
                <FormText className="text-danger">
                  {errors.description}
                </FormText>
              )}
            </Col>
            <Col xs="12" className="pb-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={Object.values(instructorForm).some(
                  (value) => value === ""
                )}
              >
                {params.id ? "Actualizar Instructor" : "Crear Instructor"}
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
}

export default AdminInstructorForm;
