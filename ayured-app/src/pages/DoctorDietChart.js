import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/DoctorDietChart.css';
import { saveDietChart } from '../utils/patientSession';
import { calculateRecipeNutrients, getAllRecipes } from '../utils/recipeUtils';

function DoctorDietChart() {
  const [currentStep, setCurrentStep] = useState('create'); // 'create' or 'preview'
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    targetCalories: '',
    dietGoal: '',
    dietaryRestrictions: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    waterIntake: '',
    mealFrequency: '',
    chartDuration: ''
  });

  const [mealPlan, setMealPlan] = useState([
    { time: '6:00 AM', meal: 'Early Morning', items: [{ name: 'Warm Water with Lemon', description: 'Detoxifying, Pitta pacifying', calories: 7 }] },
    { time: '8:00 AM', meal: 'Breakfast', items: [{ name: 'Oats Porridge with Almonds', description: 'Nourishing, Vata pacifying', calories: 218 }] },
    { time: '10:30 AM', meal: 'Mid Morning', items: [{ name: 'Fresh Fruit (Seasonal)', description: 'Cooling, energizing', calories: 80 }] },
    { time: '1:00 PM', meal: 'Lunch', items: [{ name: 'Rice with Dal and Vegetables', description: 'Balanced, tridoshic', calories: 450 }] },
    { time: '4:00 PM', meal: 'Evening Snack', items: [{ name: 'Herbal Tea with Nuts', description: 'Light, warming', calories: 120 }] },
    { time: '7:00 PM', meal: 'Dinner', items: [{ name: 'Light Soup with Roti', description: 'Easy to digest', calories: 280 }] },
    { time: '9:00 PM', meal: 'Before Bed', items: [{ name: 'Warm Milk with Turmeric', description: 'Calming, sleep-inducing', calories: 82 }] }
  ]);

  const [generatedChart, setGeneratedChart] = useState(null);
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipeForMeal, setSelectedRecipeForMeal] = useState(null);

  // Load patients from localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Load recipes
  useEffect(() => {
    const allRecipes = getAllRecipes();
    setAvailableRecipes(allRecipes);
  }, []);

  const dietGoals = [
    'Weight Loss',
    'Weight Gain',
    'Muscle Building',
    'Diabetes Management',
    'Heart Health',
    'Digestive Health',
    'General Wellness',
    'Dosha Balance'
  ];

  const mealFrequencies = ['3 meals', '4 meals', '5 meals', '6 meals'];
  const chartDurations = ['1 week', '2 weeks', '1 month', '3 months'];

  const handlePatientSelect = (e) => {
    const patientId = parseInt(e.target.value);
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addMealItem = (mealIndex) => {
    const newMealPlan = [...mealPlan];
    newMealPlan[mealIndex].items.push({ name: '', description: '', calories: 0 });
    setMealPlan(newMealPlan);
  };

  const updateMealItem = (mealIndex, itemIndex, field, value) => {
    const newMealPlan = [...mealPlan];
    newMealPlan[mealIndex].items[itemIndex][field] = value;
    setMealPlan(newMealPlan);
  };

  const removeMealItem = (mealIndex, itemIndex) => {
    const newMealPlan = [...mealPlan];
    newMealPlan[mealIndex].items.splice(itemIndex, 1);
    setMealPlan(newMealPlan);
  };

  const addRecipeToMeal = (mealIndex, recipe) => {
    const nutrients = calculateRecipeNutrients(recipe.ingredients);
    const newMealPlan = [...mealPlan];
    newMealPlan[mealIndex].items.push({
      name: recipe.name,
      description: `${recipe.description} - ${recipe.servings} servings`,
      calories: nutrients.calories,
      recipe: recipe.id,
      nutrients: nutrients
    });
    setMealPlan(newMealPlan);
    setShowRecipeModal(false);
    setSelectedRecipeForMeal(null);
  };

  const calculateTotalNutrition = () => {
    const totalCalories = mealPlan.reduce((sum, meal) => {
      return sum + meal.items.reduce((mealSum, item) => mealSum + (parseFloat(item.calories) || 0), 0);
    }, 0);

    return {
      calories: Math.round(totalCalories),
      protein: formData.protein || '45',
      carbs: formData.carbs || '180',
      fat: formData.fat || '50'
    };
  };

  const generateChart = () => {
    if (!selectedPatient) {
      alert('Please select a patient');
      return;
    }

    if (!formData.targetCalories || !formData.dietGoal) {
      alert('Please fill in target calories and diet goal');
      return;
    }

    const nutrition = calculateTotalNutrition();
    
    const chart = {
      id: Date.now(),
      patient: selectedPatient,
      formData,
      mealPlan,
      nutrition,
      generatedDate: new Date().toLocaleDateString(),
      constitution: selectedPatient.dosha || 'Not assessed'
    };

    setGeneratedChart(chart);
    saveDietChart(chart);
    setCurrentStep('preview');
  };

  const printChart = () => {
    window.print();
  };

  const exportToPDF = () => {
    // Trigger print dialog which can save as PDF
    window.print();
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setFormData({
      targetCalories: '',
      dietGoal: '',
      dietaryRestrictions: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      waterIntake: '',
      mealFrequency: '',
      chartDuration: ''
    });
    setCurrentStep('create');
    setGeneratedChart(null);
  };

  if (currentStep === 'preview' && generatedChart) {
    return (
      <div className="diet-chart-page">
        <Navbar />
        <div className="dashboard-layout">
          <Sidebar />
          <div className="diet-chart-content">
            {/* Action Buttons */}
            <div className="chart-actions no-print">
              <button className="btn-back" onClick={() => setCurrentStep('create')}>
                ← Back to Create
              </button>
              <div className="action-buttons">
                <button className="btn-print" onClick={printChart}>
                  🖨️ Print Chart
                </button>
                <button className="btn-export" onClick={exportToPDF}>
                  📄 Export PDF
                </button>
                <button className="btn-new" onClick={resetForm}>
                  ➕ New Chart
                </button>
              </div>
            </div>

            {/* Printable Chart */}
            <div className="printable-chart">
              {/* Header */}
              <div className="chart-header-banner">
                <div className="banner-content">
                  <h1>Personalized Diet Chart Generator</h1>
                  <p>Create customized Ayurvedic diet plans based on individual constitution and health goals</p>
                </div>
              </div>

              {/* Chart Title */}
              <div className="chart-title-section">
                <h2>Ayurvedic Diet Chart</h2>
                <p className="generated-date">Generated on {generatedChart.generatedDate}</p>
              </div>

              {/* Patient Info */}
              <div className="patient-info-grid">
                <div className="info-item">
                  <span className="info-label">Patient</span>
                  <span className="info-value">{generatedChart.patient.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age / Gender</span>
                  <span className="info-value">{generatedChart.patient.age} yrs / {generatedChart.patient.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Constitution</span>
                  <span className="info-value">{generatedChart.constitution}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Daily Calories</span>
                  <span className="info-value">{generatedChart.nutrition.calories} / {generatedChart.formData.targetCalories} kcal</span>
                </div>
              </div>

              {/* Daily Meal Plan */}
              <div className="meal-plan-section">
                <h3>🍽️ Daily Meal Plan</h3>
                
                {generatedChart.mealPlan.map((meal, index) => (
                  <div key={index} className="meal-time-block">
                    <div className="meal-time-header">
                      <span className="time-icon">🕐</span>
                      <div className="meal-time-info">
                        <h4>{meal.meal}</h4>
                        <span className="meal-time">{meal.time}</span>
                      </div>
                    </div>
                    
                    <div className="meal-items-list">
                      {meal.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="meal-item-card">
                          <div className="item-info">
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="meal-total">
                      Meal total: {meal.items.reduce((sum, item) => sum + (parseFloat(item.calories) || 0), 0)} calories
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutritional Summary */}
              <div className="nutritional-summary-section">
                <h3>Nutritional Summary</h3>
                
                <div className="nutrition-cards">
                  <div className="nutrition-card calories">
                    <span className="nutrition-value">{generatedChart.nutrition.calories}</span>
                    <span className="nutrition-label">Total Calories</span>
                  </div>
                  <div className="nutrition-card protein">
                    <span className="nutrition-value">{generatedChart.nutrition.protein}g</span>
                    <span className="nutrition-label">Protein</span>
                  </div>
                  <div className="nutrition-card carbs">
                    <span className="nutrition-value">{generatedChart.nutrition.carbs}g</span>
                    <span className="nutrition-label">Carbohydrates</span>
                  </div>
                  <div className="nutrition-card fat">
                    <span className="nutrition-value">{generatedChart.nutrition.fat}g</span>
                    <span className="nutrition-label">Fat</span>
                  </div>
                </div>
              </div>

              {/* Ayurvedic Guidelines */}
              <div className="ayurvedic-guidelines-section">
                <div className="guidelines-column">
                  <h3>General Recommendations</h3>
                  <ul>
                    <li>Eat in a calm, peaceful environment</li>
                    <li>Chew food thoroughly and eat slowly</li>
                    <li>Avoid drinking water during meals</li>
                    <li>Include all six tastes in your diet</li>
                    <li>Eat according to your hunger level</li>
                  </ul>
                </div>
                
                <div className="guidelines-column">
                  <h3>For Your Constitution</h3>
                  <ul>
                    <li>Favor warm, cooked foods</li>
                    <li>Include ghee in your meals</li>
                    <li>Avoid cold foods and drinks</li>
                    <li>Drink warm water throughout the day</li>
                    <li>Maintain regular meal times</li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="chart-footer">
                <p>This diet chart is personalized based on Ayurvedic principles. Consult with your Ayurvedic practitioner for any modifications.</p>
                <p className="footer-note">Generated by AyurNutri - Ayurvedic Diet Management System</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="diet-chart-page">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="diet-chart-content">
          {/* Header */}
          <div className="page-header">
            <div className="header-content">
              <h1>📋 Diet Charts</h1>
              <p className="subtitle">Welcome, ashish kumar</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="chart-tabs">
            <button className="tab-button active">Create Chart</button>
            <button className="tab-button">Preview & Generate</button>
          </div>

          {/* Create Chart Form */}
          <div className="create-chart-form">
            {/* Patient Selection & Goals */}
            <div className="form-section">
              <h2>👤 Patient Selection & Goals</h2>
              <p className="section-description">Select patient and define dietary goals for the chart</p>

              <div className="form-grid">
                <div className="form-group">
                  <label>Select Patient</label>
                  <select
                    value={selectedPatient?.id || ''}
                    onChange={handlePatientSelect}
                    className="form-select"
                  >
                    <option value="">Choose patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - Age: {patient.age}, {patient.gender}, Dosha: {patient.dosha || 'N/A'}
                      </option>
                    ))}
                  </select>
                  {selectedPatient && (
                    <div className="selected-patient-info" style={{
                      marginTop: '10px',
                      padding: '12px',
                      backgroundColor: '#e8f5e9',
                      borderRadius: '8px',
                      border: '1px solid #81c784'
                    }}>
                      <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2e7d32' }}>
                        Selected Patient Details:
                      </p>
                      <p style={{ margin: '3px 0', fontSize: '14px', color: '#424242' }}>
                        <strong>Name:</strong> {selectedPatient.name}
                      </p>
                      <p style={{ margin: '3px 0', fontSize: '14px', color: '#424242' }}>
                        <strong>Patient ID:</strong> {selectedPatient.patientId}
                      </p>
                      <p style={{ margin: '3px 0', fontSize: '14px', color: '#424242' }}>
                        <strong>Age:</strong> {selectedPatient.age} years | <strong>Gender:</strong> {selectedPatient.gender}
                      </p>
                      <p style={{ margin: '3px 0', fontSize: '14px', color: '#424242' }}>
                        <strong>Dosha:</strong> {selectedPatient.dosha || 'Not assessed'} | <strong>Constitution:</strong> {selectedPatient.constitution || 'Not assessed'}
                      </p>
                      <p style={{ margin: '3px 0', fontSize: '14px', color: '#424242' }}>
                        <strong>BMI:</strong> {selectedPatient.bmi || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Target Daily Calories</label>
                  <input
                    type="number"
                    name="targetCalories"
                    value={formData.targetCalories}
                    onChange={handleInputChange}
                    placeholder="e.g., 1800"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Diet Goal</label>
                <select
                  name="dietGoal"
                  value={formData.dietGoal}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select primary diet goal</option>
                  {dietGoals.map(goal => (
                    <option key={goal} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Dietary Restrictions & Notes</label>
                <textarea
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  placeholder="Any food allergies, dislikes, or special requirements..."
                  rows="3"
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Nutritional Targets */}
            <div className="form-section">
              <h2>🎯 Nutritional Targets</h2>
              <p className="section-description">Define macro and micronutrient targets based on patient needs</p>

              <div className="form-grid-4">
                <div className="form-group">
                  <label>Protein (g)</label>
                  <input
                    type="number"
                    name="protein"
                    value={formData.protein}
                    onChange={handleInputChange}
                    placeholder="e.g., 65"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Carbs (g)</label>
                  <input
                    type="number"
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleInputChange}
                    placeholder="e.g., 200"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Fat (g)</label>
                  <input
                    type="number"
                    name="fat"
                    value={formData.fat}
                    onChange={handleInputChange}
                    placeholder="e.g., 60"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Fiber (g)</label>
                  <input
                    type="number"
                    name="fiber"
                    value={formData.fiber}
                    onChange={handleInputChange}
                    placeholder="e.g., 25"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Water Intake (L)</label>
                  <input
                    type="number"
                    step="0.5"
                    name="waterIntake"
                    value={formData.waterIntake}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.5"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Meal Frequency</label>
                  <select
                    name="mealFrequency"
                    value={formData.mealFrequency}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {mealFrequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Chart Duration</label>
                  <select
                    name="chartDuration"
                    value={formData.chartDuration}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {chartDurations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Meal Plan Editor */}
            <div className="form-section">
              <h2>🍽️ Daily Meal Plan</h2>
              <p className="section-description">Customize meal items and timings</p>

              {mealPlan.map((meal, mealIndex) => (
                <div key={mealIndex} className="meal-editor">
                  <div className="meal-editor-header">
                    <h4>{meal.meal} - {meal.time}</h4>
                    <div className="meal-actions">
                      <button
                        className="btn-add-item"
                        onClick={() => addMealItem(mealIndex)}
                      >
                        + Add Item
                      </button>
                      <button
                        className="btn-add-recipe"
                        onClick={() => {
                          setSelectedRecipeForMeal(mealIndex);
                          setShowRecipeModal(true);
                        }}
                        title="Add recipe with automatic nutrient analysis"
                      >
                        🍳 Add Recipe
                      </button>
                    </div>
                  </div>

                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="meal-item-editor">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateMealItem(mealIndex, itemIndex, 'name', e.target.value)}
                        placeholder="Food item name"
                        className="item-name-input"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateMealItem(mealIndex, itemIndex, 'description', e.target.value)}
                        placeholder="Description (e.g., Cooling, Vata pacifying)"
                        className="item-desc-input"
                      />
                      <input
                        type="number"
                        value={item.calories}
                        onChange={(e) => updateMealItem(mealIndex, itemIndex, 'calories', e.target.value)}
                        placeholder="Calories"
                        className="item-cal-input"
                      />
                      {meal.items.length > 1 && (
                        <button
                          className="btn-remove-item"
                          onClick={() => removeMealItem(mealIndex, itemIndex)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button className="btn-preview" onClick={generateChart}>
                👁️ Preview & Generate Chart
              </button>
              <button className="btn-reset" onClick={resetForm}>
                Reset Form
              </button>
            </div>

            {/* Recipe Selection Modal */}
            {showRecipeModal && (
              <div className="recipe-modal-overlay">
                <div className="recipe-modal">
                  <div className="recipe-modal-header">
                    <h3>Select Recipe for {mealPlan[selectedRecipeForMeal]?.meal || 'Meal'}</h3>
                    <button
                      className="modal-close"
                      onClick={() => {
                        setShowRecipeModal(false);
                        setSelectedRecipeForMeal(null);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="recipe-modal-content">
                    <div className="recipe-grid">
                      {availableRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="recipe-card-selectable"
                          onClick={() => addRecipeToMeal(selectedRecipeForMeal, recipe)}
                        >
                          <div className="recipe-card-header">
                            <h4>{recipe.name}</h4>
                            <span className="recipe-servings">{recipe.servings} servings</span>
                          </div>
                          <p className="recipe-description">{recipe.description}</p>
                          <div className="recipe-meta">
                            <span className="recipe-time">⏱️ {recipe.prepTime || 'N/A'}</span>
                            <span className="recipe-difficulty">{recipe.difficulty}</span>
                          </div>
                          <div className="recipe-doshas">
                            {recipe.suitableFor && recipe.suitableFor.map((dosha) => (
                              <span key={dosha} className={`dosha-badge ${dosha.toLowerCase()}`}>
                                {dosha}
                              </span>
                            ))}
                          </div>
                          <button className="btn-select-recipe">
                            Select Recipe
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDietChart;
