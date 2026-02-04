import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/PatientDashboard.css';
import {
  getCurrentPatientSession,
  getLatestDietChartForPatient,
  getPatientByInternalId,
  getPatientMetrics,
  savePatientMetrics,
  saveConsultationRequest,
  savePatientUpdate
} from '../utils/patientSession';

function getBmiCategory(bmiValue) {
  const bmi = Number(bmiValue);
  if (!Number.isFinite(bmi)) return { label: 'N/A', tone: 'neutral' };
  if (bmi < 18.5) return { label: 'Underweight', tone: 'warn' };
  if (bmi < 25) return { label: 'Normal', tone: 'good' };
  if (bmi < 30) return { label: 'Overweight', tone: 'warn' };
  return { label: 'Obese', tone: 'bad' };
}

function PatientDashboard() {
  const navigate = useNavigate();
  const [patientSession, setPatientSession] = useState(null);
  const [patientRecord, setPatientRecord] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [activePanel, setActivePanel] = useState(null);

  const [consultationForm, setConsultationForm] = useState({
    preferredDate: '',
    message: ''
  });

  const [updateForm, setUpdateForm] = useState({
    category: 'progress',
    message: ''
  });

  const [metricsDraft, setMetricsDraft] = useState({
    currentWeightKg: '',
    targetWeightKg: '',
    targetBmi: '22.5',
    energyLevel: '3',
    sleepQuality: '3',
    digestion: '3',
    adherence: '3'
  });

  useEffect(() => {
    const session = getCurrentPatientSession();
    if (!session) {
      navigate('/patient-auth');
      return;
    }
    setPatientSession(session);
  }, [navigate]);

  useEffect(() => {
    if (!patientSession?.id) return;
    const record = getPatientByInternalId(patientSession.id);
    setPatientRecord(record);

    const storedMetrics = getPatientMetrics(patientSession.id);
    setMetrics(storedMetrics);
    if (storedMetrics) {
      setMetricsDraft((prev) => ({
        ...prev,
        currentWeightKg: storedMetrics.currentWeightKg ?? prev.currentWeightKg,
        targetWeightKg: storedMetrics.targetWeightKg ?? prev.targetWeightKg,
        targetBmi: storedMetrics.targetBmi ?? prev.targetBmi,
        energyLevel: String(storedMetrics.energyLevel ?? prev.energyLevel),
        sleepQuality: String(storedMetrics.sleepQuality ?? prev.sleepQuality),
        digestion: String(storedMetrics.digestion ?? prev.digestion),
        adherence: String(storedMetrics.adherence ?? prev.adherence)
      }));
    }
  }, [patientSession?.id]);

  const latestDietChart = useMemo(() => {
    if (!patientSession?.id) return null;
    return getLatestDietChartForPatient(patientSession.id);
  }, [patientSession?.id]);

  const bmiValue = useMemo(() => {
    const raw = patientRecord?.bmi;
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }, [patientRecord?.bmi]);

  const bmiInfo = useMemo(() => {
    if (!bmiValue) return { label: 'N/A', tone: 'neutral' };
    return getBmiCategory(bmiValue);
  }, [bmiValue]);

  const weightProgress = useMemo(() => {
    const current = Number.parseFloat(metrics?.currentWeightKg);
    const target = Number.parseFloat(metrics?.targetWeightKg);
    if (!Number.isFinite(current) || !Number.isFinite(target) || target === 0) return null;

    const diff = current - target;
    const direction = diff > 0 ? 'to lose' : 'to gain';
    return {
      current,
      target,
      remainingKg: Math.abs(diff),
      direction
    };
  }, [metrics?.currentWeightKg, metrics?.targetWeightKg]);

  const handleSubmitConsultation = () => {
    if (!patientSession?.id) return;
    if (!consultationForm.message.trim()) {
      alert('Please enter a consultation message');
      return;
    }

    const request = {
      id: Date.now(),
      patientInternalId: patientSession.id,
      patientId: patientSession.patientId,
      patientName: patientSession.name,
      email: patientSession.email,
      preferredDate: consultationForm.preferredDate || '',
      message: consultationForm.message.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    saveConsultationRequest(request);
    setConsultationForm({ preferredDate: '', message: '' });
    setActivePanel(null);
    alert('Consultation request sent to doctor');
  };

  const handleSubmitUpdate = () => {
    if (!patientSession?.id) return;
    if (!updateForm.message.trim()) {
      alert('Please enter your update');
      return;
    }

    const update = {
      id: Date.now(),
      patientInternalId: patientSession.id,
      patientId: patientSession.patientId,
      patientName: patientSession.name,
      category: updateForm.category,
      message: updateForm.message.trim(),
      relatedDietChartId: latestDietChart?.id || null,
      metricsSnapshot: metrics || null,
      read: false,
      createdAt: new Date().toISOString()
    };

    savePatientUpdate(update);
    setUpdateForm({ category: 'progress', message: '' });
    setActivePanel(null);
    alert('Update sent to doctor');
  };

  const handleSaveMetrics = () => {
    if (!patientSession?.id) return;

    const nextMetrics = {
      currentWeightKg: metricsDraft.currentWeightKg,
      targetWeightKg: metricsDraft.targetWeightKg,
      targetBmi: metricsDraft.targetBmi,
      energyLevel: Number(metricsDraft.energyLevel),
      sleepQuality: Number(metricsDraft.sleepQuality),
      digestion: Number(metricsDraft.digestion),
      adherence: Number(metricsDraft.adherence)
    };

    savePatientMetrics(patientSession.id, nextMetrics);
    setMetrics(getPatientMetrics(patientSession.id));
    setActivePanel(null);
    alert('Metrics updated');
  };

  return (
    <div className="patient-dashboard-page">
      <Navbar />

      <div className="patient-dashboard-container">
        <div className="patient-welcome">
          <h1>Welcome{patientSession?.name ? `, ${patientSession.name}` : ''}</h1>
          <p>
            {patientSession?.email ? `Email: ${patientSession.email} • ` : ''}
            {patientSession?.patientId ? `Patient No: ${patientSession.patientId}` : ''}
          </p>
          <p>Track your Ayurveda journey and explore personalized recommendations.</p>
        </div>

        <div className="patient-overview-grid">
          <div className="overview-card">
            <div className="overview-header">
              <h3>BMI Status</h3>
              <span className={`pill pill-${bmiInfo.tone}`}>{bmiInfo.label}</span>
            </div>
            <div className="overview-value">{bmiValue ? bmiValue.toFixed(1) : 'N/A'}</div>
            <div className="overview-sub">
              Target BMI: {metrics?.targetBmi || metricsDraft.targetBmi || '22.5'}
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-header">
              <h3>Weight Goal</h3>
              <span className="pill pill-neutral">kg</span>
            </div>
            <div className="overview-value">
              {metrics?.currentWeightKg ? `${metrics.currentWeightKg} kg` : '—'}
            </div>
            <div className="overview-sub">
              {weightProgress
                ? `Target: ${weightProgress.target} kg • ${weightProgress.remainingKg.toFixed(1)} kg ${weightProgress.direction}`
                : (metrics?.targetWeightKg ? `Target: ${metrics.targetWeightKg} kg` : 'Set your weight goal')}
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-header">
              <h3>Health Metrics</h3>
              <span className="pill pill-neutral">1–5</span>
            </div>
            <div className="metrics-list">
              <div className="metric-row"><span>Energy</span><span>{metrics?.energyLevel ?? metricsDraft.energyLevel}</span></div>
              <div className="metric-row"><span>Sleep</span><span>{metrics?.sleepQuality ?? metricsDraft.sleepQuality}</span></div>
              <div className="metric-row"><span>Digestion</span><span>{metrics?.digestion ?? metricsDraft.digestion}</span></div>
              <div className="metric-row"><span>Adherence</span><span>{metrics?.adherence ?? metricsDraft.adherence}</span></div>
            </div>
          </div>
        </div>

        {latestDietChart && (
          <div className="diet-plan-card">
            <div className="diet-plan-header">
              <div>
                <h2>Diet Plan</h2>
                <p>
                  Goal: {latestDietChart?.formData?.dietGoal || 'N/A'} • Target: {latestDietChart?.formData?.targetCalories || 'N/A'} kcal • Generated: {latestDietChart.generatedDate || 'N/A'}
                </p>
              </div>
              <button
                type="button"
                className="btn-outline-small"
                onClick={() => setActivePanel(activePanel === 'diet' ? null : 'diet')}
              >
                {activePanel === 'diet' ? 'Hide' : 'View'}
              </button>
            </div>

            {activePanel === 'diet' && (
              <div className="diet-plan-body">
                <div className="diet-plan-summary">
                  <div className="diet-summary-item">
                    <span className="diet-label">Constitution</span>
                    <span className="diet-value">{latestDietChart.constitution || patientRecord?.dosha || 'Not assessed'}</span>
                  </div>
                  <div className="diet-summary-item">
                    <span className="diet-label">Calories</span>
                    <span className="diet-value">{latestDietChart?.nutrition?.calories || 'N/A'} kcal</span>
                  </div>
                  <div className="diet-summary-item">
                    <span className="diet-label">Protein</span>
                    <span className="diet-value">{latestDietChart?.nutrition?.protein || 'N/A'}g</span>
                  </div>
                  <div className="diet-summary-item">
                    <span className="diet-label">Carbs</span>
                    <span className="diet-value">{latestDietChart?.nutrition?.carbs || 'N/A'}g</span>
                  </div>
                </div>

                <div className="diet-meals">
                  {latestDietChart?.mealPlan?.map((meal, index) => (
                    <div key={`${meal.meal}-${index}`} className="diet-meal">
                      <div className="diet-meal-title">{meal.time} • {meal.meal}</div>
                      <ul className="diet-meal-items">
                        {(meal.items || []).map((item, itemIndex) => (
                          <li key={`${item.name}-${itemIndex}`}>{item.name}{item.description ? ` — ${item.description}` : ''}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="patient-quick-actions">
          <button
            type="button"
            className={`quick-btn ${activePanel === 'consultation' ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'consultation' ? null : 'consultation')}
          >
            📅 Book Consultation
          </button>
          <button
            type="button"
            className={`quick-btn ${activePanel === 'update' ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'update' ? null : 'update')}
          >
            📝 Send Update to Doctor
          </button>
          <button
            type="button"
            className={`quick-btn ${activePanel === 'metrics' ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'metrics' ? null : 'metrics')}
          >
            ⚙️ Update Metrics
          </button>
        </div>

        {activePanel === 'consultation' && (
          <div className="panel-card">
            <h3>Book Consultation</h3>
            <div className="panel-grid">
              <div className="field">
                <label>Preferred date (optional)</label>
                <input
                  type="date"
                  value={consultationForm.preferredDate}
                  onChange={(e) => setConsultationForm((prev) => ({ ...prev, preferredDate: e.target.value }))}
                />
              </div>
              <div className="field full">
                <label>Message *</label>
                <textarea
                  rows="4"
                  placeholder="Tell the doctor what you need help with…"
                  value={consultationForm.message}
                  onChange={(e) => setConsultationForm((prev) => ({ ...prev, message: e.target.value }))}
                />
              </div>
            </div>
            <div className="panel-actions">
              <button className="btn-primary" type="button" onClick={handleSubmitConsultation}>Send Request</button>
              <button className="btn-secondary" type="button" onClick={() => setActivePanel(null)}>Cancel</button>
            </div>
          </div>
        )}

        {activePanel === 'update' && (
          <div className="panel-card">
            <h3>Send Update to Doctor</h3>
            <div className="panel-grid">
              <div className="field">
                <label>Category</label>
                <select
                  value={updateForm.category}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, category: e.target.value }))}
                >
                  <option value="progress">Progress</option>
                  <option value="diet">Diet Plan</option>
                  <option value="symptoms">Symptoms</option>
                </select>
              </div>
              <div className="field full">
                <label>Update *</label>
                <textarea
                  rows="4"
                  placeholder="Example: I followed the diet for 5 days, digestion improved, but I feel low energy in mornings…"
                  value={updateForm.message}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, message: e.target.value }))}
                />
              </div>
              {latestDietChart && (
                <div className="hint full">
                  This update will be linked to your latest diet chart.
                </div>
              )}
            </div>
            <div className="panel-actions">
              <button className="btn-primary" type="button" onClick={handleSubmitUpdate}>Send Update</button>
              <button className="btn-secondary" type="button" onClick={() => setActivePanel(null)}>Cancel</button>
            </div>
          </div>
        )}

        {activePanel === 'metrics' && (
          <div className="panel-card">
            <h3>Update Metrics</h3>
            <div className="panel-grid">
              <div className="field">
                <label>Current weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={metricsDraft.currentWeightKg}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, currentWeightKg: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Target weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={metricsDraft.targetWeightKg}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, targetWeightKg: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Target BMI</label>
                <input
                  type="number"
                  step="0.1"
                  value={metricsDraft.targetBmi}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, targetBmi: e.target.value }))}
                />
              </div>

              <div className="field">
                <label>Energy (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={metricsDraft.energyLevel}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, energyLevel: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Sleep (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={metricsDraft.sleepQuality}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, sleepQuality: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Digestion (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={metricsDraft.digestion}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, digestion: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Adherence (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={metricsDraft.adherence}
                  onChange={(e) => setMetricsDraft((prev) => ({ ...prev, adherence: e.target.value }))}
                />
              </div>
            </div>
            <div className="panel-actions">
              <button className="btn-primary" type="button" onClick={handleSaveMetrics}>Save</button>
              <button className="btn-secondary" type="button" onClick={() => setActivePanel(null)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="patient-footer-actions">
          <button className="btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
