import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

export default function AppBar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        name: user.name,
        sub: user.sub,
        email: user.email,
      };
      console.log(userData);
    }
  }, [isAuthenticated, user]);

  const linksData = [
    {
      path: pathroutes.PRODUCT,
      title: "Productos",
      show: location.pathname !== pathroutes.PRODUCT,
    },
    {
      path: pathroutes.SERVICE,
      title: "Servicios",
      show: location.pathname !== pathroutes.SERVICE,
    },
    {
      path: pathroutes.ADMIN,
      title: "Acceso Admin",
      show: location.pathname !== pathroutes.ADMIN,
    },
    {
      path: pathroutes.SHOPPINGCART,
      title: "Carrito de compras",
      show: location.pathname !== pathroutes.SHOPPINGCART,
    },
    {
      path: pathroutes.STAFF,
      title: "Conocer staff",
      show: location.pathname !== pathroutes.STAFF,
    },
    {
      path: pathroutes.REGISTER,
      title: "Registrate",
      show: !isAuthenticated && location.pathname !== pathroutes.REGISTER,
    },
    {
      path: pathroutes.LOGIN,
      title: "Login",
      show: !isAuthenticated && location.pathname !== pathroutes.LOGIN,
    },
    {
      title: "Logout",
      show: isAuthenticated,
      isButton: true,
      onClick: () => {
        if (isAuthenticated) {
          logout({ returnTo: window.location.origin });
        }
      },
    },
  ];

  const navLinks = linksData
    .filter((linkData) => linkData.show && linkData.path)
    .map((linkData) => (
      <LinkContainer key={linkData.path} to={linkData.path}>
        <Nav.Link
          active={location.pathname === linkData.path}
          className={`rounded fw-bold px-2 mx-1 my-md-1 ${
            location.pathname === linkData.path ? "bg-primary" : ""
          }`}
        >
          {linkData.title}
        </Nav.Link>
      </LinkContainer>
    ));

  return (
    <Navbar collapseOnSelect bg="secondary" expand="lg">
      <Container>
        <LinkContainer to={pathroutes.HOME}>
          <Navbar.Brand>
            <Image
              src={logo}
              alt="Home"
              className="border border-2 border-light"
              roundedCircle
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-options" />
        <Navbar.Collapse id="navbar-options">
          <Nav className="ms-auto">
            {navLinks}
            {isAuthenticated && (
              <Button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="rounded fw-bold px-2 mx-1 my-1"
              >
                Logout
              </Button>
            )}
          </Nav>
          {isAuthenticated && (
            <Navbar.Text>
              <a href="#login">{user.name}</a>
            </Navbar.Text>
          )}
          {isAuthenticated && (
            <Image
              src={user.picture}
              alt="Profile"
              className="border border-2 border-light"
              roundedCircle
              style={{ width: "60px", height: "60px" }}
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
