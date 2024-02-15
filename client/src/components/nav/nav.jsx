import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

export default function AppBar() {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const getUserMetadata = async () => {
      console.log("User Info:", {
        name: user.name,
        sub: user.sub,
        email: user.email,
      });
    };

    if (user) {
      getUserMetadata();
    }
  }, [user]);

  const linksData = [
    {
      path: pathroutes.PRODUCT,
      title: "Productos",
      show: true,
    },
    { path: pathroutes.SERVICE, title: "Servicios", show: true },
    {
      path: pathroutes.ADMIN,
      title: "Acceso Admin",
      show: true,
    },
    { path: pathroutes.SHOPPINGCART, title: "Carrito de compras", show: true },
    { path: pathroutes.STAFF, title: "Conocer staff", show: true },
    {
      title: isAuthenticated ? "Logout" : "Login",
      show: true,
      onClick: isAuthenticated
        ? () => logout({ returnTo: window.location.origin })
        : () => navigate(pathroutes.LOGIN), // Use navigate instead of history
      isButton: true,
    },
    { path: pathroutes.REGISTER, title: "Registrate", show: !isAuthenticated },
  ];

  if (isAdmin) {
    linksData.push({
      path: pathroutes.ADMIN,
      title: "Admin",
      show: true,
    });
  }

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
        className={`rounded fw-bold px-2 mx-1 my-1 ${
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
            <div className="my-1">
              <Navbar.Text className="mx-3">
                Signed in as: <a href="#login">{user.name}</a>
              </Navbar.Text>
              <Image
                src={user.picture}
                alt="Profile"
                className="avatar border border-2 border-light"
                roundedCircle
              />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
