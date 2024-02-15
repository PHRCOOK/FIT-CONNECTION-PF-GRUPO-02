import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = async () => {
    // Si el usuario no está autenticado, redirigir al formulario de inicio de sesión de Auth0
    if (!isAuthenticated) {
      await loginWithRedirect();
    } else {
      // Si el usuario está autenticado, guardar los datos en tu base de datos
      const userData = {
        name: user.name,
        email: user.email,
        sub: user.sub,
      };

      console.log("Datos del usuario guardados:", userData);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
