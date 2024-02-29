/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setIsAdmin } from "./redux/action";
import axios from "axios";
import AppBar from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import Home from "./views/home/home";
import FormProduct from "./components/formproduct/formproduct";
import UserForm from "./components/userform/userform";
import Shoppingcart from "./views/shoppingcart/shoppingcart";
import Services from "./views/services/services";
import pathroutes from "./components/helpers/pathroutes";
import Store from "./views/store";
import Error404 from "./views/Error 404/Error404";
import Category from "./administrator/components/admincategoryform/admincategoryform";
import UserProfile from "./views/UserProfile/UserProfile";
import Login from "./components/login/login";
import Admincategories from "./administrator/components/admincategories/admincategories";
import Admincategoryform from "./administrator/components/admincategoryform/admincategoryform";
import AdminInstructor from "./administrator/components/admininstructor/admininstructor";
import AdminInstructorForm from "./administrator/components/admininstructorform/admininstructorform";
import AdminLanding from "./administrator/admin/AdminLanding";
import AdminStore from "./administrator/components/adminstore/adminstore";
import AdminClients from "./administrator/components/AdminClients/AdminClients";
import AdminServices from "./administrator/components/AdminServices/AdminServices";
import AdminServicesForm from "./administrator/components/AdminServicesForm/AdminServicesForm";
import AdminGymInfo from "./administrator/components/adminGymInfo/AdminGymInfo";
import Instructors from "./views/instructors/instructors";
import Chat from "./components/chat/chatComponent";
import InstructorDetail from "./components/InstructorDetail/InstructorDetail";
import AdminFeedbacks from "./administrator/components/AdminFeedbacks/AdminFeedbacks";

import "./App.scss";

// axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL =
  "https://fit-connection-pf-grupo-02-production.up.railway.app/";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        name: user.name,
        sub: user.sub,
        email: user.email,
      };

      dispatch(fetchUser(userData));

      axios
        .post("/api/users", userData)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        name: user.name,
        sub: user.sub,
        email: user.email,
      };

      dispatch(fetchUser(userData));

      axios
        .get("/api/users", { params: { email: user.email } })
        .then((response) => {
          const userWithSameEmail = response.data.Items.find(
            (item) => item.email === user.email
          );
          if (userWithSameEmail) {
            // console.log(
            //   `Es admin: ${userWithSameEmail.is_admin ? "Si" : "No"}`
            // );
            dispatch(setIsAdmin(userWithSameEmail.is_admin));
            dispatch(
              fetchUser({ ...userData, is_admin: userWithSameEmail.is_admin })
            );
          }
        })
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated, user, dispatch]);
  const isAdmin = currentUser && currentUser.is_admin;

  return (
    <>
      <AppBar />
      <Container fluid className="py-3 min-vh-100">
        <Routes>
          <Route path={pathroutes.HOME} element={<Home />} />
          <Route path={pathroutes.LOGIN} element={<Login />} />
          <Route path={pathroutes.DETAIL} element={<Detail />} />
          <Route path={pathroutes.PRODUCT} element={<Store />} />
          <Route path={pathroutes.SHOPPINGCART} element={<Shoppingcart />} />
          <Route path={pathroutes.SERVICE} element={<Services />} />
          <Route path={pathroutes.STORE} element={<Store />} />
          <Route path={pathroutes.CHAT} element={<Chat />} />
          <Route path={pathroutes.USER_PROFILE} element={<UserProfile />} />
          <Route path={pathroutes.INSTRUCTOR} element={<Instructors />} />
          <Route
            path={pathroutes.INSTRUCTOR_DETAIL}
            element={<InstructorDetail />}
          />
          {isAdmin && (
            <>
              <Route path={pathroutes.REGISTER} element={<UserForm />} />
              <Route
                path={pathroutes.CREATE_PRODUCT}
                element={<FormProduct />}
              />
              <Route
                path={pathroutes.MODIFY_PRODUCT}
                element={<FormProduct />}
              />
              <Route path={pathroutes.CATEGORY} element={<Category />} />
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
              <Route path={pathroutes.ADMINCLIENT} element={<AdminClients />} />
              <Route
                path={pathroutes.ADMINCLIENTPROFILE}
                element={<UserProfile />}
              />
              <Route
                path={pathroutes.ADMINSERVICES}
                element={<AdminServices />}
              />
              <Route
                path={pathroutes.FORMSERVICE}
                element={<AdminServicesForm />}
              />
              <Route
                path={pathroutes.MODIFYSERVICE}
                element={<AdminServicesForm />}
              />
              <Route
                path={pathroutes.ADMIN_FEEDBACK}
                element={<AdminFeedbacks />}
              />
              <Route path={pathroutes.GYM_INFO} element={<AdminGymInfo />} />
            </>
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
