// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Navbar: React.FC = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Portfolio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="trapezoid-border bg-secondary">
      <div class="trapezoid bg-primary"></div>
    </div>
    </div>
  );
};

export default Navbar;

