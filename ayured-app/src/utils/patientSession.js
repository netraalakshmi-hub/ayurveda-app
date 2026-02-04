const PATIENTS_KEY = 'patients';
const SESSION_KEY = 'currentPatientSession';
const DIET_CHARTS_KEY = 'dietCharts';
const PATIENT_METRICS_KEY = 'patientMetrics';
const CONSULTATION_REQUESTS_KEY = 'consultationRequests';
const PATIENT_UPDATES_KEY = 'patientUpdates';

export function loadPatients() {
  try {
    const raw = localStorage.getItem(PATIENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function findPatientByIdentifier(identifierRaw) {
  const identifier = (identifierRaw || '').trim();
  if (!identifier) return null;

  const patients = loadPatients();
  const lower = identifier.toLowerCase();

  return (
    patients.find((p) => (p.email || '').toLowerCase() === lower) ||
    patients.find((p) => (p.patientId || '').toLowerCase() === lower)
  );
}

export function setCurrentPatientSession(patient) {
  if (!patient) return;

  const session = {
    id: patient.id,
    patientId: patient.patientId,
    name: patient.name,
    email: patient.email || ''
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getCurrentPatientSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearCurrentPatientSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function loadDietCharts() {
  try {
    const raw = localStorage.getItem(DIET_CHARTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDietChart(chart) {
  if (!chart) return;

  const existing = loadDietCharts();
  const next = [...existing, chart];
  localStorage.setItem(DIET_CHARTS_KEY, JSON.stringify(next));
}

export function getLatestDietChartForPatient(patientInternalId) {
  const all = loadDietCharts();
  const forPatient = all.filter((c) => c?.patient?.id === patientInternalId);
  if (forPatient.length === 0) return null;
  return forPatient.reduce((latest, current) => (current.id > latest.id ? current : latest));
}

export function getPatientByInternalId(patientInternalId) {
  if (!patientInternalId) return null;
  const patients = loadPatients();
  return patients.find((p) => p?.id === patientInternalId) || null;
}

function safeParseArray(raw) {
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeParseObject(raw) {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function loadPatientMetricsMap() {
  return safeParseObject(localStorage.getItem(PATIENT_METRICS_KEY));
}

export function getPatientMetrics(patientInternalId) {
  if (!patientInternalId) return null;
  const map = loadPatientMetricsMap();
  return map[String(patientInternalId)] || null;
}

export function savePatientMetrics(patientInternalId, metrics) {
  if (!patientInternalId || !metrics) return;
  const map = loadPatientMetricsMap();
  map[String(patientInternalId)] = {
    ...map[String(patientInternalId)],
    ...metrics,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(PATIENT_METRICS_KEY, JSON.stringify(map));
}

export function loadConsultationRequests() {
  return safeParseArray(localStorage.getItem(CONSULTATION_REQUESTS_KEY));
}

export function saveConsultationRequest(request) {
  if (!request) return;
  const existing = loadConsultationRequests();
  const next = [...existing, request];
  localStorage.setItem(CONSULTATION_REQUESTS_KEY, JSON.stringify(next));
}

export function updateConsultationRequestStatus(requestId, status) {
  if (!requestId) return;
  const existing = loadConsultationRequests();
  const next = existing.map((r) =>
    r?.id === requestId
      ? { ...r, status: status || r.status, updatedAt: new Date().toISOString() }
      : r
  );
  localStorage.setItem(CONSULTATION_REQUESTS_KEY, JSON.stringify(next));
}

export function loadPatientUpdates() {
  return safeParseArray(localStorage.getItem(PATIENT_UPDATES_KEY));
}

export function savePatientUpdate(update) {
  if (!update) return;
  const existing = loadPatientUpdates();
  const next = [...existing, update];
  localStorage.setItem(PATIENT_UPDATES_KEY, JSON.stringify(next));
}

export function markPatientUpdateRead(updateId) {
  if (!updateId) return;
  const existing = loadPatientUpdates();
  const next = existing.map((u) =>
    u?.id === updateId
      ? { ...u, read: true, updatedAt: new Date().toISOString() }
      : u
  );
  localStorage.setItem(PATIENT_UPDATES_KEY, JSON.stringify(next));
}
