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

// Componente funcional que representa la barra de navegación
export default function AppBar() {
  // Hook de React para obtener la ubicación actual de la aplicación
  const location = useLocation();

  // Hook de autenticación de Auth0 para gestionar el estado de autenticación y el usuario
  const { isAuthenticated, user, logout } = useAuth0();

  // Hook de Redux para despachar acciones
  const dispatch = useDispatch();

  // Estado local para mostrar u ocultar una alerta
  const [showAlert, setShowAlert] = useState(false);

  // Selector de Redux para obtener el estado del usuario actual
  const currentUser = useSelector((state) => state.currentUser);

  // Función asíncrona para obtener datos del usuario desde el servidor y realizar comprobaciones
  const fetchUserDataAndPerformChecks = async () => {
    try {
      let userData;

      // Petición GET al servidor para obtener datos del usuario
      const response = await axios.get("/api/users", {
        params: { email: user.email },
      });

      console.log("Server response:", response);

      // Buscar un usuario con el mismo correo electrónico en la respuesta del servidor
      const userWithSameEmail = response.data.Items.find(
        (item) => item.email === user.email
      );

      console.log("Properties of userWithSameEmail:", userWithSameEmail);

      if (userWithSameEmail) {
        // Si se encuentra un usuario con el mismo correo electrónico
        dispatch(setUserShopping(userWithSameEmail));
        dispatch(setIsAdmin(userWithSameEmail.is_admin));

        if (userWithSameEmail.status === true) {
          console.log("Active Status");
          setShowAlert(false);
        }
      } else {
        // Si no se encuentra un usuario con el mismo correo electrónico
        console.log("Inactive Status");
        setShowAlert(true);

        // Crear un nuevo objeto userData para el usuario
        userData = {
          name: user.name,
          sub: user.sub,
          email: user.email,
          status: true,
        };

        // Enviar una solicitud POST para crear un nuevo usuario en el servidor
        await axios.post("/api/users", userData);

        // Mostrar una alerta al usuario informando que ha sido baneado
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
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Efecto secundario que se ejecuta cuando cambia la autenticación, el usuario o el estado del almacenamiento Redux
  useEffect(() => {
    const createOrUpdateUser = async () => {
      try {
        // Verificar si el usuario está autenticado
        if (isAuthenticated) {
          // Obtener datos del usuario desde el servidor
          const response = await axios.get("/api/users", {
            params: { email: user.email },
          });

          // Buscar un usuario con el mismo correo electrónico en la respuesta del servidor
          const userWithSameEmail = response.data.Items.find(
            (item) => item.email === user.email
          );

          // Si no se encuentra un usuario con el mismo correo electrónico, crear uno nuevo
          if (!userWithSameEmail) {
            let userData = {
              name: user.name,
              sub: user.sub,
              email: user.email,
              status: true,
            };

            await axios.post("/api/users", userData);
          }
          // Realizar comprobaciones adicionales y actualizar el estado
          fetchUserDataAndPerformChecks();
        }
      } catch (error) {
        console.error("Error creating or updating user:", error);
      }
    };

    // Llamar a la función de creación o actualización del usuario
    createOrUpdateUser();
  }, [isAuthenticated, user, dispatch]);

  // Verificar si el usuario actual tiene privilegios de administrador
  const isAdmin = currentUser && currentUser.is_admin;

  // Verificar si se debe mostrar solo el logo en lugar de la barra de navegación completa
  const shouldShowLogoOnly = location.pathname === pathroutes.LOGIN;

  // Datos de los enlaces de navegación
  const linksData = [
    {
      path: pathroutes.CHAT,
      title: "Chat",
      show:
        !shouldShowLogoOnly &&
        location.pathname !== pathroutes.CHAT &&
        isAuthenticated,
    },
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
      path: pathroutes.INSTRUCTOR,
      title: "Instructores",
      show: !shouldShowLogoOnly && location.pathname !== pathroutes.INSTRUCTOR,
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

  // Filtrar y mapear los enlaces de navegación que deben mostrarse
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

  // Estructura JSX del componente AppBar
  return (
    <Navbar collapseOnSelect bg="secondary" expand="lg">
      <Container>
        {shouldShowLogoOnly ? (
          // Mostrar solo el logo cuando se está en la página de login
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
          // Mostrar el logo y la barra de navegación completa en otras páginas
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
                  // Botón de logout visible solo cuando el usuario está autenticado
                  <Button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="rounded fw-bold px-2 mx-1 my-1"
                  >
                    Logout
                  </Button>
                )}
              </Nav>
              {isAuthenticated && (
                // Enlace al perfil del usuario y visualización de su nombre
                <Navbar.Text>
                  <a href="#/userprofile">{user.name}</a>
                </Navbar.Text>
              )}
              {isAuthenticated && (
                // Mostrar la imagen del perfil del usuario
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
