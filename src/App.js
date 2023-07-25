// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Brawls from './pages/Brawls';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/brawls" element={<Brawls />} />
      </Routes>
    </Router>
  );
}

export default App;
