import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNavBar from "../components/adminnavbar/adminnavbar";
import AdminStore from "../components/adminstore/adminstore";
import AdminService from "../components/adminservice/adminservice";
import FormProduct from "../../components/formproduct/formproduct";
import AdminStaff from "../components/adminstaff/adminstaff";
import AdminCategories from "../components/admincategories/admincategories";
import AdminModifyProduct from "../components/adminmodifyproduct/adminmodifyproduct";

function admin() {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route path="/" element={<AdminStore />} />
        <Route path="/service" element={<AdminService />} />
        <Route path="/createproduct" element={<FormProduct />} />
        <Route path="/staff" element={<AdminStaff />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/modifyproduct/:id" element={<AdminModifyProduct />} />
      </Routes>
    </div>
  );
}

export default admin;
