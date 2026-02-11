import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/RecipeManagement.css';
import {
  sampleRecipes,
  loadCustomRecipes,
  saveCustomRecipe,
  deleteCustomRecipe,
  calculateRecipeNutrients,
  nutrientDatabase,
  getAvailableIngredients
} from '../utils/recipeUtils';

function RecipeManagement() {
  const [recipes, setRecipes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDosha, setFilterDosha] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    servings: '2',
    prepTime: '',
    cookTime: '',
    difficulty: 'Easy',
    suitableFor: [],
    ingredients: [{ name: '', quantity: 1 }],
    instructions: [''],
    healthBenefits: ['']
  });

  const [nutrientAnalysis, setNutrientAnalysis] = useState(null);

  // Load recipes and custom recipes
  useEffect(() => {
    setRecipes(sampleRecipes);
    setCustomRecipes(loadCustomRecipes());
  }, []);

  // Filter recipes based on search and filters
  const getFilteredRecipes = (recipesArray) => {
    return recipesArray.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDosha = filterDosha === 'all' || recipe.suitableFor.includes(filterDosha);
      const matchesDifficulty = filterDifficulty === 'all' || recipe.difficulty === filterDifficulty;
      return matchesSearch && matchesDosha && matchesDifficulty;
    });
  };

  const filteredSampleRecipes = getFilteredRecipes(recipes);
  const filteredCustomRecipes = getFilteredRecipes(customRecipes);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    const nutrients = calculateRecipeNutrients(recipe.ingredients);
    setNutrientAnalysis(nutrients);
  };

  const handleAddIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: 1 }]
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = { ...newIngredients[index], [field]: value };
      return { ...prev, ingredients: newIngredients };
    });
  };

  const handleAddInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const handleInstructionChange = (index, value) => {
    setFormData(prev => {
      const newInstructions = [...prev.instructions];
      newInstructions[index] = value;
      return { ...prev, instructions: newInstructions };
    });
  };

  const handleRemoveInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleAddBenefit = () => {
    setFormData(prev => ({
      ...prev,
      healthBenefits: [...prev.healthBenefits, '']
    }));
  };

  const handleBenefitChange = (index, value) => {
    setFormData(prev => {
      const newBenefits = [...prev.healthBenefits];
      newBenefits[index] = value;
      return { ...prev, healthBenefits: newBenefits };
    });
  };

  const handleRemoveBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      healthBenefits: prev.healthBenefits.filter((_, i) => i !== index)
    }));
  };

  const handleToggleDoshaCheckbox = (dosha) => {
    setFormData(prev => {
      const newSuitableFor = prev.suitableFor.includes(dosha)
        ? prev.suitableFor.filter(d => d !== dosha)
        : [...prev.suitableFor, dosha];
      return { ...prev, suitableFor: newSuitableFor };
    });
  };

  const handleSaveRecipe = () => {
    if (!formData.name || formData.ingredients.some(ing => !ing.name)) {
      alert('Please fill in all required fields');
      return;
    }

    const newRecipe = {
      ...formData,
      servings: parseInt(formData.servings),
      ingredients: formData.ingredients.filter(ing => ing.name)
    };

    saveCustomRecipe(newRecipe);
    setCustomRecipes(loadCustomRecipes());
    setFormData({
      name: '',
      description: '',
      servings: '2',
      prepTime: '',
      cookTime: '',
      difficulty: 'Easy',
      suitableFor: [],
      ingredients: [{ name: '', quantity: 1 }],
      instructions: [''],
      healthBenefits: ['']
    });
    alert('Recipe saved successfully!');
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteCustomRecipe(recipeId);
      setCustomRecipes(loadCustomRecipes());
      setSelectedRecipe(null);
    }
  };

  const availableIngredients = getAvailableIngredients();

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div className="doctor-main-content">
        <div className="recipe-container">
          {/* Header */}
          <div className="recipe-header">
            <h1>Recipe Management</h1>
            <p>Create, manage, and analyze Ayurvedic recipes with automated nutrient calculations</p>
          </div>

          {/* Tabs */}
          <div className="recipe-tabs">
            <button 
              className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
              onClick={() => setActiveTab('browse')}
            >
              📚 Browse Recipes
            </button>
            <button 
              className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              ➕ Create Recipe
            </button>
            <button 
              className={`tab-button ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              👨‍🍳 My Recipes ({customRecipes.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'nutrients' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrients')}
            >
              📊 Nutrient Database
            </button>
          </div>

          {/* Tab Content */}
          <div className="recipe-content">

            {/* Browse Recipes Tab */}
            {activeTab === 'browse' && (
              <div className="recipe-panel">
                <h2>Recipe Library</h2>
                
                {/* Filters */}
                <div className="recipe-filters">
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input"
                  />
                  <select 
                    value={filterDosha} 
                    onChange={(e) => setFilterDosha(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Doshas</option>
                    <option value="Vata">Vata</option>
                    <option value="Pitta">Pitta</option>
                    <option value="Kapha">Kapha</option>
                  </select>
                  <select 
                    value={filterDifficulty} 
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Recipes Grid */}
                <div className="recipes-grid">
                  {filteredSampleRecipes.length > 0 ? (
                    filteredSampleRecipes.map(recipe => (
                      <div 
                        key={recipe.id} 
                        className="recipe-card"
                        onClick={() => handleSelectRecipe(recipe)}
                      >
                        <div className="recipe-card-header">
                          <h3>{recipe.name}</h3>
                          <span className="difficulty-badge">{recipe.difficulty}</span>
                        </div>
                        <p className="recipe-description">{recipe.description}</p>
                        <div className="recipe-meta">
                          <span>⏱️ {recipe.cookTime}</span>
                          <span>👥 {recipe.servings} servings</span>
                        </div>
                        <div className="recipe-doshas">
                          {recipe.suitableFor.map(dosha => (
                            <span key={dosha} className={`dosha-tag dosha-${dosha.toLowerCase()}`}>
                              {dosha}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-recipes">No recipes found</p>
                  )}
                </div>
              </div>
            )}

            {/* Create Recipe Tab */}
            {activeTab === 'create' && (
              <div className="recipe-panel">
                <h2>Create New Recipe</h2>
                <div className="recipe-form">
                  <div className="form-section">
                    <div className="form-group">
                      <label>Recipe Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="form-input"
                        placeholder="e.g., Moong Dal Khichdi"
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="form-textarea"
                        placeholder="Brief description of the recipe"
                        rows="2"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Servings</label>
                        <input
                          type="number"
                          value={formData.servings}
                          onChange={(e) => setFormData(prev => ({ ...prev, servings: e.target.value }))}
                          className="form-input"
                          min="1"
                        />
                      </div>
                      <div className="form-group">
                        <label>Prep Time</label>
                        <input
                          type="text"
                          value={formData.prepTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
                          className="form-input"
                          placeholder="e.g., 10 min"
                        />
                      </div>
                      <div className="form-group">
                        <label>Cook Time</label>
                        <input
                          type="text"
                          value={formData.cookTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, cookTime: e.target.value }))}
                          className="form-input"
                          placeholder="e.g., 20 min"
                        />
                      </div>
                      <div className="form-group">
                        <label>Difficulty</label>
                        <select
                          value={formData.difficulty}
                          onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                          className="form-select"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Suitable for Doshas</label>
                      <div className="checkbox-group">
                        {['Vata', 'Pitta', 'Kapha'].map(dosha => (
                          <label key={dosha} className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={formData.suitableFor.includes(dosha)}
                              onChange={() => handleToggleDoshaCheckbox(dosha)}
                            />
                            {dosha}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Section */}
                  <div className="form-section">
                    <h3>Ingredients *</h3>
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-row">
                        <select
                          value={ingredient.name}
                          onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                          className="ingredient-select"
                        >
                          <option value="">Select ingredient</option>
                          {availableIngredients.map(ing => (
                            <option key={ing.value} value={ing.value}>
                              {ing.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          step="0.25"
                          value={ingredient.quantity}
                          onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value))}
                          className="qty-input"
                          placeholder="Qty"
                          min="0"
                        />
                        {formData.ingredients.length > 1 && (
                          <button 
                            className="btn-remove"
                            onClick={() => handleRemoveIngredient(index)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="btn-add" onClick={handleAddIngredient}>
                      + Add Ingredient
                    </button>
                  </div>

                  {/* Instructions Section */}
                  <div className="form-section">
                    <h3>Instructions</h3>
                    {formData.instructions.map((instruction, index) => (
                      <div key={index} className="instruction-row">
                        <span className="step-number">{index + 1}</span>
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          className="form-textarea"
                          placeholder="Enter instruction"
                          rows="2"
                        />
                        {formData.instructions.length > 1 && (
                          <button 
                            className="btn-remove"
                            onClick={() => handleRemoveInstruction(index)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="btn-add" onClick={handleAddInstruction}>
                      + Add Instruction
                    </button>
                  </div>

                  {/* Health Benefits Section */}
                  <div className="form-section">
                    <h3>Health Benefits</h3>
                    {formData.healthBenefits.map((benefit, index) => (
                      <div key={index} className="benefit-row">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleBenefitChange(index, e.target.value)}
                          className="form-input"
                          placeholder="e.g., Improves digestion"
                        />
                        {formData.healthBenefits.length > 1 && (
                          <button 
                            className="btn-remove"
                            onClick={() => handleRemoveBenefit(index)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button className="btn-add" onClick={handleAddBenefit}>
                      + Add Benefit
                    </button>
                  </div>

                  <div className="form-actions">
                    <button className="btn-save" onClick={handleSaveRecipe}>
                      💾 Save Recipe
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* My Recipes Tab */}
            {activeTab === 'custom' && (
              <div className="recipe-panel">
                <h2>My Recipes</h2>
                {filteredCustomRecipes.length > 0 ? (
                  <div className="recipes-grid">
                    {filteredCustomRecipes.map(recipe => (
                      <div 
                        key={recipe.id} 
                        className="recipe-card custom"
                        onClick={() => handleSelectRecipe(recipe)}
                      >
                        <div className="recipe-card-header">
                          <h3>{recipe.name}</h3>
                          <span className="custom-badge">Custom</span>
                        </div>
                        <p className="recipe-description">{recipe.description}</p>
                        <div className="recipe-meta">
                          <span>⏱️ {recipe.cookTime}</span>
                          <span>👥 {recipe.servings} servings</span>
                        </div>
                        <button 
                          className="btn-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecipe(recipe.id);
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-recipes">No custom recipes yet. Create your first recipe!</p>
                )}
              </div>
            )}

            {/* Nutrient Database Tab */}
            {activeTab === 'nutrients' && (
              <div className="recipe-panel">
                <h2>Nutrient Database</h2>
                <div className="nutrients-grid">
                  {Object.entries(nutrientDatabase).map(([key, nutrient]) => (
                    <div key={key} className="nutrient-card">
                      <h4>{nutrient.name}</h4>
                      <div className="nutrient-info">
                        <div className="nutrient-row">
                          <span>Calories:</span>
                          <strong>{nutrient.calories}</strong>
                        </div>
                        <div className="nutrient-row">
                          <span>Protein:</span>
                          <strong>{nutrient.protein}g</strong>
                        </div>
                        <div className="nutrient-row">
                          <span>Carbs:</span>
                          <strong>{nutrient.carbs}g</strong>
                        </div>
                        <div className="nutrient-row">
                          <span>Fat:</span>
                          <strong>{nutrient.fat}g</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Recipe Details */}
          {selectedRecipe && (
            <div className="recipe-details-container">
              <button 
                className="btn-close"
                onClick={() => setSelectedRecipe(null)}
              >
                ✕ Close
              </button>
              
              <div className="recipe-details">
                <div className="details-left">
                  <h2>{selectedRecipe.name}</h2>
                  <p className="description">{selectedRecipe.description}</p>
                  
                  <div className="recipe-info">
                    <span>⏱️ Prep: {selectedRecipe.prepTime}</span>
                    <span>🔥 Cook: {selectedRecipe.cookTime}</span>
                    <span>👥 Servings: {selectedRecipe.servings}</span>
                    <span>📊 {selectedRecipe.difficulty}</span>
                  </div>

                  <div className="ingredients-section">
                    <h3>Ingredients</h3>
                    <ul>
                      {selectedRecipe.ingredients.map((ing, idx) => {
                        const nutrient = nutrientDatabase[ing.name.toLowerCase()];
                        return (
                          <li key={idx}>
                            {ing.quantity} × {nutrient?.name || ing.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="instructions-section">
                    <h3>Instructions</h3>
                    <ol>
                      {selectedRecipe.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="benefits-section">
                    <h3>Health Benefits</h3>
                    <ul>
                      {selectedRecipe.healthBenefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="details-right">
                  {nutrientAnalysis && (
                    <div className="nutrient-analysis">
                      <h3>Nutritional Analysis</h3>
                      
                      <div className="macro-section">
                        <h4>Macronutrients</h4>
                        <div className="nutrient-stat">
                          <span>Calories</span>
                          <strong>{nutrientAnalysis.calories}</strong>
                        </div>
                        <div className="nutrient-stat">
                          <span>Protein</span>
                          <strong>{nutrientAnalysis.protein}g</strong>
                        </div>
                        <div className="nutrient-stat">
                          <span>Carbohydrates</span>
                          <strong>{nutrientAnalysis.carbs}g</strong>
                        </div>
                        <div className="nutrient-stat">
                          <span>Fat</span>
                          <strong>{nutrientAnalysis.fat}g</strong>
                        </div>
                        <div className="nutrient-stat">
                          <span>Fiber</span>
                          <strong>{nutrientAnalysis.fiber}g</strong>
                        </div>
                      </div>

                      <div className="micro-section">
                        <h4>Micronutrients</h4>
                        <div className="nutrient-stat">
                          <span>Calcium</span>
                          <strong>{nutrientAnalysis.calcium}mg</strong>
                        </div>
                        <div className="nutrient-stat">
                          <span>Iron</span>
                          <strong>{nutrientAnalysis.iron}mg</strong>
                        </div>
                        <div className="nutrient-stat">
                          <span>Magnesium</span>
                          <strong>{nutrientAnalysis.magnesium}mg</strong>
                        </div>
                      </div>

                      <div className="dosha-section">
                        <h4>Dosha Suitability</h4>
                        <div className="dosha-suitable">
                          {selectedRecipe.suitableFor.map(dosha => (
                            <span key={dosha} className={`dosha-suitable-${dosha.toLowerCase()}`}>
                              ✓ {dosha}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeManagement;
