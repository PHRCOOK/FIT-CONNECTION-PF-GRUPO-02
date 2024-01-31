import { useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image } from "react-bootstrap";

export default function AppBar() {
  const location = useLocation();

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
    { path: "/shopping-card", title: "Carrito de compras", show: true },
    { path: "/staff", title: "Conocer staff", show: true },
    { path: "/login", title: "Login", show: true },
    { path: "/sign-up", title: "Registrate", show: true },
  ];

  const links = [];
  for (const linkData of linksData) {
    if (linkData.show) {
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
