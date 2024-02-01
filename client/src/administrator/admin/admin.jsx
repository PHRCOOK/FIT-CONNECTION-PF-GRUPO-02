/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import AdminNavBar from "../components/adminnavbar/adminnavbar";
import AdminStore from "../components/adminstore/adminstore";
import AdminService from "../components/adminservice/adminservice";
import FormProduct from "../../components/formproduct/formproduct";
import AdminStaff from "../components/adminstaff/adminstaff";
import AdminCategories from "../components/admincategories/admincategories";
import AdminModifyProduct from "../components/adminmodifyproduct/adminmodifyproduct";
import AdminCategoryForm from "../components/admincategoryform/admincategoryform";
import AdminModifyCategory from "../components/adminmodifycategory/adminmodifycategory";

import { getAllProducts, getAllCategories } from "../../redux/action";

function admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);

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
        <Route path="/createcategory" element={<AdminCategoryForm />} />
        <Route path="/modifycategory/:id" element={<AdminModifyCategory />} />
      </Routes>
    </div>
  );
}

export default admin;
