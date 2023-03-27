// dependencies
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify"; // screen notifications 
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Route management
import { useDispatch } from "react-redux";

// Redux functions
import { getLoginStatus } from "./store/actions/auth/authSlice";

// Components
import Layout from "./components/Layout/Layout";
import Verify from "./pages/BackOffice/Verify/Verify";

// pages
import Login from "./pages/BackOffice/Login/Login";
import Home from "./pages/BackOffice/Home/Home";
import Users from "./pages/BackOffice/Users/Users";
import ResetPassword from "./pages/BackOffice/ResetPassword/ResetPassword";
import LoginWithCode from "./pages/BackOffice/Login/LoginWithCode";
import Profile from "./pages/BackOffice/Profile/Profile";
import ButtonsUsers from "./pages/BackOffice/Users/ButtonsUsers";
import HomeUser from "./pages/Public/HomeUser/HomeUser";
import ForoAdmin from "./pages/BackOffice/ForoAdmin/ForoAdmin";
import ForoUser from "./pages/Public/ForoUser/ForoUser";



//Page components
import AddComponent from "./components/AddComponent/AddComponent";
import EditComponent from "./components/EditComponent/EditComponent";
import SeeComponent from "./components/seeComponent/SeeComponent";
import SeeForo from "./components/seeForo/seeForo";
import SeeForoUser from "./components/seeForoUser/seeForoUser";

import SeeComponentUser from "./components/seeComponentUser/SeeComponentUser";

// styles
import "react-toastify/dist/ReactToastify.css";

// credentials
import axios from "axios";
import ChangePassword from "./pages/BackOffice/ChangePassword/ChangePassword";
axios.defaults.withCredentials = true;

function App() {
  // UseState para cambiar el header dependiendo si es admin o userNoregistrado
  const [isAdminOrUser, setIsAdminOrUse] = useState(true)
  /* 
  - =================================
  -    COMPONENT FUNCTIONS
  - =================================
  */
  //* Hooks Redux
  const dispatch = useDispatch();

  //* Determine if the user logged in or not
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* notifications */}
      <ToastContainer />

      <Routes>
        {/* 
            - =================================
            -       USERS MODULE ROUTES
            - =================================
          */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/changePassword"
          element={
            <Layout>
              <ChangePassword />
            </Layout>
          }
        />

        <Route
          path="/buttonsUsers"
          element={
            <Layout>
              <ButtonsUsers />
            </Layout>
          }
        />

        <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />

        <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

        <Route
          path="/verify/:verificationToken"
          element={
            <Layout>
              <Verify />
            </Layout>
          }
        />

        {/* 
            - =================================
            -     ROUTES MODULE COMPONENTS
            - =================================
          */}

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/"
          element={
            <Layout isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}>
              <HomeUser isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}/>
            </Layout>
          }
        />

        <Route
          path="/foroAdmin"
          element={
            <Layout>
              <ForoAdmin />
            </Layout>
          }
        />

        <Route
          path="/foroUser"
          element={
            <Layout isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}>
              <ForoUser isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}/>
            </Layout>
          }
        />

        <Route
          path="/addComponent"
          element={
            <Layout>
              <AddComponent />
            </Layout>
          }
        />

        <Route
          path="/updateComponent/:id"
          element={
            <Layout>
              <EditComponent />
            </Layout>
          }
        />

        <Route
          path="/seeComponent/:id"
          element={
            <Layout>
              <SeeComponent />
            </Layout>
          }
        />
        <Route
          path="/seeComponentUser/:id"
          element={
            <Layout isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}>
              <SeeComponentUser isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}/>
            </Layout>
          }
        />
        <Route
          path="/seeforo/:id"
          element={
            <Layout>
              <SeeForo/>
            </Layout>
          }
        />
        <Route
          path="/seeforoUser/:id"
          element={
            <Layout isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}>
              <SeeForoUser isAdminOrUser={isAdminOrUser} setIsAdminOrUse={setIsAdminOrUse}/>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
