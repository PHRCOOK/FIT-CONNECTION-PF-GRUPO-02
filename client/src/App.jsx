<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
=======
import { Routes, Route, useLocation } from "react-router-dom";
import AppBar from "./components/nav/nav";
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./views/home/home";
import Form from "./components/userform/userform";
import Product from "./components/product/product";
import Shoppingcart from "./components/shoppingcart/shoppingcart";
import Services from "./components/services/services";
import FormProduct from "./components/formproduct/formproduct";
import UserForm from "./components/userform/userform";
import pathroutes from "./components/helpers/pathroutes";
import Store from "./views/store";
<<<<<<< HEAD
import "./components/css-modules/App.css";
=======
import Admin from "./administrator/admin/admin";
import "./App.scss";
import { Container } from "react-bootstrap";
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const location = useLocation();
  return (
<<<<<<< HEAD
    <div>
      <Nav />
      <div className="container">
=======
    <>
      {!location.pathname.startsWith("/admin") && <AppBar />}
      <Container className="py-3 min-vh-100">
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
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
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;