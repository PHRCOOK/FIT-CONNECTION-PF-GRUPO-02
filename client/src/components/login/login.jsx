import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Image } from "react-bootstrap";
import logo from "../img/logo.jpg";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container
      className="d-flex flex-column justify-content-start align-items-center"
      style={{ height: "100vh", paddingTop: "20vh" }}
    >
      <Image
        src={logo}
        alt="Company Logo"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />

      <Button onClick={() => loginWithRedirect()} style={{ marginTop: "20px" }}>
        Iniciar Sesion
      </Button>
    </Container>
  );
}
