import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import validate from "./validate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postMembership, putMembership } from "../../../redux/action";
import Swal from "sweetalert2";

const AdminServicesForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const allMemberships = useSelector((state) => state.allMemberships);

  const [membershipForm, setMembershipForm] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    status: "",
    image_url: "",
  });

  useEffect(() => {
    if (params.id) {
      const membershipFiltered = allMemberships.find(
        (membership) => params.id === membership.id.toString()
      );
      setMembershipForm({
        ...membershipForm,
        name: membershipFiltered.name,
        price: membershipFiltered.price,
        duration: membershipFiltered.duration,
        description: membershipFiltered.description,
        status: membershipFiltered.status,
        image_url: membershipFiltered.image_url,
      });
    }
  }, [params, allMemberships]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setMembershipForm({ ...membershipForm, [e.target.name]: e.target.value });
    setErrors(validate({ ...membershipForm, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (!e.target.files.length) {
      Swal.fire("Error", "Selecciona un archivo", "error");
      return;
    }
    let selected = e.target.files[0];
    const types = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpg",
      "image/svg",
      "image/svg+xml",
      "image/webp",
    ];

    if (selected && types.includes(selected.type)) {
      setMembershipForm({ ...membershipForm, image_url: selected });
    } else {
      Swal.fire("Error", "Selecciona un archivo de tipo imagen", "error");
      setMembershipForm({ ...membershipForm, image_url: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationsErrors = validate(membershipForm);
    if (Object.keys(validationsErrors).length === 0) {
      try {
        const formData = new FormData();
        Object.keys(membershipForm).forEach((key) => {
          formData.append(key, membershipForm[key]);
        });

        if (params.id) {
          dispatch(putMembership(params.id, formData));
          Swal.fire({
            title: "Membresia actualizada con éxito",
            icon: "success",
          }).then(() => {
            navigate("/admin/membership");
          });
        } else {
          dispatch(postMembership(formData));
          Swal.fire({
            title: "Membresia creada con éxito",
            icon: "success",
          }).then(() => {
            navigate("/admin/membership");
          });
        }

        setMembershipForm({
          name: "",
          price: "",
          duration: "",
          description: "",
          status: "",
          image_url: "",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    } else {
      setErrors(validationsErrors);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{params.id ? "Editar" : "Crear"} Membresías</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={membershipForm.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={membershipForm.price}
                onChange={handleChange}
              />
              {errors.price && (
                <Form.Text className="text-danger">{errors.price}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duracion</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={membershipForm.duration}
                onChange={handleChange}
              />
              {errors.duration && (
                <Form.Text className="text-danger">{errors.duration}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={membershipForm.description}
                onChange={handleChange}
              />
              {errors.description && (
                <Form.Text className="text-danger">
                  {errors.description}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="status"
                defaultValue={"DEFAULT"}
                onChange={handleChange}
              >
                <option value="DEFAULT" disabled hidden>
                  --
                </option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Form.Control>
              {errors.status && (
                <Form.Text className="text-danger">{errors.status}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="image_url"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button type="submit">
              {params.id ? "Editar" : "Crear"} Membresía
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminServicesForm;
