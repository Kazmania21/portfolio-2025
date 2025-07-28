import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import Link from react-router-dom
import { AuthContext } from './auth-provider';
import ApiService from '../services/api-service.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faPhone, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    //const token = sessionStorage.getItem('authToken');
	getProfile();
  }, [location]);

  const getProfile = async () => {
    var token = await ApiService({url: "/api/profile_info", formMethod: "GET"});
    setIsLoggedIn(!!token);
  }

  const handleSignOut = () => {
    //sessionStorage.removeItem("authToken");
	setIsLoggedIn(false);
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex fw-bold align-items-center" to="/">
          <img src={logo} width="40px" className="me-2"></img>
		  <span>My Portfolio</span>
		</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
			    <FontAwesomeIcon icon={faHouse} className="me-1" />
			  	Home
			  </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
				<FontAwesomeIcon icon={faFolder} className="me-1" />
			    Projects
			  </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
			    <FontAwesomeIcon icon={faPhone} className="me-1" />
			    Contact
			  </Link>
            </li>
          </ul>
		  { isLoggedIn?  (
			  <button className="btn btn-dark float-right" onClick={handleSignOut}>
				<FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
			    Sign Out
			  </button>
			) : (
		      <Link className="btn btn-dark float-right" to="/sign-in">
				<FontAwesomeIcon icon={faRightToBracket} className="me-2" />
			  	Sign In
			  </Link>
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

