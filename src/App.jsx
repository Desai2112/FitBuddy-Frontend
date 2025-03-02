import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/LandingPage/Dashboard';
import TrainingPage from './pages/Training Page/TrainingPage';
import ProfilePage from './pages/LandingPage/ProfilePage';
import BMICalculator from './components/LandingPage/BMICalculator';
import DoctorAppointment from './pages/LandingPage/DoctorAppointment';
import PdfViewer from './pages/LandingPage/PdfViewer';
import MealPlanning from './pages/LandingPage/MealPlanning';
import UserHistoryPage from './pages/LandingPage/UserHistoryPage';
import DoctorDashboard from './components/DoctorPanel/DoctorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<PdfViewer />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/3d-training" element={<TrainingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/consultation" element={<DoctorAppointment />} />
        <Route path="/user/history/:userId" element={<UserHistoryPage/>}/>
        <Route path="/recipes" element={<MealPlanning/>}/>
        
        {/* Doctor Panel Routes */}
        <Route path="/doctor/*" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
