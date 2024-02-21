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
    logo: "",
    smtp_host: "",
    smtp_port: "",
    smtp_user: "",
    smtp_password: "",
    smtp_tls: "",
    smtp_ssl: "",
  });

  const [exists, setExists] = useState(false);

  const fetchInfo = async () => {
    try {
      const gym = await axios("/api/gym");
      setGymInfo(gym);
      setExists(true);
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Aun no se ha creado el gimnasio",
      //   text: "Por favor, introduce la informacion del gimnasio",
      // });
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // useEffect(() => {
  //   console.log(gymInfo);
  // }, [gymInfo]);

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
      name: "Direccion",
    },
    {
      property: "phone",
      type: "text",
      value: gymInfo.phone || "",
      name: "Teléfono",
    },
    { property: "nit", type: "text", value: gymInfo.nit || "", name: "NIT" },
    { property: "logo", type: "text", value: gymInfo.logo || "", name: "Logo" },
    {
      property: "smtp_host",
      type: "text",
      value: gymInfo.smtp_host || "",
      name: "smtp_host",
    },
    {
      property: "smtp_port",
      type: "number",
      value: gymInfo.smtp_port || "",
      name: "smtp_port",
    },
    {
      property: "smtp_user",
      type: "text",
      value: gymInfo.smtp_user || "",
      name: "smtp_user",
    },
    {
      property: "smtp_password",
      type: "text",
      value: gymInfo.smtp_password || "",
      name: "smtp_password",
    },
    {
      property: "smtp_tls",
      type: "text",
      value: gymInfo.smtp_tls || "",
      name: "smtp_tls",
    },
    {
      property: "smtp_ssl",
      type: "text",
      value: gymInfo.smtp_ssl || "",
      name: "smtp_ssl",
    },
  ];
  const handleChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    setGymInfo({ ...gymInfo, [prop]: value });
  };

  const handleSubmit = async () => {
    console.log(gymInfo);
    try {
      if (exists) {
        await axios.put("/api/gym/1", gymInfo);
      } else {
        await axios.post("/api/gym", gymInfo);
      }
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: "Informacion actualizada exitosamente",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la informacion del gimnasio",
      });
    }
  };
  return (
    <Container>
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
          {/* {errors.stock && (
          <FormText className="form-text">{errors.stock}</FormText>
        )} */}
        </Col>
      ))}
      <Button onClick={handleSubmit}>Actualizar información</Button>
    </Container>
  );
}

export default AdminGymInfo;
