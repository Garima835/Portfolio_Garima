import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Welcome} from './Pages/Welcome.jsx';
import {Credentials} from './Pages/Credentials.jsx';
import {PortfolioForm} from './Pages/Form.jsx';
import {Home} from './Pages/Home.jsx';
import {Skill} from './Pages/Skill.jsx';
import {Project} from './Pages/Project.jsx';
import {Certificates} from './Pages/Certificates.jsx';
import {Contact} from './Pages/Contact.jsx';
import {MainLayout} from './Pages/MainLayout';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/credentials" element={<Credentials />} />
      <Route path="/portfolio-form" element={<PortfolioForm />} />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/skills" element={<Skill />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />  
        <Route path="/contact/:id" element={<Contact />} />
      </Route>
    </Routes>
    </Router>
  );
}

export default App;
