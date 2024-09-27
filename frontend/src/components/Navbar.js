import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Very Chaotic Podcast</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#episodes">Episodes</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
