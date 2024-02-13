/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postInstructor, putInstructor } from "../../../redux/action";
import validate from "./validate";

import { FormControl, FormLabel, FormText, Row, Col } from "react-bootstrap";

function admininstructorform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const allInstructors = useSelector((state) => state.allInstructors);

  useEffect(() => {
    if (params.id) {
      const instructorFiltered = allInstructors.filter(
        (instructor) => params.id === instructor.id.toString()
      );
      setInstructorForm({
        fullname: instructorFiltered[0].fullname,
        photo: instructorFiltered[0].photo,
        description: instructorFiltered[0].description,
        status: instructorFiltered[0].status,
      });
    }
  }, [params]);

  const [instructorForm, setInstructorForm] = useState({
    fullname: "",
    photo: "",
    description: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await dispatch(putInstructor(params.id, instructorForm));
        window.alert("Instructor modificado exitosamente");
      } else {
        await dispatch(postInstructor(instructorForm));
        window.alert("Instructor creado exitosamente");
      }

      setInstructorForm({
        fullname: "",
        photo: "",
        description: "",
        status: "",
      });
      navigate("/admin/instructors");
    } catch (error) {
      window.alert(error);
    }
  };

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;
    setInstructorForm({ ...instructorForm, [key]: value });
    setErrors(validate({ ...instructorForm, [key]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fs-4 mb-3 fw-bold text-center">
          {params.id ? "Modificacion de instructor" : "Creación de instructor"}
        </div>
        <Row>
          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Fullname</FormLabel>
            <FormControl
              type="text"
              name="fullname"
              className="form-control"
              value={instructorForm.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <FormText className="form-text">{errors.fullname}</FormText>
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

          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Photos</FormLabel>
            <FormControl
              type="text"
              name="photo"
              className="form-control"
              value={instructorForm.photo}
              onChange={handleChange}
            />
            {errors.photo && (
              <FormText className="form-text">{errors.photo}</FormText>
            )}
          </Col>

          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Description</FormLabel>
            <FormControl
              as="textarea"
              name="description"
              className="form-control"
              value={instructorForm.description}
              onChange={handleChange}
            />
            {errors.description && (
              <FormText className="form-text">{errors.description}</FormText>
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
              {params.id ? "Update instructor" : "Create instructor"}
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default admininstructorform;
