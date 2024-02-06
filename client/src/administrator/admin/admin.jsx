import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/img/logo-nav.png";
import pathroutes from "../../components/helpers/pathroutes";
import { LinkContainer } from "react-router-bootstrap";

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

  return (
    <div></div>
  );
}
