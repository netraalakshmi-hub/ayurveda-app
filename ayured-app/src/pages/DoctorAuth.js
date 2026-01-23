import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DoctorAuth.css';

function DoctorAuth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log(isSignUp ? 'Sign Up' : 'Sign In', { email, password, name, licenseNumber });
    // For demo, allow access to doctor portal
    navigate('/doctor-dashboard');
  };

  return (
    <div className="doctor-auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🌿 AyurBalance</h1>
          <h2>{isSignUp ? 'Doctor Sign Up' : 'Doctor Sign In'}</h2>
          <p>Access the doctor portal</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="license">Medical License Number</label>
                <input
                  type="text"
                  id="license"
                  placeholder="Enter your license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              className="toggle-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <button className="btn-back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default DoctorAuth;
