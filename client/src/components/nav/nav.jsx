import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

export default function AppBar() {
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const linksData = [
    {
      path: pathroutes.PRODUCT,
      title: "Productos",
      show: location.pathname !== pathroutes.PRODUCT,
    },
    { path: pathroutes.SERVICE, title: "Servicios", show: true },
    {
      path: pathroutes.FORMPRODUCT,
      title: "Crear productos",
      show: location.pathname === pathroutes.PRODUCT,
    },
    { path: pathroutes.SHOPPINGCART, title: "Carrito de compras", show: true },
    { path: pathroutes.STAFF, title: "Conocer staff", show: true },
    {
      title: isAuthenticated ? "Logout" : "Login",
      show: true,
      onClick: isAuthenticated
        ? () => logout({ returnTo: window.location.origin })
        : () => loginWithRedirect(),
      isButton: true,
    },
    { path: pathroutes.REGISTER, title: "Registrate", show: !isAuthenticated }, // Aquí se agrega la condición
  ];

  const links = [];
  for (const linkData of linksData) {
    if (linkData.show) {
      const active = location.pathname === linkData.path;
      if (linkData.isButton) {
        links.push(
          <Button
            key={linkData.title}
            onClick={linkData.onClick}
            className={`rounded fw-bold px-2 mx-1 my-md-1 ${
              active ? "bg-primary" : ""
            }`}
          >
            {linkData.title}
          </Button>
        );
      } else {
        links.push(
          <LinkContainer key={linkData.path} to={linkData.path}>
            <Nav.Link
              active={active}
              className={`rounded fw-bold px-2 mx-1 my-md-1 ${
                active ? "bg-primary" : ""
              }`}
            >
              {linkData.title}
            </Nav.Link>
          </LinkContainer>
        );
      }
    }
  }

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
          <Nav className="ms-auto">{links}</Nav>
          {isAuthenticated && (
            <>
              <Image
                src={user.picture}
                alt="Profile"
                className="border border-2 border-light"
                roundedCircle
              />
              <Navbar.Text className="ms-2">
                Signed in as: <a href="#login">{user.name}</a>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
