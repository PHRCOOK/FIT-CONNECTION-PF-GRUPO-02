import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

const AppBar = () => {
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated, user, getIdTokenClaims } =
    useAuth0();
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const getUserMetadata = async () => {
      const claims = await getIdTokenClaims();

      if (isAuthenticated) {
        console.log(`User email: ${user.email}`);
        console.log(`User sub: ${claims.sub}`);
        console.log(`User given_name: ${user.given_name}`);
      }

      const roles = claims["https://pabloelleproso.us.auth0.com/roles"] || [];
      const userIsAdmin = roles.includes("admin");
      setIsAdmin(userIsAdmin);
      console.log(`Is user admin? ${userIsAdmin}`);
    };

    if (user) {
      getUserMetadata();
    }
  }, [user, getIdTokenClaims, isAuthenticated]);

  const createUserHandler = async (fullname, email) => {
    // Utilizando Axios para hacer la solicitud HTTP
    try {
      const response = await axios.post("http://localhost:5173/register", {
        fullname,
        email,
      });

      // Puedes manejar la respuesta según tus necesidades.
      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
    }
  };

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
      show: isAuthenticated && location.pathname === pathroutes.PRODUCT,
    },
    {
      path: pathroutes.SHOPPINGCART,
      title: "Carrito de compras",
      show: isAuthenticated && location.pathname !== pathroutes.SHOPPINGCART,
    },
    { path: pathroutes.STAFF, title: "Conocer staff", show: true },
    {
      title: isAuthenticated ? "Logout" : "Login",
      show: true,
      onClick: isAuthenticated
        ? () => logout({ returnTo: window.location.origin })
        : () => loginWithRedirect(),
      isButton: true,
    },
    {
      path: pathroutes.REGISTER,
      title: "Registrate",
      show: !isAuthenticated,
      onClick: () => {
        const { given_name: fullname, email } = user;
        createUserHandler(fullname, email);
      },
    },
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
};

export default AppBar;
