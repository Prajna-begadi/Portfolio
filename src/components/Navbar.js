import React, { useState } from 'react';
import './Navbar.css';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>
      <ul className={menuOpen ? 'active' : ''}>
        <li onClick={() => scrollTo('home')}>Home</li>
        <li onClick={() => scrollTo('about')}>About</li>
        <li onClick={() => scrollTo('projects')}>Projects</li>
        <li onClick={() => scrollTo('skills')}>Skills</li>
        <li onClick={() => scrollTo('contact')}>Contact</li>
        <li className="theme-icon" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
