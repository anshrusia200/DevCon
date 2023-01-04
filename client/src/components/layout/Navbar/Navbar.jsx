import React from "react";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div>
      <nav class="navbar bg-dark">
        <h1>
          <a href="index.html">
            <i class="fas fa-code"></i> BlogOn
          </a>
        </h1>
        <ul>
          <li>
            <a href="profiles.html">Developers</a>
          </li>
          <li>|</li>
          <li>
            <a href="register.html">Register</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
