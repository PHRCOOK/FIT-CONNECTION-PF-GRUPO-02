import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setIsAdmin, setUserShopping } from "../../redux/action";
import Swal from "sweetalert2";

export default function AppBar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth0();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        name: user.name,
        sub: user.sub,
        email: user.email,
        status: true,
      };

      dispatch(fetchUser(userData));

      axios
        .get("/api/users", { params: { email: user.email } })
        .then((response) => {
          const userWithSameEmail = response.data.Items.find(
            (item) => item.email === user.email
          );

          if (!userWithSameEmail) {
            // Si no existe un usuario con el mismo correo electrónico, crea uno nuevo
            axios
              .post("/api/users", userData)
              .then((response) => console.log(response))
              .catch((error) => console.error(error));
          }
        })
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const userData = {
            name: user.name,
            sub: user.sub,
            email: user.email,
          };

          dispatch(fetchUser(userData));

          const response = await axios.get("/api/users", {
            params: { email: user.email },
          });

          console.log("Server response:", response);

          const userWithSameEmail = response.data.Items.find(
            (item) => item.email === user.email
          );

          console.log("Properties of userWithSameEmail:", userWithSameEmail);

          if (userWithSameEmail) {
            dispatch(setUserShopping(userWithSameEmail));
            dispatch(setIsAdmin(userWithSameEmail.is_admin));

            if (userWithSameEmail.status === true) {
              console.log("Estado Activo");
              setShowAlert(false);
            }
          } else {
            console.log("Inactive Status");
            setShowAlert(true);

            // Espera a que se cree el nuevo usuario antes de mostrar la alerta
            await axios.post("/api/users", userData);

            const result = await Swal.fire({
              icon: "error",
              title: "Usuario Baneado",
              text: "Este usuario ha sido baneado",
              allowOutsideClick: false,
              allowEscapeKey: false,
              showCancelButton: false,
              confirmButtonText: "Si, cierra la sesion",
            });
            if (result.isConfirmed) {
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated, user, dispatch, logout]);

  const isAdmin = currentUser && currentUser.is_admin;

  const shouldShowLogoOnly = location.pathname === pathroutes.LOGIN;

  const linksData = [
    {
      path: pathroutes.PRODUCT,
      title: "Productos",
      show:
        !shouldShowLogoOnly &&
        location.pathname !== pathroutes.PRODUCT &&
        !isAdmin,
    },
    {
      path: pathroutes.SERVICE,
      title: "Servicios",
      show: !shouldShowLogoOnly && location.pathname !== pathroutes.SERVICE,
    },
    {
      path: pathroutes.SHOPPINGCART,
      title: "Carrito de compras",
      show:
        !shouldShowLogoOnly &&
        location.pathname !== pathroutes.SHOPPINGCART &&
        !isAdmin,
    },
    {
      path: pathroutes.STAFF,
      title: "Conocer staff",
      show: !shouldShowLogoOnly && location.pathname !== pathroutes.STAFF,
    },
    {
      path: pathroutes.ADMIN,
      title: "Herramientas Admin",
      show:
        isAuthenticated &&
        isAdmin &&
        !shouldShowLogoOnly &&
        location.pathname !== pathroutes.ADMIN,
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
        {shouldShowLogoOnly ? (
          <LinkContainer to={pathroutes.HOME}>
            <Navbar.Brand>
              <Image
                src={logo}
                alt="Home"
                className="border border-2 border-light"
                roundedCircle
                style={{ width: "85px", height: "85px" }}
              />
            </Navbar.Brand>
          </LinkContainer>
        ) : (
          <>
            <LinkContainer to={pathroutes.HOME}>
              <Navbar.Brand>
                <Image
                  src={logo}
                  alt="Home"
                  className="border border-2 border-light"
                  roundedCircle
                  style={{ width: "85px", height: "85px" }}
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
                  <a href="#/userprofile">{user.name}</a>
                </Navbar.Text>
              )}
              {isAuthenticated && (
                <Image
                  src={user.picture}
                  alt="Profile"
                  className="border border-2 border-light m-3"
                  style={{ width: "80px", height: "80px" }}
                />
              )}
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
