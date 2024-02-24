/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import Swal from "sweetalert2";
import {
  FormControl,
  FormLabel,
  FormText,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";

import { postUser } from "../../redux/action";

export default function UserForm() {
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
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: "Usuario registrado correctamente",
      });
      setForm({
        fullname: "",
        email: "",
        password: "",
      });
      navigate("/product");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en el registro de usuario",
      });
    }
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [key]: value });
    setErrors(validate({ ...form, [key]: value }));
  };

  return (
    <Row className="justify-content-center">
      <Col xs="12" md="6" lg="4">
        <Card>
          <Card.Body className="m-3">
            <Card.Title className="fs-4 mb-3 fw-bold text-center">
              Formulario de Registro
            </Card.Title>
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
              <Button
                className="my-3"
                type="submit"
                disabled={Object.values(form).some((value) => value === "")}
              >
                Registrarse
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
