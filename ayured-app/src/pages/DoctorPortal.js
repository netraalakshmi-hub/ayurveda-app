import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/DoctorPortal.css';
import { loadPatients } from '../utils/patientSession';

function DoctorPortal() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Load patients from localStorage
  useEffect(() => {
    const allPatients = loadPatients();
    setPatients(allPatients);
  }, []);

  // Filter and search patients
  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        return parseInt(b.age) - parseInt(a.age);
      } else if (sortBy === 'date') {
        return new Date(b.addedDate) - new Date(a.addedDate);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    return status === 'active' ? 'status-active' : 'status-inactive';
  };

  const getDoshaColor = (dosha) => {
    if (dosha === 'Vata') return 'dosha-vata';
    if (dosha === 'Pitta') return 'dosha-pitta';
    if (dosha === 'Kapha') return 'dosha-kapha';
    return 'dosha-unknown';
  };

  const handleViewProfile = (patientId) => {
    navigate(`/patient-details/${patientId}`);
  };

  const handleViewAnalytics = (patientId) => {
    navigate('/reports');
  };

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div className="doctor-main-content">
        <div className="portal-container">
          {/* Header */}
          <div className="portal-header">
            <h1>Patient Portal</h1>
            <p>View and manage all patient registrations and profiles</p>
          </div>

          {/* Controls Section */}
          <div className="portal-controls">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search by name, patient ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Sort by Name</option>
                <option value="age">Sort by Age</option>
                <option value="date">Sort by Date Added</option>
              </select>
            </div>
          </div>

          {/* Patient Count */}
          <div className="patient-count">
            <p>Showing <strong>{filteredPatients.length}</strong> patient(s)</p>
          </div>

          {/* Patient Table */}
          <div className="portal-table-container">
            {filteredPatients.length > 0 ? (
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Dosha</th>
                    <th>Constitution</th>
                    <th>BMI</th>
                    <th>Status</th>
                    <th>Added Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="patient-row">
                      <td className="patient-id-cell">
                        <code>{patient.patientId}</code>
                      </td>
                      <td className="patient-name-cell">
                        <strong>{patient.name}</strong>
                      </td>
                      <td className="patient-age-cell">
                        {patient.age} yrs
                      </td>
                      <td className="patient-gender-cell">
                        <span className="gender-badge">{patient.gender}</span>
                      </td>
                      <td className="patient-email-cell">
                        {patient.email}
                      </td>
                      <td className="patient-dosha-cell">
                        <span className={`dosha-badge ${getDoshaColor(patient.dosha)}`}>
                          {patient.dosha}
                        </span>
                      </td>
                      <td className="patient-constitution-cell">
                        {patient.constitution}
                      </td>
                      <td className="patient-bmi-cell">
                        {patient.bmi}
                      </td>
                      <td className="patient-status-cell">
                        <span className={`status-badge ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="patient-date-cell">
                        {new Date(patient.addedDate).toLocaleDateString()}
                      </td>
                      <td className="patient-actions-cell">
                        <div className="action-buttons">
                          <button 
                            className="btn-action btn-view"
                            onClick={() => handleViewProfile(patient.id)}
                            title="View Profile"
                          >
                            👁️ View
                          </button>
                          <button 
                            className="btn-action btn-analytics"
                            onClick={() => handleViewAnalytics(patient.id)}
                            title="View Analytics"
                          >
                            📊 Analytics
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-patients">
                <p className="no-data-message">No patients found matching your search</p>
              </div>
            )}
          </div>

          {/* Statistics Card */}
          <div className="portal-stats">
            <div className="stat-card">
              <h3>Total Patients</h3>
              <p className="stat-value">{patients.length}</p>
            </div>
            <div className="stat-card">
              <h3>Active Patients</h3>
              <p className="stat-value">{patients.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="stat-card">
              <h3>Inactive Patients</h3>
              <p className="stat-value">{patients.filter(p => p.status === 'inactive').length}</p>
            </div>
            <div className="stat-card">
              <h3>Average Age</h3>
              <p className="stat-value">
                {patients.length > 0 
                  ? Math.round(patients.reduce((sum, p) => sum + parseInt(p.age), 0) / patients.length)
                  : 0
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPortal;
