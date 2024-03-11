import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Row,
  Container,
  Col,
  FormLabel,
  FormControl,
  FormText,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function AdminGymInfo() {
  const [gymInfo, setGymInfo] = useState({
    name: "",
    address: "",
    phone: "",
    nit: "",
    map: "",
  });

  const [exists, setExists] = useState(false);

  const fetchInfo = async () => {
    try {
      const { data } = await axios("/api/gym");
      setExists(true);
      setGymInfo(data);
    } catch (error) {
      setExists(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const props = [
    {
      property: "name",
      type: "text",
      value: gymInfo.name || "",
      name: "Nombre",
    },
    {
      property: "address",
      type: "text",
      value: gymInfo.address || "",
      name: "Dirección",
    },
    {
      property: "phone",
      type: "text",
      value: gymInfo.phone || "",
      name: "Teléfono",
    },
    { property: "nit", type: "text", value: gymInfo.nit || "", name: "NIT" },
    {
      property: "map",
      type: "text",
      value: gymInfo.map || "",
      name: "Ubicación",
    },
  ];

  const handleChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    setGymInfo({ ...gymInfo, [prop]: value });
  };

  const handleSubmit = async () => {
    try {
      if (exists) {
        await axios.put("/api/gym/1", gymInfo);
      } else {
        await axios.post("/api/gym", gymInfo);
        setExists(true);
      }
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: "Información actualizada exitosamente",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la información del gimnasio",
      });
    }
  };

  return (
    <Container>
      <Row>
        {props.map((p) => (
          <Col key={p.property} xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">{p.name}</FormLabel>
            <FormControl
              type={p.type}
              name={p.property}
              className="form-control"
              value={p.value}
              onChange={handleChange}
              autoComplete="off"
            />
          </Col>
        ))}
      </Row>
      <Button onClick={handleSubmit}>Actualizar información</Button>
    </Container>
  );
}

export default AdminGymInfo;
