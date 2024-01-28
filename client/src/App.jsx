import { Routes, Route } from "react-router-dom";
import AppBar from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Form from "./components/userform/userform";
import Product from "./components/product/product";
import Shoppingcart from "./components/shoppingcart/shoppingcart";
import Services from "./components/services/services";
import FormProduct from "./components/formproduct/formproduct";
import UserForm from "./components/userform/userform";
import pathroutes from "./components/helpers/pathroutes";
import Store from "./views/store";
import "./App.scss"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div>
      <AppBar />
      <div className="container">
        <Routes>
          <Route path={pathroutes.HOME} element={<Home />} />
          <Route path={pathroutes.DETAIL} element={<Detail />} />
          <Route path={pathroutes.FORM} element={<Form />} />
          <Route path={pathroutes.PRODUCT} element={<Product />} />
          <Route path={pathroutes.SHOPPINGCART} element={<Shoppingcart />} />
          <Route path={pathroutes.SERVICE} element={<Services />} />
          <Route path={pathroutes.FORMPRODUCT} element={<FormProduct />} />
          <Route path={pathroutes.REGISTER} element={<UserForm />} />
          <Route path={pathroutes.STORE} element={<Store />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
