import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Home from './pages/home';
import Projects from './pages/projects';
import Contact from './pages/contact';
import AddProject from './pages/add-project';
import AddTechnology from './pages/add-technology';
import AddUrlType from './pages/add-url-type';
import SignIn from './pages/sign-in';
import AuthProvider from './components/auth-provider';

const App: React.FC = () => {
  const AuthContext = createContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
	  <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-technology" element={<AddTechnology />} />
        <Route path="/add-url-type" element={<AddUrlType />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
	  </AuthProvider>
    </div>
  );
}

export default App;

