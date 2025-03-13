import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider: React.FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
	<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
	  {children}
	</AuthContext.Provider>
  );
}

export default AuthProvider;

