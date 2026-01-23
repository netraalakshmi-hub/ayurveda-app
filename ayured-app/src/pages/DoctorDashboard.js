import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/DoctorDashboard.css';

function DoctorDashboard() {
  const navigate = useNavigate();
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  // Load patients from localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Calculate dashboard stats from actual patient data
  const dashboardStats = {
    totalPatients: patients.length,
    patientGrowth: '+12%',
    activeDietCharts: patients.filter(p => p.status === 'active').length,
    dietGrowth: '+8%',
    foodItems: 3,
    foodGrowth: '+156',
    appointments: 0,
    appointmentGrowth: '+2'
  };

  const recentActivities = [
    { id: 1, patient: 'Priyam Mishra', activity: 'New patient registered', date: '9/27/2025', status: 'new' },
    { id: 2, patient: 'Priyam Mishra', activity: 'Diet chart approved', date: '9/25/2025', status: 'approved' },
    { id: 3, patient: 'Raj Kumar', activity: 'New patient registered', date: '9/20/2025', status: 'new' }
  ];

  const todaySchedule = [
    { id: 1, doctor: 'Dr. Meera Singh', type: 'Diet Consultation', time: '10:00 AM' },
    { id: 2, doctor: 'Ravi Gupta', type: 'Follow-up Visit', time: '2:00 PM' }
  ];

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleBackToList = () => {
    setShowPatientDetails(false);
    setSelectedPatient(null);
  };

  if (showPatientDetails && selectedPatient) {
    return (
      <div className="doctor-layout">
        <Sidebar />
        <div className="doctor-main-content">
          <div className="patient-details-container">
            <button className="btn-back" onClick={handleBackToList}>← Back to Dashboard</button>
          
          <div className="patient-details-card">
            <div className="patient-header">
              <h1>{selectedPatient.name}</h1>
              <span className={`status-badge ${selectedPatient.status.toLowerCase()}`}>
                {selectedPatient.status}
              </span>
            </div>

            <div className="patient-info-grid">
              <div className="info-block">
                <label>Age</label>
                <p>{selectedPatient.age} years</p>
              </div>
              <div className="info-block">
                <label>Dosha Type</label>
                <p>{selectedPatient.dosha}</p>
              </div>
              <div className="info-block">
                <label>Join Date</label>
                <p>{selectedPatient.joinDate}</p>
              </div>
              <div className="info-block">
                <label>Status</label>
                <p>{selectedPatient.status}</p>
              </div>
            </div>

            <div className="patient-actions">
              <button className="btn-primary" onClick={() => navigate('/doctor-diet-chart')}>
                View/Edit Diet Chart
              </button>
              <button className="btn-secondary">
                View Medical History
              </button>
              <button className="btn-secondary">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div className="doctor-main-content">
        <div className="dashboard-container">
          {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1>Welcome to AyurBalance</h1>
          <p>Harmonizing ancient Ayurvedic wisdom with modern nutritional science for optimal health and wellness.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" onClick={() => handlePatientClick(patients[0])}>
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Total Patients</h3>
              <div className="stat-number">{dashboardStats.totalPatients}</div>
              <div className="stat-growth">
                <span className="growth-positive">{dashboardStats.patientGrowth}</span> from last month
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3>Active Diet Charts</h3>
              <div className="stat-number">{dashboardStats.activeDietCharts}</div>
              <div className="stat-growth">
                <span className="growth-positive">{dashboardStats.dietGrowth}</span> from last month
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🍎</div>
            <div className="stat-content">
              <h3>Food Items</h3>
              <div className="stat-number">{dashboardStats.foodItems}</div>
              <div className="stat-growth">
                <span className="growth-positive">{dashboardStats.foodGrowth}</span> from last month
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>Total Appointments</h3>
              <div className="stat-number">{dashboardStats.appointments}</div>
              <div className="stat-growth">
                <span className="growth-positive">{dashboardStats.appointmentGrowth}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Recent Activities */}
          <div className="dashboard-card recent-activities">
            <div className="card-header">
              <h2>⏱️ Recent Activities</h2>
              <p>Latest patient and system activities</p>
            </div>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <p className="activity-patient">{activity.patient}</p>
                    <p className="activity-text">{activity.activity}</p>
                  </div>
                  <div className="activity-meta">
                    <span className={`activity-badge ${activity.status}`}>{activity.status === 'new' ? 'new' : 'approved'}</span>
                    <p className="activity-date">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="dashboard-card todays-schedule">
            <div className="card-header">
              <h2>📅 Today's Schedule</h2>
              <p>Upcoming appointments and consultations</p>
            </div>
            <div className="schedule-list">
              {todaySchedule.map(item => (
                <div key={item.id} className="schedule-item">
                  <div className="schedule-info">
                    <p className="schedule-doctor">{item.doctor}</p>
                    <p className="schedule-type">{item.type}</p>
                  </div>
                  <p className="schedule-time">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patients Section */}
        <div className="patients-section">
          <div className="section-header">
            <h2>Patient Management</h2>
            <button className="btn-primary" onClick={() => navigate('/doctor-diet-chart')}>
              + New Patient
            </button>
          </div>
          
          {patients.length === 0 ? (
            <div className="empty-state">
              <p>No patients yet. Click "New Patient" to add patients.</p>
            </div>
          ) : (
            <div className="patients-cards-grid">
              {patients.map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="card-header">
                    <h3>{patient.patientId || patient.name}</h3>
                    <span className={`status-badge ${patient.status?.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </div>

                  <div className="card-info">
                    <p className="patient-name">{patient.name}</p>
                    <p className="patient-details">
                      {patient.age} years • {patient.gender || 'N/A'}
                    </p>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <label>Dosha:</label>
                      <span>{patient.dosha || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <label>Constitution:</label>
                      <span>{patient.constitution || 'Not assessed'}</span>
                    </div>
                    <div className="detail-row">
                      <label>BMI:</label>
                      <span>{patient.bmi || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <p className="added-date">Added: {patient.addedDate || patient.joinDate}</p>
                    <div className="card-actions">
                      <button 
                        className="btn-view-detail"
                        onClick={() => navigate(`/patient-details/${patient.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
