import React from "react";
import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../components/adminnavbar/adminnavbar";
import Button from "react-bootstrap/Button";

function AdminLanding() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {/* <AdminNavbar /> */}
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(`/admin/category/`)}
      >
        Categorias
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(`/admin/instructor/`)}
      >
        Instructor
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(`/admin/product/`)}
      >
        Productos
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="mb-5 w-50"
        onClick={() => navigate(`/admin/client/`)}
      >
        Usuarios
      </Button>
    </div>
  );
}

export default AdminLanding;
