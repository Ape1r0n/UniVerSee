// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Faculties from './pages/Faculties/Faculties';
import Universities from './pages/Universities/Universities';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/universities" element={<Universities />} />
      </Routes>
    </Router>
  );
}

export default App;