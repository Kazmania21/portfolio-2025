import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/auth-provider';
const ProtectedRouter: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
	  { isLoggedIn? (
		  <Outlet />
		) : (
		  <Navigate to="/sign-in" />
		)
      }
    </div>
  );
}

export default ProtectedRouter;

