import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import "./App.css";
import VectorImage from "./components/design/VectorImage/VectorImage";
import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import EditProfile from "./components/profile-form/EditProfile";
import Profiles from "./components/profiles/Profiles";
import SingleProfile from "./components/profile/SingleProfile";
/*********
 * REDUX *
 *********/
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utilities/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        {/* <VectorImage /> */}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<SingleProfile />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="create-profile" element={<CreateProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="add-experience" element={<AddExperience />} />
            <Route path="add-education" element={<AddEducation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
