import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Form from "./components/form/form";
import Product from "./components/product/product";
import Shoppingcart from "./components/shoppingcart/shoppingcart";
import pathroutes from "./components/helpers/pathroutes";
import Store from "./views/store";
import "./components/css-modules/App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path={pathroutes.HOME} element={<Home />} />
        <Route path={pathroutes.DETAIL} element={<Detail />} />
        <Route path={pathroutes.FORM} element={<Form />} />
        <Route path={pathroutes.PRODUCT} element={<Product />} />
        <Route path={pathroutes.SHOPPINGCART} element={<Shoppingcart />} />
        <Route path={pathroutes.STORE} element={<Store />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
