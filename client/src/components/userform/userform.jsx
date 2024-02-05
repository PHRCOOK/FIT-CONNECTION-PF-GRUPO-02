/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import { FormControl, FormLabel, FormText, Row, Col, Button, Card } from "react-bootstrap";

import { postUser } from "../../redux/action";

export default function userform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postUser(form));
      window.alert("Usuario registrado correctamente.");
      setForm({
        fullname: "",
        email: "",
        password: "",
      });
      navigate("/product");
    } catch (error) {
      window.alert(error);
    }
  };

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;
    setForm({ ...form, [key]: value });
    setErrors(validate({ ...form, [key]: value }));
  };

  return (
    <Row className="justify-content-center">
      <Col xs="12" md="6" lg="4" >
        <Card className="bg-success">
          <Card.Body className="m-3">
            <Card.Title className="fs-4 mb-3 fw-bold text-center">Formulario de Registro</Card.Title>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs="12" className="my-3">
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl
                    name="fullname"
                    placeholder="Enter a name..."
                    type="text"
                    value={form.fullname}
                    onChange={handleChange}
                  />
                  {errors.fullname && <FormText>{errors.fullname}</FormText>}
                </Col>
                <Col xs="12" className="my-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    name="email"
                    placeholder="Enter an email..."
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <FormText>{errors.email}</FormText>}
                </Col>
                <Col xs="12" className="my-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    name="password"
                    placeholder="Enter a password..."
                    type="text"
                    value={form.password}
                    onChange={handleChange}
                  />
                  {errors.password && <FormText>{errors.password}</FormText>}
                </Col>
              </Row>
            </form>
            <Button className="my-3" disabled={Object.values(form).some((value) => value === "")}>
              Registrarse
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* <div>
          <label>FULLNAME</label>
          <input
            name="fullname"
            placeholder="Enter a name..."
            type="text"
            value={form.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p>{errors.fullname}</p>}
        </div> */}
      {/* <div>
          <label>EMAIL</label>
          <input
            name="email"
            placeholder="Enter an email..."
            type="text"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div> */}
      {/* <div>
          <label>PASSWORD</label>
          <input
            name="password"
            placeholder="Enter a password..."
            type="text"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div> */}

      {/* <button
          type="submit"
          disabled={Object.values(form).some((value) => value === "")}
        >
          REGISTER
        </button> */}
    </Row>
  );
}
