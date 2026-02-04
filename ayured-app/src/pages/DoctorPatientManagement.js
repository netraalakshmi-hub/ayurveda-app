import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/DoctorPatientManagement.css';

function DoctorPatientManagement() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    patientId: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    dosha: '',
    constitution: 'Not assessed',
    bmi: 'N/A',
    status: 'active',
    addedDate: new Date().toISOString().split('T')[0]
  });

  // Load patients from localStorage on mount
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    console.log('Saved patients from localStorage:', savedPatients);
    
    // Initialize with sample patients if localStorage is empty
    const samplePatients = [
      {
        id: 1,
        patientId: 'ashkumar91980',
        email: 'ashkumar91980@example.com',
        name: 'Ashok Kumar',
        age: '99',
        gender: 'Male',
        dosha: 'Vata',
        constitution: 'Not assessed',
        bmi: 'N/A',
        status: 'active',
        addedDate: '2025-09-24'
      },
      {
        id: 2,
        patientId: 'priyam_m94',
        email: 'priyam_m94@example.com',
        name: 'Priyam Mishra',
        age: '34',
        gender: 'Female',
        dosha: 'Pitta',
        constitution: 'Not assessed',
        bmi: 'N/A',
        status: 'active',
        addedDate: '2025-09-27'
      },
      {
        id: 3,
        patientId: 'rajesh_k1980',
        email: 'rajesh_k1980@example.com',
        name: 'Rajesh Kumar',
        age: '45',
        gender: 'Male',
        dosha: 'Vata',
        constitution: 'Vata-Pitta',
        bmi: '26.5',
        status: 'active',
        addedDate: '2025-09-28'
      },
      {
        id: 4,
        patientId: 'priya_s1993',
        email: 'priya_s1993@example.com',
        name: 'Priya Sharma',
        age: '32',
        gender: 'Female',
        dosha: 'Pitta',
        constitution: 'Pitta-Kapha',
        bmi: '23.2',
        status: 'active',
        addedDate: '2025-09-29'
      },
      {
        id: 5,
        patientId: 'amit_verma',
        email: 'amit_verma@example.com',
        name: 'Amit Verma',
        age: '38',
        gender: 'Male',
        dosha: 'Kapha',
        constitution: 'Kapha',
        bmi: '28.1',
        status: 'active',
        addedDate: '2025-09-30'
      },
      {
        id: 6,
        patientId: 'neha_gupta',
        email: 'neha_gupta@example.com',
        name: 'Neha Gupta',
        age: '29',
        gender: 'Female',
        dosha: 'Vata',
        constitution: 'Vata',
        bmi: '21.5',
        status: 'active',
        addedDate: '2025-10-01'
      },
      {
        id: 7,
        patientId: 'vikram_singh',
        email: 'vikram_singh@example.com',
        name: 'Vikram Singh',
        age: '52',
        gender: 'Male',
        dosha: 'Pitta',
        constitution: 'Pitta',
        bmi: '27.3',
        status: 'inactive',
        addedDate: '2025-10-02'
      },
      {
        id: 8,
        patientId: 'divya_nair',
        email: 'divya_nair@example.com',
        name: 'Divya Nair',
        age: '35',
        gender: 'Female',
        dosha: 'Kapha',
        constitution: 'Vata-Kapha',
        bmi: '24.7',
        status: 'active',
        addedDate: '2025-10-03'
      }
    ];
    
    if (savedPatients && savedPatients !== '[]') {
      const parsed = JSON.parse(savedPatients);
      setPatients(parsed);
      console.log('Loaded patients from localStorage:', parsed);
    } else {
      // Initialize with sample patients
      setPatients(samplePatients);
      localStorage.setItem('patients', JSON.stringify(samplePatients));
      console.log('Sample patients initialized:', samplePatients);
    }
  }, []);

  // Save patients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.patientId || !formData.name || !formData.age) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId !== null) {
      setPatients(patients.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
      setEditingId(null);
    } else {
      const newPatient = {
        ...formData,
        id: Date.now()
      };
      setPatients([...patients, newPatient]);
    }

    resetForm();
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      patientId: '',
      email: '',
      name: '',
      age: '',
      gender: '',
      dosha: '',
      constitution: 'Not assessed',
      bmi: 'N/A',
      status: 'active',
      addedDate: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
    setEditingId(null);
  };

  const filteredPatients = patients.filter(patient =>
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <div className="doctor-layout">
        <Sidebar />
        <div className="doctor-main-content">
          <div className="patient-management-container">
            <button className="btn-back" onClick={resetForm}>← Back to Patients</button>
            
            <div className="form-card">
              <h1>{editingId ? 'Edit Patient' : 'Add New Patient'}</h1>
              
              <div className="form-group">
                <label>Patient ID *</label>
                <input
                  type="text"
                  name="patientId"
                  placeholder="Enter patient ID"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Patient Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter patient email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Dosha Type</label>
                  <select
                    name="dosha"
                    value={formData.dosha}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Dosha</option>
                    <option value="Vata">Vata</option>
                    <option value="Pitta">Pitta</option>
                    <option value="Kapha">Kapha</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Constitution</label>
                  <input
                    type="text"
                    name="constitution"
                    placeholder="Constitution"
                    value={formData.constitution}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>BMI</label>
                  <input
                    type="text"
                    name="bmi"
                    placeholder="BMI"
                    value={formData.bmi}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Added Date</label>
                <input
                  type="date"
                  name="addedDate"
                  value={formData.addedDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleSave}>
                  {editingId ? 'Update Patient' : 'Add Patient'}
                </button>
                <button className="btn-secondary" onClick={resetForm}>Cancel</button>
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
        <div className="patient-management-container">
          <div className="management-header">
            <div className="header-left">
              <h1>Patient Management</h1>
            </div>
            <div className="header-right">
              <span className="welcome-text">Welcome, Doctor</span>
            </div>
          </div>

          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search patients by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="patients-section">
            {filteredPatients.length === 0 ? (
              <div className="empty-state">
                <p>{searchTerm ? 'No patients found matching your search.' : 'No patients yet. Click "Add New Patient" to get started.'}</p>
                <button className="btn-primary" onClick={() => setShowForm(true)}>
                  + Add New Patient
                </button>
              </div>
            ) : (
              <>
                <div className="patients-grid">
                  {filteredPatients.map(patient => (
                    <div key={patient.id} className="patient-card">
                      <div className="card-header">
                        <h3>{patient.patientId}</h3>
                        <span className={`status-badge ${patient.status}`}>
                          {patient.status}
                        </span>
                      </div>

                      <div className="card-info">
                        <p className="patient-name">{patient.name}</p>
                        <p className="patient-details">
                          {patient.age} years • {patient.gender}
                        </p>
                      </div>

                      <div className="card-details">
                        <div className="detail-row">
                          <label>Constitution:</label>
                          <span>{patient.constitution}</span>
                        </div>
                        <div className="detail-row">
                          <label>BMI:</label>
                          <span>{patient.bmi}</span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <p className="added-date">Added: {patient.addedDate}</p>
                        <div className="card-actions">
                          <button 
                            className="btn-view" 
                            onClick={() => navigate(`/patient-details/${patient.id}`)}
                            title="View"
                          >
                            👁️ View
                          </button>
                          <button 
                            className="btn-edit" 
                            onClick={() => handleEdit(patient)}
                            title="Edit"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn-chart"
                            title="Chart"
                          >
                            📊 Chart
                          </button>
                        </div>
                      </div>

                      <button 
                        className="btn-delete-card"
                        onClick={() => handleDelete(patient.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <button className="btn-add-patient" onClick={() => setShowForm(true)}>
                  + Add New Patient
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPatientManagement;
