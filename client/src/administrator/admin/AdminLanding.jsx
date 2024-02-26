import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import pathroutes from "../../components/helpers/pathroutes";

function AdminLanding() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.ADMINCATEGORY)}
      >
        Categorías
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.ADMININSTRUCTOR)}
      >
        Instructor
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.ADMINPRODUCT)}
      >
        Productos
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.ADMINCLIENT)}
      >
        Usuarios
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.ADMINSERVICES)}
      >
        Membresías
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.GYM_INFO)}
      >
        Información del Gimnasio
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(pathroutes.ADMIN_FEEDBACK)}
      >
        Comentarios
      </Button>
    </div>
  );
}

export default AdminLanding;
