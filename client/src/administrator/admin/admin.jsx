import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../../components/helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

export default function AppBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, user, getIdTokenClaims } =
    useAuth0();

  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((claims) => {
        const isUserAdmin =
          claims["https://YOUR_NAMESPACE/roles"].includes("admin");
        setIsAdmin(isUserAdmin);
        if (isUserAdmin) {
          navigate(pathroutes.ADMIN);
        }
      });
    }
  }, [isAuthenticated, getIdTokenClaims, navigate]);

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
    { path: pathroutes.REGISTER, title: "Registrate", show: !isAuthenticated },
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

  const buttons = linksData
    .filter((linkData) => linkData.isButton)
    .map((linkData) => (
      <Button
        key={linkData.title}
        onClick={linkData.onClick}
        className={`rounded fw-bold px-2 mx-1 my-md-1 ${
          location.pathname === linkData.path ? "bg-primary" : ""
        }`}
      >
        {linkData.title}
      </Button>
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
            {buttons}
          </Nav>
          {isAuthenticated && (
            <React.Fragment>
              <Image
                src={user.picture}
                alt="Profile"
                className="border border-2 border-light"
                roundedCircle
              />
              <Navbar.Text className="ms-2">
                Signed in as:{" "}
                <a href="#login">
                  {isAdmin ? `${user.name} (Admin)` : user.name}
                </a>
              </Navbar.Text>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}