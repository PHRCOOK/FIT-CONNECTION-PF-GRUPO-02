import React, { useEffect, useState } from "react";
import { fetchUserInfo, postUserInfo, putUserInfo } from "../../redux/action";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  FormLabel,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { setUserShopping } from "../../redux/action";
import axios from "axios";

function UserDetails({ user_id, name, setName }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [newUserInfo, setNewUserInfo] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const currentUser = useSelector((state) => state.userShopping);

  useEffect(() => {
    dispatch(fetchUserInfo(user_id));
  }, [user_id]);

  useEffect(() => {
    setNewUserInfo({ ...userInfo, id: user_id });
    userInfo;
  }, [userInfo]);

  useEffect(() => {
    currentUser;
    newUserInfo;
    const checkInfo = !(
      newUserInfo.address &&
      newUserInfo.phone &&
      newUserInfo.dni &&
      newUserInfo.birth_date
    );
    setIsButtonDisabled(checkInfo);
  }, [newUserInfo]);

  const handleUserInfo = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    if (key === "name") {
      setName(value);
      name;
    }

    // ({ ...newUserInfo, [key]: value, id: user_id });
    setNewUserInfo({ ...newUserInfo, [key]: value, id: user_id });
  };

  const handleSaveChanges = async (event) => {
    userInfo;

    try {
      if (userInfo.exists) {
        await dispatch(putUserInfo(newUserInfo));
      } else {
        await dispatch(postUserInfo(newUserInfo));
      }

      await axios.put(`/api/users/${user_id}`, { name });

      await Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: "Información modificada exitosamente",
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Container>
      <Card className="p-5">
        <Row>
          <Col>
            {/* <label htmlFor="nombre-profile">Nombre</label>
          <input id="nombre-profile" type="text" /> */}

            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormControl
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              onChange={handleUserInfo}
              value={name || ""}

              // value={filterSettings.name || ""}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <label htmlFor="direccion-profile">Direccion</label>
          <input id="direccion-profile" type="text" /> */}

            <FormLabel htmlFor="address">Dirección</FormLabel>
            <FormControl
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              onChange={handleUserInfo}
              value={newUserInfo.address || ""}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <label htmlFor="telefono-profile">Telefono</label>
          <input id="telefono-profile" type="tel" /> */}

            <FormLabel htmlFor="phone">Teléfono</FormLabel>
            <FormControl
              id="phone"
              name="phone"
              type="tel"
              autoComplete="off"
              onChange={handleUserInfo}
              value={newUserInfo.phone || ""}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <label htmlFor="dni-profile">DNI</label>
          <input id="dni-profile" type="number" /> */}

            <FormLabel htmlFor="dni">DNI</FormLabel>
            <FormControl
              id="dni"
              name="dni"
              type="number"
              autoComplete="off"
              onChange={handleUserInfo}
              value={newUserInfo.dni || ""}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <label htmlFor="fechaNacimineto-profile">Fecha de Nacimiento</label>
          <input id="fechaNacimineto-profile" type="date" /> */}

            <FormLabel htmlFor="birth_date">Fecha de nacimiento</FormLabel>
            <FormControl
              id="birth_date"
              name="birth_date"
              type="date"
              autoComplete="off"
              onChange={handleUserInfo}
              value={newUserInfo.birth_date || ""}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              disabled={isButtonDisabled}
              className="bt-primary my-5"
              size="lg"
              onClick={handleSaveChanges}
            >
              Guardar cambios
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default UserDetails;

