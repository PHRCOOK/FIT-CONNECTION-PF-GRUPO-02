import React from "react";
import { Routes, Route } from "react-router-dom";
import pathroutes from "../../components/helpers/pathroutes";
import AdminNavBar from "../components/adminnavbar/adminnavbar";
import AdminStore from "../components/adminstore/adminstore";
import AdminService from "../components/adminservice/adminservice";
import FormProductAdmin from "../../components/formproduct/formproduct";
import AdminStaff from "../components/adminstaff/adminstaff";
import AdminCategories from "../components/admincategories/admincategories";
import AdminModifyProduct from "../components/adminmodifyproduct/adminmodifyproduct";

function admin() {
  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route path={pathroutes.HOMEADMIN} element={<AdminStore />} />
        <Route path={pathroutes.SERVICEADMIN} element={<AdminService />} />
        <Route path={pathroutes.FORM} element={<FormProductAdmin />} />
        <Route path={pathroutes.STAFFADMIN} element={<AdminStaff />} />
        <Route path={pathroutes.CATEGORY} element={<AdminCategories />} />
        <Route path={pathroutes.MODIFY} element={<AdminModifyProduct />} />
      </Routes>
    </div>
  );
}

export default admin;
