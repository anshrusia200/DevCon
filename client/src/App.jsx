import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import "./App.css";
import VectorImage from "./components/design/VectorImage/VectorImage";
import Nav from "./components/layout/Navbar/Nav";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import ForgotPassword from "./components/auth/ForgotPassword/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import EditProfile from "./components/profile-form/EditProfile";
import Profiles from "./components/profiles/Profiles";
import SingleProfile from "./components/profile/SingleProfile";
import Posts from "./components/posts/Posts";
import PostItem from "./components/posts/PostItem";
import Post from "./components/posts/Post";
import Write from "./components/write/Write";
import GithubModal from "./components/layout/GithubModal/GithubModal";
import PasswordReset from "./components/auth/PasswordReset/PasswordReset";
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
  const MINUTE_MS = 180000;
  const [githubStarModal, setGithubStarModal] = useState(false);
  useEffect(() => {
    store.dispatch(loadUser());

    const interval = setInterval(() => {
      setGithubStarModal(true);
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [githubStarModal]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Alert />
        <GithubModal
          visible={githubStarModal}
          visibleChange={setGithubStarModal}
        />
        {/* <VectorImage /> */}
        <div className="route-wrapper">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id" element={<PasswordReset />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<SingleProfile />} />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route index element={<Posts />} />
              <Route path=":id" element={<Post />} />
              <Route path="write" element={<Write />} />
            </Route>

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
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
