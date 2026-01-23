import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/doctor-dashboard' },
    { label: 'Patient Portal', path: '/doctor-portal' },
    { label: 'Patient Management', path: '/patient-management' },
    { label: 'Food Database', path: '/food-database' },
    { label: 'Diet Charts', path: '/diet-charts' },
    { label: 'Recipe Management', path: '/recipes' },
    { label: 'Reports', path: '/reports' },
    { label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🌿</span>
          <div className="logo-text">
            <h3>AyurBalance</h3>
            <p>Ayurvedic Diet Management</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sign-out-btn" onClick={() => navigate('/')}>
          <span className="nav-label">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
