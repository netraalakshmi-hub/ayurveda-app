import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/PatientDetails.css';

function PatientDetails() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      const patients = JSON.parse(savedPatients);
      const foundPatient = patients.find(p => p.id === parseInt(patientId));
      if (foundPatient) {
        setPatient(foundPatient);
      }
    }
    setLoading(false);
  }, [patientId]);

  if (loading) {
    return (
      <div className="doctor-layout">
        <Sidebar />
        <div className="doctor-main-content">
          <div className="loading">Loading patient details...</div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="doctor-layout">
        <Sidebar />
        <div className="doctor-main-content">
          <div className="patient-details-container">
            <button className="btn-back" onClick={() => navigate('/doctor-diet-chart')}>
              ← Back to Patient Management
            </button>
            <div className="error-message">Patient not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div className="doctor-main-content">
        <div className="patient-details-container">
          <button className="btn-back" onClick={() => navigate('/patient-management')}>
            ← Back to Patient Management
          </button>

          <div className="patient-details-header">
            <div className="patient-title-section">
              <h1>{patient.name}</h1>
              <span className={`status-badge ${patient.status?.toLowerCase()}`}>
                {patient.status}
              </span>
            </div>
            <div className="patient-actions">
              <button className="btn-secondary" onClick={() => navigate(`/doctor-diet-chart?edit=${patient.id}`)}>
                ✎ Edit
              </button>
            </div>
          </div>

          <div className="details-grid">
            {/* Personal Information */}
            <div className="details-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="info-group">
                <div className="info-item">
                  <label>Patient ID</label>
                  <p className="info-value">{patient.patientId}</p>
                </div>
                <div className="info-item">
                  <label>Full Name</label>
                  <p className="info-value">{patient.name}</p>
                </div>
                <div className="info-item">
                  <label>Age</label>
                  <p className="info-value">{patient.age} years</p>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <p className="info-value">{patient.gender || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Ayurvedic Profile */}
            <div className="details-section">
              <h2 className="section-title">Ayurvedic Profile</h2>
              <div className="info-group">
                <div className="info-item">
                  <label>Primary Dosha</label>
                  <p className="info-value dosha-value">{patient.dosha || 'Not assessed'}</p>
                </div>
                <div className="info-item">
                  <label>Constitution (Prakriti)</label>
                  <p className="info-value">{patient.constitution || 'Not assessed'}</p>
                </div>
                <div className="info-item">
                  <label>BMI</label>
                  <p className="info-value">{patient.bmi || 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <p className="info-value">{patient.status}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="details-section full-width">
              <h2 className="section-title">Additional Information</h2>
              <div className="info-group">
                <div className="info-item">
                  <label>Patient Added Date</label>
                  <p className="info-value">{patient.addedDate || patient.joinDate || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="details-section full-width">
              <h2 className="section-title">Quick Actions</h2>
              <div className="action-buttons">
                <button className="btn-action">📊 View Diet Chart</button>
                <button className="btn-action">📋 Medical History</button>
                <button className="btn-action">🎯 Recommendations</button>
                <button className="btn-action">📈 Progress Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
