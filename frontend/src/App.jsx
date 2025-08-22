import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingScreen from './Components/LandingScreen.jsx';
import LoginScreen from './Components/LoginScreen.jsx';
import SignupScreen from './Components/SignupScreen.jsx';
import ProfileScreen from './Components/ProfileScreen.jsx';
// import LandingScreen from './components/LandingScreen';
// import LoginScreen from './components/LoginScreen';
// import SignupScreen from './components/SignupScreen';
// import ProfileScreen from './components/ProfileScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen/>} />
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/signup" element={<SignupScreen/>} />
        <Route path="/profile" element={<ProfileScreen/>} />
      </Routes>
    </Router>
  );
};

export default App;
