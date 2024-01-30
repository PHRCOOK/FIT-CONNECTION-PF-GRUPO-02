import { useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image } from "react-bootstrap";

export default function AppBar() {
  const location = useLocation();

  const linksData = [
    { path: pathroutes.PRODUCT, title: "Productos" },
    { path: pathroutes.SERVICE, title: "Servicios" },
    { path: pathroutes.FORMPRODUCT, title: "Crear productos" },
    { path: "/shopping-card", title: "Carrito de compras" },
    { path: "/staff", title: "Conocer staff" },
    { path: "/login", title: "Login" },
    { path: "/sign-up", title: "Registrate" },
  ];

  const links = [];
  for (const linkData of linksData) {
    const active = location.pathname === linkData.path;
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
