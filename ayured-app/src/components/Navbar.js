import { useNavigate, useLocation } from 'react-router-dom';
import { clearCurrentPatientSession, getCurrentPatientSession } from '../utils/patientSession';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDoctorPage = location.pathname.includes('doctor');
  const isPatientDashboard = location.pathname.startsWith('/patient-dashboard');
  const patientSession = getCurrentPatientSession();

  const handleSignOut = () => {
    if (isPatientDashboard) {
      clearCurrentPatientSession();
    }
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <span className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🌿 AyurBalance</span>
      </div>

      <div className="nav-center">
        {isDoctorPage ? (
          <>
            <button className="nav-link" onClick={() => navigate('/doctor-dashboard')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/diet-charts')}>Diet Charts</button>
            <button className="nav-link" onClick={() => navigate('/patient-management')}>Patient Management</button>
            <button className="nav-link">Reports</button>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => navigate('/')}>Home</button>
            <button className="nav-link">Knowledge</button>
            <button className="nav-link">Contact</button>
          </>
        )}
      </div>

      <div className="nav-right">
        {isDoctorPage ? (
          <>
            <span className="user-greeting">Welcome</span>
            <button className="btn-primary" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : isPatientDashboard ? (
          <>
            <span className="user-greeting">Welcome{patientSession?.name ? `, ${patientSession.name}` : ''}</span>
            <button className="btn-primary" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <button className="btn-outline" onClick={() => navigate('/doctor-auth')}>Doctor Login</button>
            <button className="btn-primary" onClick={() => navigate('/patient-auth')}>Patient Login</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;