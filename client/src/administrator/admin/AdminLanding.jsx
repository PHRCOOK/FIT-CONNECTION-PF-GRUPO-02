import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLanding() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(`/admin/categories/`)}>Categories</button>
      <button onClick={() => navigate(`/admin/instructor/`)}>Instructor</button>
    </div>
  );
}

export default AdminLanding;
