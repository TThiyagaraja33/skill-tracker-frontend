import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LoginComponent from './components/LoginComponent';
import EmployeeSkillSearchComponent from './components/EmployeeSkillSearchComponent';
import ProfileSkillListComponent from './components/ProfileSkillListComponent';

function App() {

  return (
    <div>
      <Router>
        <HeaderComponent />
        <div style={{ margin: "2%" }}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/search-employee-skill" element={<EmployeeSkillSearchComponent />} />
            <Route path="/list-employee-skill" element={<ProfileSkillListComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;