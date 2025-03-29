// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Faculties from './pages/faculties/faculties';
import Universities from './pages/universities/universities';


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