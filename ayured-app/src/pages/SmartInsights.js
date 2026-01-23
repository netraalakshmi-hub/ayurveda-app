import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { generateSmartInsights } from '../utils/doshaUtils';
import '../styles/SmartInsights.css';

function SmartInsights() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDosha, setSelectedDosha] = useState(location.state?.dosha || 'Vata');
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [insights, setInsights] = useState(generateSmartInsights(selectedDosha));

  const healthIssues = [
    { id: 'digestion', label: 'Digestion Problems' },
    { id: 'sleep', label: 'Sleep Issues' },
    { id: 'stress', label: 'Stress & Anxiety' },
    { id: 'weight', label: 'Weight Management' },
    { id: 'energy', label: 'Low Energy' }
  ];

  const doshas = ['Vata', 'Pitta', 'Kapha'];

  const handleDoshaChange = (dosha) => {
    setSelectedDosha(dosha);
    setInsights(generateSmartInsights(dosha, selectedIssues));
  };

  const toggleIssue = (issue) => {
    const updated = selectedIssues.includes(issue)
      ? selectedIssues.filter(i => i !== issue)
      : [...selectedIssues, issue];
    setSelectedIssues(updated);
    setInsights(generateSmartInsights(selectedDosha, updated));
  };

  const getDoshaColor = (dosha) => {
    const colors = { Vata: '#d4a574', Pitta: '#ff6b6b', Kapha: '#4ecdc4' };
    return colors[dosha];
  };

  const getDoshaDescription = (dosha) => {
    const descriptions = {
      Vata: 'Air & Ether - Creative, adaptable, but prone to anxiety',
      Pitta: 'Fire & Water - Driven, intelligent, but prone to inflammation',
      Kapha: 'Water & Earth - Stable, compassionate, but prone to sluggishness'
    };
    return descriptions[dosha];
  };

  return (
    <div className="insights-page">
      <Navbar />
      <div className="insights-container">
        <div className="insights-header">
          <h1>Smart Health Insights</h1>
          <p>Personalized AI-driven recommendations for your dosha type</p>
        </div>

        <div className="dosha-selector">
          <h3>Select Your Dosha</h3>
          <div className="dosha-buttons">
            {doshas.map(dosha => (
              <button
                key={dosha}
                className={`dosha-btn ${selectedDosha === dosha ? 'active' : ''}`}
                onClick={() => handleDoshaChange(dosha)}
                style={selectedDosha === dosha ? { backgroundColor: getDoshaColor(dosha), color: 'white' } : {}}
              >
                {dosha}
              </button>
            ))}
          </div>
          <p className="dosha-description">{getDoshaDescription(selectedDosha)}</p>
        </div>

        <div className="insights-layout">
          <div className="insights-sidebar">
            <div className="filter-card">
              <h3>Health Concerns</h3>
              <p className="filter-subtitle">Add specific concerns for targeted insights</p>
              <div className="checkbox-group">
                {healthIssues.map(issue => (
                  <label key={issue.id} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIssues.includes(issue.id)}
                      onChange={() => toggleIssue(issue.id)}
                    />
                    {issue.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="insights-main">
            <div className={`insights-card ${selectedDosha.toLowerCase()}`}>
              <h2>{selectedDosha} Insights</h2>
              <div className="insights-list">
                {insights.map((insight, idx) => (
                  <div key={idx} className="insight-item">
                    <p>{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="daily-tips-card">
              <h2>Daily Wellness Tips</h2>
              <div className="tips-grid">
                <div className="tip-card">
                  <h4>☕ Morning Routine</h4>
                  <p>{getmorningTip(selectedDosha)}</p>
                </div>
                <div className="tip-card">
                  <h4>🧘 Exercise</h4>
                  <p>{getExerciseTip(selectedDosha)}</p>
                </div>
                <div className="tip-card">
                  <h4>🌙 Evening Routine</h4>
                  <p>{getEveningTip(selectedDosha)}</p>
                </div>
                <div className="tip-card">
                  <h4>💧 Hydration</h4>
                  <p>{getHydrationTip(selectedDosha)}</p>
                </div>
              </div>
            </div>

            <div className="seasonal-tips-card">
              <h2>Seasonal Adjustments</h2>
              <div className="seasonal-grid">
                <div className="seasonal-item spring">
                  <h4>🌸 Spring</h4>
                  <p>{getSeasonalTip(selectedDosha, 'spring')}</p>
                </div>
                <div className="seasonal-item summer">
                  <h4>☀️ Summer</h4>
                  <p>{getSeasonalTip(selectedDosha, 'summer')}</p>
                </div>
                <div className="seasonal-item fall">
                  <h4>🍂 Fall</h4>
                  <p>{getSeasonalTip(selectedDosha, 'fall')}</p>
                </div>
                <div className="seasonal-item winter">
                  <h4>❄️ Winter</h4>
                  <p>{getSeasonalTip(selectedDosha, 'winter')}</p>
                </div>
              </div>
            </div>

            <div className="remedies-card">
              <h2>Quick Remedies for Common Issues</h2>
              <div className="remedies-grid">
                {getQuickRemedies(selectedDosha).map((remedy, idx) => (
                  <div key={idx} className="remedy-item">
                    <h4>{remedy.issue}</h4>
                    <p>{remedy.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="insights-actions">
          <button className="btn-food" onClick={() => navigate('/food-recommendations', { state: { dosha: selectedDosha } })}>
            Get Food Recommendations
          </button>
          <button className="btn-back" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions for generating tips
const getmorningTip = (dosha) => {
  const tips = {
    Vata: 'Warm water with lemon, gentle yoga, oil massage to ground yourself',
    Pitta: 'Cool water, calming meditation, avoid intense sun exposure',
    Kapha: 'Brisk walk, stimulating exercise, dry massage to energize'
  };
  return tips[dosha];
};

const getExerciseTip = (dosha) => {
  const tips = {
    Vata: 'Gentle yoga, tai chi, walking. Avoid overexertion.',
    Pitta: 'Swimming, cool environments, moderate intensity workouts',
    Kapha: 'Vigorous exercise, dancing, running. Push yourself.'
  };
  return tips[dosha];
};

const getEveningTip = (dosha) => {
  const tips = {
    Vata: 'Warm milk with spices, calming herbs, early bedtime',
    Pitta: 'Cool herbal tea, relaxation, avoid heavy foods',
    Kapha: 'Light activities, avoid napping, stimulating conversation'
  };
  return tips[dosha];
};

const getHydrationTip = (dosha) => {
  const tips = {
    Vata: 'Warm water throughout the day. Avoid cold drinks.',
    Pitta: 'Coconut water, cooling herbal teas, room temperature water',
    Kapha: 'Warm ginger tea, herbal infusions, limited cold drinks'
  };
  return tips[dosha];
};

const getSeasonalTip = (dosha, season) => {
  const tips = {
    Vata: {
      spring: 'Increase oils and warming foods',
      summer: 'Balance heat with grounding practices',
      fall: 'Maximum warmth and routine establishment',
      winter: 'Extra heat, oils, and spices'
    },
    Pitta: {
      spring: 'Cooling herbs and fresh vegetables',
      summer: 'Maximize cooling; avoid heat exposure',
      fall: 'Balance with mild warm spices',
      winter: 'Warm but moderate spices'
    },
    Kapha: {
      spring: 'Light, warming, avoid heavy foods',
      summer: 'Light meals, increase activity',
      fall: 'Warming spices, light digestion support',
      winter: 'Maximum heat and movement'
    }
  };
  return tips[dosha][season];
};

const getQuickRemedies = (dosha) => {
  const remedies = {
    Vata: [
      { issue: 'Anxiety', solution: 'Warm milk, grounding practices, oil massage' },
      { issue: 'Dry Skin', solution: 'Sesame oil massage, hydrating foods' },
      { issue: 'Insomnia', solution: 'Regular bedtime, warm milk with spices' },
      { issue: 'Constipation', solution: 'Warm water, ghee, increase oils' }
    ],
    Pitta: [
      { issue: 'Acidity', solution: 'Coconut water, cooling herbs, avoid spice' },
      { issue: 'Inflammation', solution: 'Turmeric, coconut oil, cooling foods' },
      { issue: 'Anger', solution: 'Meditation, cooling activities, mint tea' },
      { issue: 'Skin Issues', solution: 'Coconut oil, cooling diet, reduce heat' }
    ],
    Kapha: [
      { issue: 'Sluggishness', solution: 'Exercise, ginger tea, light diet' },
      { issue: 'Weight Gain', solution: 'Warm spices, reduce oils, active lifestyle' },
      { issue: 'Congestion', solution: 'Warming spices, dry foods, exercise' },
      { issue: 'Depression', solution: 'Movement, warm spices, social activity' }
    ]
  };
  return remedies[dosha];
};

export default SmartInsights;
