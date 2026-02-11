import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/DoctorAnalytics.css';
import {
  loadPatients,
  getLatestDietChartForPatient,
  getPatientMetrics
} from '../utils/patientSession';

function DoctorAnalytics() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [dietChart, setDietChart] = useState(null);

  // Load patients from localStorage
  useEffect(() => {
    const allPatients = loadPatients();
    setPatients(allPatients);
    if (allPatients.length > 0) {
      setSelectedPatientId(allPatients[0].id);
    }
  }, []);

  // Load patient details when selected
  useEffect(() => {
    if (!selectedPatientId) return;

    const patient = patients.find(p => p.id === selectedPatientId);
    if (patient) {
      setSelectedPatient(patient);
      
      // Load diet chart for this patient
      const chart = getLatestDietChartForPatient(patient.id);
      setDietChart(chart);

      // Load metrics for this patient
      const patientMetrics = getPatientMetrics(patient.id);
      setMetrics(patientMetrics);
    }
  }, [selectedPatientId, patients]);

  // Calculate dosha balance status
  const getDoshaStatus = () => {
    if (!selectedPatient) return null;

    const dosha = selectedPatient.dosha || 'Unknown';
    const constitution = selectedPatient.constitution || 'Not assessed';

    return { dosha, constitution };
  };

  // Calculate weight progress
  const getWeightProgress = () => {
    if (!metrics) return null;

    const current = parseFloat(metrics.currentWeightKg) || 0;
    const target = parseFloat(metrics.targetWeightKg) || 0;
    const initial = parseFloat(metrics.initialWeightKg) || current;

    if (target === 0) return null;

    const totalChange = initial - target;
    const currentProgress = initial - current;
    const progressPercent = totalChange !== 0 ? (currentProgress / totalChange) * 100 : 0;

    return {
      current,
      target,
      initial,
      progressPercent: Math.round(progressPercent),
      remaining: Math.abs(target - current),
      direction: target > initial ? 'gain' : 'loss'
    };
  };

  // Calculate health metrics average
  const getHealthMetricsAverage = () => {
    if (!metrics) return null;

    const energyLevel = parseInt(metrics.energyLevel) || 3;
    const sleepQuality = parseInt(metrics.sleepQuality) || 3;
    const digestion = parseInt(metrics.digestion) || 3;
    const adherence = parseInt(metrics.adherence) || 3;

    const average = Math.round((energyLevel + sleepQuality + digestion + adherence) / 4);

    return {
      energyLevel,
      sleepQuality,
      digestion,
      adherence,
      average
    };
  };

  // Get diet summary
  const getDietSummary = () => {
    if (!dietChart) return null;

    const mealCount = dietChart.mealPlan ? dietChart.mealPlan.length : 0;
    const totalCalories = dietChart.nutrition ? dietChart.nutrition.calories : 0;
    const goal = dietChart.formData ? dietChart.formData.dietGoal : 'N/A';
    const createdDate = dietChart.generatedDate || 'N/A';

    return {
      mealCount,
      totalCalories,
      goal,
      createdDate,
      restriction: dietChart.formData?.dietaryRestrictions || 'None'
    };
  };

  // Calculate treatment progress
  const getTreatmentProgress = () => {
    const healthMetrics = getHealthMetricsAverage();
    const weightProgress = getWeightProgress();

    if (!healthMetrics && !weightProgress) return 0;

    let scores = [];
    if (healthMetrics) {
      scores.push(healthMetrics.average * 20); // Convert to percentage
    }
    if (weightProgress) {
      scores.push(Math.min(Math.abs(weightProgress.progressPercent), 100));
    }

    return scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
  };

  // Get monthly progression data
  const getMonthlyProgression = () => {
    const today = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      months.push(monthName);
    }

    // Simulated data - in production this would come from a time-series database
    const data = months.map((_, idx) => ({
      month: months[idx],
      weight: 75 - (idx * 1.5),
      adherence: 50 + (idx * 10),
      wellbeing: 60 + (idx * 5)
    }));

    return data;
  };

  const doshaStatus = getDoshaStatus();
  const weightProgress = getWeightProgress();
  const healthMetrics = getHealthMetricsAverage();
  const dietSummary = getDietSummary();
  const treatmentProgress = getTreatmentProgress();
  const monthlyData = getMonthlyProgression();

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div className="doctor-main-content">
        <div className="analytics-container">
          {/* Header Section */}
          <div className="analytics-header">
            <h1>Patient Analytics & Reports</h1>
            <p>Comprehensive patient health analysis and treatment progress</p>
          </div>

          {/* Patient Selection */}
          <div className="patient-selector-card">
            <label>Select Patient:</label>
            <select 
              value={selectedPatientId || ''} 
              onChange={(e) => setSelectedPatientId(parseInt(e.target.value))}
              className="patient-select"
            >
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} ({patient.patientId}) - {patient.dosha || 'Unknown'}
                </option>
              ))}
            </select>
          </div>

          {selectedPatient && (
            <>
              {/* Patient Overview */}
              <div className="analytics-grid-2">
                {/* Constitution Analysis */}
                <div className="analytics-card constitution-card">
                  <h2>Constitution Analysis</h2>
                  <div className="constitution-content">
                    <div className="dosha-info">
                      <div className="dosha-badge primary-dosha">
                        <span className="dosha-name">{doshaStatus?.dosha}</span>
                        <span className="dosha-label">Primary Dosha</span>
                      </div>
                      <p className="constitution-detail">
                        <strong>Constitution:</strong> {doshaStatus?.constitution}
                      </p>
                      <p className="patient-basic">
                        <strong>Age:</strong> {selectedPatient.age} years
                      </p>
                      <p className="patient-basic">
                        <strong>Gender:</strong> {selectedPatient.gender}
                      </p>
                      <p className="patient-basic">
                        <strong>BMI:</strong> {selectedPatient.bmi}
                      </p>
                    </div>
                    <div className="dosha-description">
                      <p>
                        {doshaStatus?.dosha === 'Vata' && 'Vata (Air & Ether) individuals are creative, energetic, and prone to anxiety. They benefit from warm, grounding foods and regular routines.'}
                        {doshaStatus?.dosha === 'Pitta' && 'Pitta (Fire & Water) individuals are ambitious, focused, and prone to inflammation. They benefit from cooling foods and stress management.'}
                        {doshaStatus?.dosha === 'Kapha' && 'Kapha (Earth & Water) individuals are stable, compassionate, and prone to heaviness. They benefit from warming, stimulating foods and regular exercise.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Treatment Goals & Progress */}
                <div className="analytics-card goals-card">
                  <h2>Treatment Goals & Progress</h2>
                  <div className="progress-section">
                    <div className="overall-progress">
                      <p className="progress-label">Overall Treatment Progress</p>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${treatmentProgress}%` }}
                        ></div>
                      </div>
                      <p className="progress-percent">{treatmentProgress}% Complete</p>
                    </div>
                    
                    {dietSummary && (
                      <div className="goals-detail">
                        <p><strong>Primary Goal:</strong> {dietSummary.goal}</p>
                        <p><strong>Treatment Started:</strong> {dietSummary.createdDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Diet Analysis Section */}
              <div className="analytics-grid-2">
                {/* Current Diet Chart */}
                <div className="analytics-card diet-card">
                  <h2>Current Diet Chart Analysis</h2>
                  {dietSummary ? (
                    <div className="diet-content">
                      <div className="diet-stat">
                        <span className="diet-label">Daily Calories</span>
                        <span className="diet-value">{dietSummary.totalCalories}</span>
                      </div>
                      <div className="diet-stat">
                        <span className="diet-label">Meals Per Day</span>
                        <span className="diet-value">{dietSummary.mealCount}</span>
                      </div>
                      <div className="diet-stat">
                        <span className="diet-label">Dietary Restrictions</span>
                        <span className="diet-value">{dietSummary.restriction}</span>
                      </div>
                      <p className="diet-note">
                        <strong>Diet Goal:</strong> {dietSummary.goal}
                      </p>
                      <button 
                        className="btn-view-chart"
                        onClick={() => navigate('/diet-charts')}
                      >
                        View Full Diet Chart
                      </button>
                    </div>
                  ) : (
                    <p className="no-data">No diet chart created yet</p>
                  )}
                </div>

                {/* Health Metrics */}
                <div className="analytics-card metrics-card">
                  <h2>Current Health Metrics</h2>
                  {healthMetrics ? (
                    <div className="metrics-content">
                      <div className="metric-item">
                        <span className="metric-label">Energy Level</span>
                        <div className="metric-bar">
                          <div 
                            className="metric-fill energy"
                            style={{ width: `${(healthMetrics.energyLevel / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="metric-value">{healthMetrics.energyLevel}/5</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Sleep Quality</span>
                        <div className="metric-bar">
                          <div 
                            className="metric-fill sleep"
                            style={{ width: `${(healthMetrics.sleepQuality / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="metric-value">{healthMetrics.sleepQuality}/5</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Digestion</span>
                        <div className="metric-bar">
                          <div 
                            className="metric-fill digestion"
                            style={{ width: `${(healthMetrics.digestion / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="metric-value">{healthMetrics.digestion}/5</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Diet Adherence</span>
                        <div className="metric-bar">
                          <div 
                            className="metric-fill adherence"
                            style={{ width: `${(healthMetrics.adherence / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="metric-value">{healthMetrics.adherence}/5</span>
                      </div>
                    </div>
                  ) : (
                    <p className="no-data">No metrics recorded yet</p>
                  )}
                </div>
              </div>

              {/* Weight Progress Section */}
              {weightProgress && (
                <div className="analytics-card weight-card">
                  <h2>Weight Management Progress</h2>
                  <div className="weight-content">
                    <div className="weight-stats">
                      <div className="weight-stat">
                        <p className="stat-label">Initial Weight</p>
                        <p className="stat-value">{weightProgress.initial} kg</p>
                      </div>
                      <div className="weight-stat">
                        <p className="stat-label">Current Weight</p>
                        <p className="stat-value">{weightProgress.current} kg</p>
                      </div>
                      <div className="weight-stat">
                        <p className="stat-label">Target Weight</p>
                        <p className="stat-value">{weightProgress.target} kg</p>
                      </div>
                      <div className="weight-stat">
                        <p className="stat-label">Remaining</p>
                        <p className="stat-value">{weightProgress.remaining} kg</p>
                      </div>
                    </div>
                    <div className="weight-progress">
                      <p className="progress-label">Weight Management Progress</p>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill weight"
                          style={{ width: `${Math.min(weightProgress.progressPercent, 100)}%` }}
                        ></div>
                      </div>
                      <p className="progress-text">
                        {weightProgress.progressPercent}% of target achieved
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Monthly Progression Chart */}
              <div className="analytics-card monthly-card">
                <h2>Monthly Progression Trends</h2>
                <div className="monthly-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Weight (kg)</th>
                        <th>Diet Adherence (%)</th>
                        <th>Overall Wellbeing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyData.map((data, idx) => (
                        <tr key={idx}>
                          <td>{data.month}</td>
                          <td className="weight-col">{data.weight.toFixed(1)}</td>
                          <td className="adherence-col">
                            <div className="mini-bar">
                              <div 
                                className="mini-fill"
                                style={{ width: `${data.adherence}%` }}
                              ></div>
                            </div>
                            {data.adherence}%
                          </td>
                          <td className="wellbeing-col">
                            <span className={'wellbeing-badge ' + (data.wellbeing >= 70 ? 'good' : data.wellbeing >= 50 ? 'fair' : 'needs-work')}>
                              {data.wellbeing >= 70 ? 'Good' : data.wellbeing >= 50 ? 'Fair' : 'Needs Work'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations */}
              <div className="analytics-card recommendations-card">
                <h2>Clinical Recommendations</h2>
                <div className="recommendations-content">
                  <div className="recommendation-item">
                    <span className="rec-icon">👨‍⚕️</span>
                    <div>
                      <p className="rec-title">Dosha-Based Guidance</p>
                      <p className="rec-text">
                        Continue with {doshaStatus?.dosha}-pacifying foods. Focus on maintaining digestive fire (agni) with warm, well-spiced meals.
                      </p>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <span className="rec-icon">🥗</span>
                    <div>
                      <p className="rec-title">Diet Compliance</p>
                      <p className="rec-text">
                        Patient is maintaining {healthMetrics ? healthMetrics.adherence : 'good'}/5 adherence to diet plan. Consider adjusting meals if compliance varies.
                      </p>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <span className="rec-icon">📊</span>
                    <div>
                      <p className="rec-title">Progress Tracking</p>
                      <p className="rec-text">
                        {treatmentProgress >= 75 ? 'Excellent progress! Continue current treatment plan.' : treatmentProgress >= 50 ? 'Moderate progress. Schedule consultation for plan adjustment.' : 'Initial phase. Monitor closely and provide support.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorAnalytics;
