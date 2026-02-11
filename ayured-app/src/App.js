import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DoctorAuth from './pages/DoctorAuth';
import PatientAuth from './pages/PatientAuth';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorPortal from './pages/DoctorPortal';
import DoctorPatientManagement from './pages/DoctorPatientManagement';
import DoctorDietChart from './pages/DoctorDietChart';
import DoctorAnalytics from './pages/DoctorAnalytics';
import DoctorSettings from './pages/DoctorSettings';
import RecipeManagement from './pages/RecipeManagement';
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
        <Route path="/patient-auth" element={<PatientAuth />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-portal" element={<DoctorPortal />} />
        <Route path="/patient-management" element={<DoctorPatientManagement />} />
        <Route path="/patient-details/:patientId" element={<PatientDetails />} />
        <Route path="/diet-charts" element={<DoctorDietChart />} />
        <Route path="/doctor-diet-chart" element={<DoctorDietChart />} />
        <Route path="/recipes" element={<RecipeManagement />} />
        <Route path="/reports" element={<DoctorAnalytics />} />
        <Route path="/settings" element={<DoctorSettings />} />
        <Route path="/dosha-quiz" element={<DoshaQuiz />} />
        <Route path="/food-recommendations" element={<FoodRecommendations />} />
        <Route path="/smart-insights" element={<SmartInsights />} />
        <Route path="/food-database" element={<FoodDatabase />} />
      </Routes>
    </Router>
  );
}

export default App;