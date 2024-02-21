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

  // useEffect(() => {
  //   console.log(gymInfo);
  // }, [gymInfo]);

  const [exists, setExists] = useState(false);

  const fetchInfo = async () => {
    try {
      console.log("vvvvvvvvvvvv");
      const { data } = await axios("/api/gym");
      setExists(true);
      setGymInfo(data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    console.log(gymInfo);
  }, [gymInfo]);

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
    {
      property: "map",
      type: "text",
      value: gymInfo.map || "",
      name: "Ubicacion",
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
