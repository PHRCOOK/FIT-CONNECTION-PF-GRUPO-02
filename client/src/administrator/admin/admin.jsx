/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import AdminNavBar from "../components/adminnavbar/adminnavbar";
import AdminStore from "../components/adminstore/adminstore";
import AdminClientInfo from "../components/adminclientsinfo/adminclientsinfo";
import FormProduct from "../../components/formproduct/formproduct";
import AdminInstructor from "../components/admininstructor/admininstructor";
import AdminCategories from "../components/admincategories/admincategories";
import AdminModifyProduct from "../components/adminmodifyproduct/adminmodifyproduct";
import AdminCategoryForm from "../components/admincategoryform/admincategoryform";
import AdminModifyCategory from "../components/adminmodifycategory/adminmodifycategory";
import AdminInstructorForm from "../components/admininstructorform/admininstructorform";
import AdminModifyInstructor from "../components/adminmodifyinstructor/adminmodifyinstructor";

import {
  getAllProducts,
  getAllCategories,
  getAllInstructors,
} from "../../redux/action";

function admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getAllInstructors());
  }, []);

  return (
    <div>
      <AdminNavBar />
      <Routes>
        <Route path="/" element={<AdminStore />} />
        <Route path="/clientinfo" element={<AdminClientInfo />} />
        <Route path="/createproduct" element={<FormProduct />} />
        <Route path="/instructors" element={<AdminInstructor />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/modifyproduct/:id" element={<AdminModifyProduct />} />
        <Route path="/createcategory" element={<AdminCategoryForm />} />
        <Route path="/modifycategory/:id" element={<AdminModifyCategory />} />
        <Route path="/createinstructor" element={<AdminInstructorForm />} />
        <Route
          path="/modifyinstructor/:id"
          element={<AdminModifyInstructor />}
        />
      </Routes>
    </div>
  );
}

export default admin;
