import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DoctorAuth from './pages/DoctorAuth';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorPatientManagement from './pages/DoctorPatientManagement';
import DoctorDietChart from './pages/DoctorDietChart';
import PatientDetails from './pages/PatientDetails';
import DoshaQuiz from './pages/DoshaQuiz';
import FoodRecommendations from './pages/FoodRecommendations';
import SmartInsights from './pages/SmartInsights';
import FoodDatabase from './pages/FoodDatabase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/doctor-auth" element={<DoctorAuth />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-management" element={<DoctorPatientManagement />} />
        <Route path="/patient-details/:patientId" element={<PatientDetails />} />
        <Route path="/diet-charts" element={<DoctorDietChart />} />
        <Route path="/dosha-quiz" element={<DoshaQuiz />} />
        <Route path="/food-recommendations" element={<FoodRecommendations />} />
        <Route path="/smart-insights" element={<SmartInsights />} />
        <Route path="/food-database" element={<FoodDatabase />} />
      </Routes>
    </Router>
  );
}

export default App;