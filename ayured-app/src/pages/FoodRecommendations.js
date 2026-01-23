import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { foodRecommendations, mealTimings, seasonalDiets } from '../utils/doshaUtils';
import '../styles/FoodRecommendations.css';

function FoodRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDosha, setUserDosha] = useState(location.state?.dosha || '');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [healthIssues, setHealthIssues] = useState([]);
  const [season, setSeason] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const healthIssueOptions = [
    'Digestion problems',
    'Sleep issues',
    'Weight management',
    'Energy levels',
    'Inflammation',
    'Anxiety/Stress'
  ];

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const toggleHealthIssue = (issue) => {
    setHealthIssues(prev =>
      prev.includes(issue)
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDosha || !age || !gender || !height || !weight || !season) {
      alert('Please fill in all fields');
      return;
    }
    setShowRecommendations(true);
  };

  if (showRecommendations) {
    const dosha = userDosha;
    const foods = foodRecommendations[dosha];
    const timings = mealTimings[dosha];
    const seasonal = seasonalDiets[dosha][season.toLowerCase()];

    return (
      <div className="food-page">
        <Navbar />
        <div className="recommendations-container">
          <div className="recommendations-header">
            <h1>Personalized Food Recommendations</h1>
            <p>Based on {dosha} constitution and your health profile</p>
          </div>

          <div className="user-profile-summary">
            <h3>Your Profile</h3>
            <p>{age} years old • {gender} • {height}cm height • {weight}kg weight • {season}</p>
            {healthIssues.length > 0 && (
              <p className="issues">Health Concerns: {healthIssues.join(', ')}</p>
            )}
          </div>

          <div className="recommendations-grid">
            {/* Foods to Eat */}
            <div className="recommendation-card eating">
              <h2>✓ Foods to Eat</h2>
              <p className="subtitle">Include these in your daily diet</p>
              <ul className="food-list">
                {foods.toEat.map((food, idx) => (
                  <li key={idx}>{food}</li>
                ))}
              </ul>
            </div>

            {/* Foods to Avoid */}
            <div className="recommendation-card avoiding">
              <h2>✗ Foods to Avoid</h2>
              <p className="subtitle">Reduce or eliminate from your diet</p>
              <ul className="food-list">
                {foods.toAvoid.map((food, idx) => (
                  <li key={idx}>{food}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meal Timings */}
          <div className="meal-timing-card">
            <h2>⏰ Recommended Meal Timings</h2>
            <p className="timing-note">{timings.note}</p>
            <div className="timings-grid">
              <div className="timing-slot">
                <h4>Breakfast</h4>
                <p>{timings.breakfast}</p>
              </div>
              <div className="timing-slot">
                <h4>Lunch</h4>
                <p>{timings.lunch}</p>
              </div>
              <div className="timing-slot">
                <h4>Dinner</h4>
                <p>{timings.dinner}</p>
              </div>
            </div>
          </div>

          {/* Seasonal Diet */}
          <div className="seasonal-card">
            <h2>🌍 {season} Diet Guidelines</h2>
            <p>{seasonal}</p>
          </div>

          {/* Sample Daily Menu */}
          <div className="sample-menu-card">
            <h2>📋 Sample Daily Menu</h2>
            <div className="menu-items">
              <div className="menu-item">
                <h4>Breakfast</h4>
                <p>{getSampleBreakfast(dosha)}</p>
              </div>
              <div className="menu-item">
                <h4>Lunch</h4>
                <p>{getSampleLunch(dosha)}</p>
              </div>
              <div className="menu-item">
                <h4>Dinner</h4>
                <p>{getSampleDinner(dosha)}</p>
              </div>
              <div className="menu-item">
                <h4>Snacks</h4>
                <p>{getSampleSnacks(dosha)}</p>
              </div>
            </div>
          </div>

          <div className="recommendations-actions">
            <button className="btn-insights" onClick={() => navigate('/smart-insights', { state: { dosha } })}>
              View Smart Insights
            </button>
            <button className="btn-modify" onClick={() => setShowRecommendations(false)}>
              Modify Profile
            </button>
            <button className="btn-home" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="food-page">
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          <h1>AI-Powered Food Recommendations</h1>
          <p>Get personalized diet suggestions based on your profile</p>

          <form onSubmit={handleSubmit} className="recommendations-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Dosha Type</label>
                <select value={userDosha} onChange={(e) => setUserDosha(e.target.value)} required>
                  <option value="">Select Dosha</option>
                  <option value="Vata">Vata</option>
                  <option value="Pitta">Pitta</option>
                  <option value="Kapha">Kapha</option>
                </select>
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                  required
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  required
                />
              </div>

              <div className="form-group">
                <label>Current Season</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)} required>
                  <option value="">Select Season</option>
                  {seasons.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Health Concerns (select if applicable)</label>
              <div className="checkbox-group">
                {healthIssueOptions.map(issue => (
                  <label key={issue} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={healthIssues.includes(issue)}
                      onChange={() => toggleHealthIssue(issue)}
                    />
                    {issue}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">Get Recommendations</button>
              <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Sample menu generators
const getSampleBreakfast = (dosha) => {
  const menus = {
    Vata: 'Warm oatmeal with ghee, dates, and ginger tea',
    Pitta: 'Cooling smoothie with coconut milk, dates, and mint',
    Kapha: 'Light toast with almond butter and herbal tea'
  };
  return menus[dosha];
};

const getSampleLunch = (dosha) => {
  const menus = {
    Vata: 'Rice with warm vegetable stew and sesame oil',
    Pitta: 'Barley with cooling vegetables and coconut oil',
    Kapha: 'Light soup with lentils and warming spices'
  };
  return menus[dosha];
};

const getSampleDinner = (dosha) => {
  const menus = {
    Vata: 'Wheat bread with warm lentils and ghee',
    Pitta: 'Rice with steamed vegetables and mild herbs',
    Kapha: 'Light vegetable stir-fry with mustard oil and spices'
  };
  return menus[dosha];
};

const getSampleSnacks = (dosha) => {
  const menus = {
    Vata: 'Warm milk with dates and cardamom',
    Pitta: 'Coconut water or cooling herbal tea',
    Kapha: 'Ginger tea with honey or herbal infusions'
  };
  return menus[dosha];
};

export default FoodRecommendations;
