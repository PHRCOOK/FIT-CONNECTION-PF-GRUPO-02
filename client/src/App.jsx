import { Routes, Route, useLocation } from "react-router-dom";
import AppBar from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./views/home/home";
import Form from "./components/userform/userform";
import Product from "./components/product/product";
import Shoppingcart from "./views/shoppingcart/shoppingcart";
import Services from "./views/services/services";
import FormProduct from "./components/formproduct/formproduct";
import UserForm from "./components/userform/userform";
import pathroutes from "./components/helpers/pathroutes";
import Store from "./views/store";
import Admin from "./administrator/admin/admin";
import "./App.scss";
import { Container } from "react-bootstrap";
import axios from "axios";
import Error404 from "./views/Error 404/Error404";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/admin") && <AppBar />}
      <Container className="py-3 min-vh-100">
        <Routes>
          <Route path={pathroutes.HOME} element={<Home />} />
          <Route path={pathroutes.DETAIL} element={<Detail />} />
          <Route path={pathroutes.FORM} element={<Form />} />
          <Route path={pathroutes.PRODUCT} element={<Store />} />
          <Route path={pathroutes.SHOPPINGCART} element={<Shoppingcart />} />
          <Route path={pathroutes.SERVICE} element={<Services />} />
          <Route path={pathroutes.FORMPRODUCT} element={<FormProduct />} />
          <Route path={pathroutes.REGISTER} element={<UserForm />} />
          <Route path={pathroutes.STORE} element={<Store />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
