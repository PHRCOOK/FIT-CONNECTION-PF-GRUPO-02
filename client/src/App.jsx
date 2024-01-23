import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Error from "./components/error/error";
import Form from "./components/form/form";
import pathroutes from "./components/helpers/pathroutes";
import "./components/css-modules/App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path={pathroutes.HOME} element={<Home />} />
        <Route path={pathroutes.DETAIL} element={<Detail />} />
        <Route path={pathroutes.FORM} element={<Form />} />
        <Route
          path={pathroutes.ERROR}
          element={<Error status={404} message={"Not Found!"} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
