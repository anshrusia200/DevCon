import { useState, Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
function App() {
  return (
    <Fragment className="App">
      <Navbar />
      <Landing />
    </Fragment>
  );
}

export default App;
