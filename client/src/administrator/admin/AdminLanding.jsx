import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminnavbar/adminnavbar";

function AdminLanding() {
  const navigate = useNavigate();

  return (
    <div>
      <AdminNavbar />
      <button onClick={() => navigate(`/admin/categories/`)}>Categories</button>
      <button onClick={() => navigate(`/admin/instructor/`)}>Instructor</button>
    </div>
  );
}

export default AdminLanding;
