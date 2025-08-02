import React, { useState, createContext } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({isLoggedIn: false, setIsLoggedIn: () => {}});

export const AuthProvider: React.FC<AuthContextProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

