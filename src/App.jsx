import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/LandingPage/Dashboard';
import TrainingPage from './pages/Training Page/TrainingPage';
import ProfilePage from './pages/LandingPage/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/3d-training" element={<TrainingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
