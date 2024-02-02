import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
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
import "./components/css-modules/App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const location = useLocation();
  return (
    <div>
      <Nav />
      <div className="container">
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