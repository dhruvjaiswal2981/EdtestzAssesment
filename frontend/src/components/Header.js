import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/booking">Book Appointment</Link></li>
          <li><Link to="/appointments">Appointment History</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
