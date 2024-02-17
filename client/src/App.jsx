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

//PRUEBAS DE LO Q DEJO ILEANA

// import Admin from "./administrator/admin/admin";
import Admincategories from "./administrator/components/admincategories/admincategories";
import Admincategoryform from "./administrator/components/admincategoryform/admincategoryform";
import AdminInstructor from "./administrator/components/admininstructor/admininstructor";
import AdminInstructorForm from "./administrator/components/admininstructorform/admininstructorform";
import AdminLanding from "./administrator/admin/AdminLanding";
import AdminStore from "./administrator/components/adminstore/adminstore";
import AdminClients from "./administrator/components/AdminClients/AdminClients";
// FIN PRUEBAS

axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.baseURL =
//   "https://fit-connection-pf-grupo-02-production.up.railway.app/";

function App() {
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
          <Route path={pathroutes.REGISTER} element={<UserForm />} />
          <Route path={pathroutes.STORE} element={<Store />} />
          <Route path={pathroutes.CATEGORY} element={<Category />} />
          <Route path={pathroutes.USER_PROFILE} element={<UserProfile />} />
          <Route path={pathroutes.ADMIN} element={<AdminLanding />} />
          <Route
            path={pathroutes.ADMINCATEGORY}
            element={<Admincategories />}
          />
          <Route
            path={pathroutes.ADMINCATEGORYCREATE}
            element={<Admincategoryform />}
          />
          <Route
            path={pathroutes.ADMINCATEGORYMODIFY}
            element={<Admincategoryform />}
          />
          <Route
            path={pathroutes.ADMININSTRUCTOR}
            element={<AdminInstructor />}
          />
          <Route
            path={pathroutes.ADMININSTRUCTORCREATE}
            element={<AdminInstructorForm />}
          />
          <Route
            path={pathroutes.ADMININSTRUCTORMODIFY}
            element={<AdminInstructorForm />}
          />
          <Route path={pathroutes.ADMINPRODUCT} element={<AdminStore />} />
          <Route path={pathroutes.FORMPRODUCT} element={<FormProduct />} />
          <Route path={pathroutes.ADMINCLIENT} element={<AdminClients />} />
          <Route
            path={pathroutes.ADMINCLIENTPROFILE}
            element={<UserProfile />}
          />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
