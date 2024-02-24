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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatIcon from "@mui/icons-material/Chat";

export default function AppBar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth0();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  const fetchUserDataAndPerformChecks = async () => {
    try {
      let userData;
      const response = await axios.get("/api/users", {
        params: { email: user.email },
      });
      const userWithSameEmail = response.data.Items.find(
        (item) => item.email === user.email
      );

      if (userWithSameEmail) {
        dispatch(setUserShopping(userWithSameEmail));
        dispatch(setIsAdmin(userWithSameEmail.is_admin));

        if (userWithSameEmail.status === true) {
          setShowAlert(false);
        }
      } else {
        console.log("Estado Inactivo");
        setShowAlert(true);

        userData = {
          name: user.name,
          sub: user.sub,
          email: user.email,
          status: true,
        };

        await axios.post("/api/users", userData);

        const result = await Swal.fire({
          icon: "error",
          title: "Usuario Bloqueado",
          text: "Este usuario ha sido bloqueado",
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

  useEffect(() => {
    const createOrUpdateUser = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get("/api/users", {
            params: { email: user.email },
          });

          const userWithSameEmail = response.data.Items.find(
            (item) => item.email === user.email
          );

          if (!userWithSameEmail) {
            let userData = {
              name: user.name,
              sub: user.sub,
              email: user.email,
              status: true,
            };

            await axios.post("/api/users", userData);
          }

          fetchUserDataAndPerformChecks();
          localStorage.setItem("isAdmin", String(userWithSameEmail.is_admin));
        }
      } catch (error) {
        console.error("Error creating or updating user:", error);
      }
    };

    createOrUpdateUser();
  }, [isAuthenticated, user, dispatch]);

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
      title: "Membresías",
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
      path: pathroutes.CHAT,
      title: "Chat",
      show:
        !shouldShowLogoOnly &&
        location.pathname !== pathroutes.CHAT &&
        isAuthenticated,
    },
    {
      path: pathroutes.LOGIN,
      title: "Log in",
      show: !isAuthenticated && location.pathname !== pathroutes.LOGIN,
    },
    {
      title: "Log out",
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
          style={{
            transition: "all 0.3s ease-in-out",
            color: "white", // Cambiar al color deseado
          }}
        >
          {linkData.title === "Carrito de compras" ? (
            <ShoppingCartIcon fontSize="large" />
          ) : linkData.title === "Chat" ? (
            <ChatIcon fontSize="large" />
          ) : (
            linkData.title
          )}
        </Nav.Link>
      </LinkContainer>
    ));

  return (
    <Navbar collapseOnSelect bg="primary" expand="lg" variant="dark">
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
                    style={{
                      backgroundColor: "red", // Cambiar al color deseado
                      color: "white", // Cambiar al color deseado
                      transition: "all 0.3s ease-in-out",
                    }}
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
