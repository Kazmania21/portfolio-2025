import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import Link from react-router-dom
import { AuthContext } from './auth-provider'

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleSignOut = () => {
    sessionStorage.removeItem("authToken");
	setIsLoggedIn(false);
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Portfolio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
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
		  { isLoggedIn?  (
			  <button className="btn btn-dark float-right" onClick={handleSignOut}>Sign Out</button>
			) : (
		      <Link className="btn btn-dark float-right" to="/sign-in">Sign In</Link>
			)
		  }
        </div>
      </div>
    </nav>
    <div className="trapezoid-border bg-secondary">
      <div className="trapezoid bg-primary"></div>
    </div>
    </div>
  );
};

export default Navbar;

