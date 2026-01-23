import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDoctorPage = location.pathname.includes('doctor');

  const handleSignOut = () => {
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
            <button className="nav-link" onClick={() => navigate('/doctor-diet-chart')}>Diet Charts</button>
            <button className="nav-link">Patient Management</button>
            <button className="nav-link">Reports</button>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => navigate('/')}>Home</button>
            <button className="nav-link" onClick={() => navigate('/dosha-quiz')}>Dosha Quiz</button>
            <button className="nav-link" onClick={() => navigate('/food-recommendations')}>Food Plan</button>
            <button className="nav-link" onClick={() => navigate('/smart-insights')}>Insights</button>
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
        ) : (
          <>
            <button className="btn-outline" onClick={() => navigate('/doctor-auth')}>Doctor Login</button>
            <button className="btn-primary" onClick={() => navigate('/dosha-quiz')}>Start Free</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;