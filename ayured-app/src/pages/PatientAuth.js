import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DoctorAuth.css';
import { findPatientByIdentifier, setCurrentPatientSession } from '../utils/patientSession';

function PatientAuth() {
  const [identifier, setIdentifier] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const patient = findPatientByIdentifier(identifier);
    if (!patient) {
      alert('Patient not found. Please use the Patient Email or Patient Number given by your doctor.');
      return;
    }

    setCurrentPatientSession(patient);
    navigate('/patient-dashboard');
  };

  return (
    <div className="doctor-auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🌿 AyurBalance</h1>
          <h2>Patient Sign In</h2>
          <p>Use the Patient Email or Patient Number provided by your doctor</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="identifier">Patient Email / Patient Number</label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter patient email or patient number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>

        <button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    </div>
  );
}

export default PatientAuth;
