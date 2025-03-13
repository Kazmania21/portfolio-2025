import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Home from './pages/home';
import Projects from './pages/projects';
import Contact from './pages/contact';
import AddProject from './pages/add-project';
import AddTechnology from './pages/add-technology';
import AddUrlType from './pages/add-url-type';

const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-technology" element={<AddTechnology />} />
        <Route path="/add-url-type" element={<AddUrlType />} />
      </Routes>
    </div>
  );
}

export default App;

