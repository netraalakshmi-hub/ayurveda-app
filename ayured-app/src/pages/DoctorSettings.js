import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/DoctorSettings.css';

function DoctorSettings() {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    doctorName: 'Dr. Meera Singh',
    doctorEmail: 'dr.meera@ayurbalance.com',
    doctorPhone: '+91-9876543210',
    licenseNumber: 'AYUR-2024-001',
    specialization: 'Ayurvedic Nutrition',
    yearsOfExperience: '8',

    // Clinic Settings
    clinicName: 'AyurBalance Wellness Center',
    clinicAddress: '123 Wellness Avenue, Mumbai, India',
    clinicPhone: '+91-22-12345678',
    clinicEmail: 'clinic@ayurbalance.com',
    registrationNumber: 'REG-2023-456',

    // Preferences
    theme: 'light',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    emailNotifications: true,
    patientUpdateAlerts: true,
    appointmentReminders: true,
    dietHabitReminders: true,
    weeklyReports: false,

    // Security
    twoFactorAuth: false,
    autoBackup: true,
    backupFrequency: 'weekly',

    // Diet Preferences
    defaultMealFrequency: '3 meals',
    defaultChartDuration: '1 month',
    includeFoodAlternatives: true,
    includeRecipes: true,

    // Report Preferences
    includeWeightProgress: true,
    includeHealthMetrics: true,
    includeMonthlyTrends: true,
    includeRecommendations: true,
    includeConstitutionAnalysis: true
  });

  const [formChanged, setFormChanged] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('doctorSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setFormChanged(true);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('doctorSettings', JSON.stringify(settings));
    setSaveStatus('Settings saved successfully!');
    setFormChanged(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleChangePassword = () => {
    alert('Password change functionality would open in a modal dialog');
  };

  const handleEnableTwoFactor = () => {
    alert('Two-factor authentication setup would begin');
  };

  const handleBackupData = () => {
    // Simulate data backup
    const allData = {
      patients: localStorage.getItem('patients'),
      dietCharts: localStorage.getItem('dietCharts'),
      metrics: localStorage.getItem('patientMetrics'),
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ayurbalance-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    setSaveStatus('Backup file downloaded!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div className="doctor-main-content">
        <div className="settings-container">
          {/* Header */}
          <div className="settings-header">
            <h1>Settings & Preferences</h1>
            <p>Manage your account, clinic information, and application preferences</p>
          </div>

          {/* Save Status Message */}
          {saveStatus && (
            <div className="save-status">
              <span className="status-icon">✓</span>
              {saveStatus}
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="settings-tabs">
            <button 
              className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              👤 Account
            </button>
            <button 
              className={`tab-button ${activeTab === 'clinic' ? 'active' : ''}`}
              onClick={() => setActiveTab('clinic')}
            >
              🏥 Clinic
            </button>
            <button 
              className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              ⚙️ Preferences
            </button>
            <button 
              className={`tab-button ${activeTab === 'diet' ? 'active' : ''}`}
              onClick={() => setActiveTab('diet')}
            >
              🥗 Diet Settings
            </button>
            <button 
              className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              📊 Reports
            </button>
            <button 
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              🔒 Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">

            {/* Account Settings Tab */}
            {activeTab === 'account' && (
              <div className="settings-panel">
                <h2>Account Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Doctor Name</label>
                    <input 
                      type="text" 
                      name="doctorName" 
                      value={settings.doctorName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="doctorEmail" 
                      value={settings.doctorEmail}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="doctorPhone" 
                      value={settings.doctorPhone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>License Number</label>
                    <input 
                      type="text" 
                      name="licenseNumber" 
                      value={settings.licenseNumber}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Specialization</label>
                    <input 
                      type="text" 
                      name="specialization" 
                      value={settings.specialization}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input 
                      type="number" 
                      name="yearsOfExperience" 
                      value={settings.yearsOfExperience}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-actions">
                    <button className="btn-secondary" onClick={handleChangePassword}>
                      🔑 Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Clinic Settings Tab */}
            {activeTab === 'clinic' && (
              <div className="settings-panel">
                <h2>Clinic Information</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Clinic Name</label>
                    <input 
                      type="text" 
                      name="clinicName" 
                      value={settings.clinicName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Clinic Address</label>
                    <textarea 
                      name="clinicAddress" 
                      value={settings.clinicAddress}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Clinic Phone</label>
                    <input 
                      type="tel" 
                      name="clinicPhone" 
                      value={settings.clinicPhone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Clinic Email</label>
                    <input 
                      type="email" 
                      name="clinicEmail" 
                      value={settings.clinicEmail}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Registration Number</label>
                    <input 
                      type="text" 
                      name="registrationNumber" 
                      value={settings.registrationNumber}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="settings-panel">
                <h2>Application Preferences</h2>
                <div className="settings-form">
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Theme</label>
                      <select 
                        name="theme" 
                        value={settings.theme}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Language</label>
                      <select 
                        name="language" 
                        value={settings.language}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Date Format</label>
                      <select 
                        name="dateFormat" 
                        value={settings.dateFormat}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="divider">Notifications</div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="emailNotifications" 
                      checked={settings.emailNotifications}
                      onChange={handleInputChange}
                      id="emailNotif"
                      className="form-checkbox"
                    />
                    <label htmlFor="emailNotif">Email Notifications</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="patientUpdateAlerts" 
                      checked={settings.patientUpdateAlerts}
                      onChange={handleInputChange}
                      id="patientAlerts"
                      className="form-checkbox"
                    />
                    <label htmlFor="patientAlerts">Patient Update Alerts</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="appointmentReminders" 
                      checked={settings.appointmentReminders}
                      onChange={handleInputChange}
                      id="appointmentRemind"
                      className="form-checkbox"
                    />
                    <label htmlFor="appointmentRemind">Appointment Reminders</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="dietHabitReminders" 
                      checked={settings.dietHabitReminders}
                      onChange={handleInputChange}
                      id="dietRemind"
                      className="form-checkbox"
                    />
                    <label htmlFor="dietRemind">Diet Habit Reminders</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="weeklyReports" 
                      checked={settings.weeklyReports}
                      onChange={handleInputChange}
                      id="weeklyReports"
                      className="form-checkbox"
                    />
                    <label htmlFor="weeklyReports">Send Weekly Reports Summary</label>
                  </div>
                </div>
              </div>
            )}

            {/* Diet Settings Tab */}
            {activeTab === 'diet' && (
              <div className="settings-panel">
                <h2>Diet Chart Preferences</h2>
                <div className="settings-form">
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Default Meal Frequency</label>
                      <select 
                        name="defaultMealFrequency" 
                        value={settings.defaultMealFrequency}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="3 meals">3 Meals</option>
                        <option value="4 meals">4 Meals</option>
                        <option value="5 meals">5 Meals</option>
                        <option value="6 meals">6 Meals</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Default Chart Duration</label>
                      <select 
                        name="defaultChartDuration" 
                        value={settings.defaultChartDuration}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="1 week">1 Week</option>
                        <option value="2 weeks">2 Weeks</option>
                        <option value="1 month">1 Month</option>
                        <option value="3 months">3 Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="divider">Content Options</div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeFoodAlternatives" 
                      checked={settings.includeFoodAlternatives}
                      onChange={handleInputChange}
                      id="foodAlt"
                      className="form-checkbox"
                    />
                    <label htmlFor="foodAlt">Include Food Alternatives in Charts</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeRecipes" 
                      checked={settings.includeRecipes}
                      onChange={handleInputChange}
                      id="recipes"
                      className="form-checkbox"
                    />
                    <label htmlFor="recipes">Include Recipe Details</label>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="settings-panel">
                <h2>Report Customization</h2>
                <p className="settings-description">Choose which sections to include in patient reports</p>
                <div className="settings-form">
                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeWeightProgress" 
                      checked={settings.includeWeightProgress}
                      onChange={handleInputChange}
                      id="weightProg"
                      className="form-checkbox"
                    />
                    <label htmlFor="weightProg">Weight Progress Charts</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeHealthMetrics" 
                      checked={settings.includeHealthMetrics}
                      onChange={handleInputChange}
                      id="healthMetric"
                      className="form-checkbox"
                    />
                    <label htmlFor="healthMetric">Health Metrics Dashboard</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeMonthlyTrends" 
                      checked={settings.includeMonthlyTrends}
                      onChange={handleInputChange}
                      id="monthlyTrend"
                      className="form-checkbox"
                    />
                    <label htmlFor="monthlyTrend">Monthly Trends Analysis</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeRecommendations" 
                      checked={settings.includeRecommendations}
                      onChange={handleInputChange}
                      id="recommen"
                      className="form-checkbox"
                    />
                    <label htmlFor="recommen">Clinical Recommendations</label>
                  </div>

                  <div className="form-group-checkbox">
                    <input 
                      type="checkbox" 
                      name="includeConstitutionAnalysis" 
                      checked={settings.includeConstitutionAnalysis}
                      onChange={handleInputChange}
                      id="constAnalysis"
                      className="form-checkbox"
                    />
                    <label htmlFor="constAnalysis">Constitution Analysis</label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="settings-panel">
                <h2>Security & Privacy</h2>
                <div className="settings-form">
                  <div className="security-card">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                    <div className="form-group-checkbox">
                      <input 
                        type="checkbox" 
                        name="twoFactorAuth" 
                        checked={settings.twoFactorAuth}
                        onChange={handleInputChange}
                        id="twoFactor"
                        className="form-checkbox"
                      />
                      <label htmlFor="twoFactor">Enable Two-Factor Authentication</label>
                    </div>
                    <button 
                      className="btn-action-small"
                      onClick={handleEnableTwoFactor}
                      disabled={settings.twoFactorAuth}
                    >
                      {settings.twoFactorAuth ? '✓ Enabled' : 'Enable 2FA'}
                    </button>
                  </div>

                  <div className="security-card">
                    <h3>Automatic Backup</h3>
                    <p>Regularly backup your patient data</p>
                    <div className="form-group-checkbox">
                      <input 
                        type="checkbox" 
                        name="autoBackup" 
                        checked={settings.autoBackup}
                        onChange={handleInputChange}
                        id="autoBackup"
                        className="form-checkbox"
                      />
                      <label htmlFor="autoBackup">Enable Automatic Backup</label>
                    </div>

                    {settings.autoBackup && (
                      <div className="form-group">
                        <label>Backup Frequency</label>
                        <select 
                          name="backupFrequency" 
                          value={settings.backupFrequency}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="security-card">
                    <h3>Manual Backup</h3>
                    <p>Download your data as a backup file</p>
                    <button 
                      className="btn-backup"
                      onClick={handleBackupData}
                    >
                      📥 Download Backup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="settings-footer">
            {formChanged && (
              <button 
                className="btn-save"
                onClick={handleSaveSettings}
              >
                💾 Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSettings;
