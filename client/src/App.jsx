import { Routes, Route, useLocation } from "react-router-dom";
import AppBar from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./views/home/home";
import Form from "./components/userform/userform";
// import Product from "./components/product/product";
import Shoppingcart from "./views/shoppingcart/shoppingcart";
import Services from "./views/services/services";
import FormProduct from "./components/formproduct/formproduct";
import UserForm from "./components/userform/userform";
import pathroutes from "./components/helpers/pathroutes";
import Store from "./views/store";
import "./App.scss";
import { Container } from "react-bootstrap";
import axios from "axios";
import Error404 from "./views/Error 404/Error404";
import Category from "./administrator/components/admincategoryform/admincategoryform";
import UserProfile from "./views/UserProfile/UserProfile";
import Login from "./components/login/login";
import { useAuth0 } from "@auth0/auth0-react";

//PRUEBAS DE LO Q DEJO ILEANA

// import Admin from "./administrator/admin/admin";
import Admincategories from "./administrator/components/admincategories/admincategories";
import Admincategoryform from "./administrator/components/admincategoryform/admincategoryform";
import AdminInstructor from "./administrator/components/admininstructor/admininstructor";
import AdminInstructorForm from "./administrator/components/admininstructorform/admininstructorform";
import AdminLanding from "./administrator/admin/AdminLanding";
import AdminStore from "./administrator/components/adminstore/adminstore";
// FIN PRUEBAS

axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.baseURL =
//   "https://fit-connection-pf-grupo-02-production.up.railway.app/";

function App() {
  const auth0 = useAuth0();
  console.log(auth0.user);

  return (
    <>
      <AppBar />
      <Container fluid className="py-3 min-vh-100">
        <Routes>
          <Route path={pathroutes.HOME} element={<Home />} />
          <Route path={pathroutes.LOGIN} element={<Login />} />
          <Route path={pathroutes.DETAIL} element={<Detail />} />
          <Route path={pathroutes.FORM} element={<Form />} />
          <Route path={pathroutes.PRODUCT} element={<Store />} />
          <Route path={pathroutes.SHOPPINGCART} element={<Shoppingcart />} />
          <Route path={pathroutes.SERVICE} element={<Services />} />
          <Route path={pathroutes.FORMPRODUCT} element={<FormProduct />} />
          <Route path={pathroutes.REGISTER} element={<UserForm />} />
          <Route path={pathroutes.STORE} element={<Store />} />
          <Route path={pathroutes.CATEGORY} element={<Category />} />
          <Route path={pathroutes.USER_PROFILE} element={<UserProfile />} />
          <Route path="/admin/category" element={<Admincategories />} />
          <Route path="/admin" element={<AdminLanding />} />
          <Route
            path="/admin/category/create"
            element={<Admincategoryform />}
          />
          <Route
            path="/admin/category/modify/:id"
            element={<Admincategoryform />}
          />
          <Route path="/admin/instructor" element={<AdminInstructor />} />
          <Route
            path="/admin/instructor/create"
            element={<AdminInstructorForm />}
          />
          <Route
            path="/admin/instructor/modify/:id"
            element={<AdminInstructorForm />}
          />
          <Route path="/admin/product/" element={<AdminStore />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
