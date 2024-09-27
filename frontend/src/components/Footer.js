import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Very Chaotic Podcast</h3>
        <p>Join the chaos and listen to our latest episodes on all major platforms!</p>
        <ul className="socials">
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Very Chaotic Podcast. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
