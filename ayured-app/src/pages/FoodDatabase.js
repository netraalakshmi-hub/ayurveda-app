import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import foodDatabase, { categories } from '../data/foodDatabase';
import '../styles/FoodDatabase.css';

function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDosha, setSelectedDosha] = useState('All');
  const [doshaEffect, setDoshaEffect] = useState('All');
  const [selectedFood, setSelectedFood] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Quick filter tags
  const quickFilters = ['High Protein', 'Low GI', 'Cooling', 'Easy Digest', 'Gluten-Free', 'High Fiber'];

  // Filter foods based on all criteria
  const filteredFoods = useMemo(() => {
    return foodDatabase.filter(food => {
      // Search filter
      const matchesSearch = searchTerm === '' ||
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => food.tags.includes(tag));

      // Dosha filter
      let matchesDosha = true;
      if (selectedDosha !== 'All') {
        const doshaKey = `${selectedDosha.toLowerCase()}Effect`;
        if (doshaEffect === 'All') {
          matchesDosha = true;
        } else {
          matchesDosha = food[doshaKey] === doshaEffect;
        }
      }

      return matchesSearch && matchesCategory && matchesTags && matchesDosha;
    });
  }, [searchTerm, selectedCategory, selectedTags, selectedDosha, doshaEffect]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const loadSampleData = () => {
    // Generate sample food items for demonstration
    alert(`Loading ${foodDatabase.length} authentic Ayurvedic food items!`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTags([]);
    setSelectedDosha('All');
    setDoshaEffect('All');
  };

  return (
    <div className="food-database-page">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="food-database-content">
          {/* Header Section */}
          <div className="database-header">
            <div className="header-title">
              <h1>🍽️ Food Database</h1>
              <p>Search & Filter Food Items</p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-number">{foodDatabase.length}</span>
                <span className="stat-label">Total Items</span>
              </div>
              <div className="stat-badge">
                <span className="stat-number">{filteredFoods.length}</span>
                <span className="stat-label">Filtered</span>
              </div>
              <div className="stat-badge">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="database-description">
            <p>
              Search through our curated collection of traditional Ayurvedic foods with authentic properties and nutritional data
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search food items by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
              )}
            </div>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filter-row">
              {/* Category Filter */}
              <div className="filter-group">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Dosha Filter */}
              <div className="filter-group">
                <label>Dosha Type</label>
                <select
                  value={selectedDosha}
                  onChange={(e) => setSelectedDosha(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Doshas</option>
                  <option value="Vata">Vata</option>
                  <option value="Pitta">Pitta</option>
                  <option value="Kapha">Kapha</option>
                </select>
              </div>

              {/* Dosha Effect Filter */}
              {selectedDosha !== 'All' && (
                <div className="filter-group">
                  <label>Effect</label>
                  <select
                    value={doshaEffect}
                    onChange={(e) => setDoshaEffect(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Effects</option>
                    <option value="Balancing">Balancing</option>
                    <option value="Increases">Increases</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
              )}

              {/* View Mode */}
              <div className="filter-group">
                <label>View</label>
                <div className="view-toggle">
                  <button
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </button>
                  <button
                    className={viewMode === 'table' ? 'active' : ''}
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="filter-actions">
                <button className="btn-reset" onClick={resetFilters}>
                  Reset Filters
                </button>
                <button className="btn-sample" onClick={loadSampleData}>
                  🔄 Load Sample
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="quick-filters">
              <label>Quick Filters:</label>
              <div className="quick-filter-tags">
                {quickFilters.map(tag => (
                  <button
                    key={tag}
                    className={`quick-filter-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            <p>Showing <strong>{filteredFoods.length}</strong> of <strong>{foodDatabase.length}</strong> food items</p>
          </div>

          {/* Food Items Display */}
          {viewMode === 'grid' ? (
            <div className="food-grid">
              {filteredFoods.map(food => (
                <div
                  key={food.id}
                  className="food-card"
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="food-card-header">
                    <h3>{food.name}</h3>
                    <span className="category-badge">{food.category}</span>
                  </div>
                  <div className="food-properties">
                    <div className="property">
                      <span className="property-label">Rasa:</span>
                      <span className="property-value">{food.rasa}</span>
                    </div>
                    <div className="property">
                      <span className="property-label">Virya:</span>
                      <span className="property-value">{food.virya}</span>
                    </div>
                  </div>
                  <div className="macros">
                    <div className="macro">
                      <span className="macro-value">{food.calories}</span>
                      <span className="macro-label">Calories</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value">{food.protein}g</span>
                      <span className="macro-label">Protein</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value">{food.carbs}g</span>
                      <span className="macro-label">Carbs</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value">{food.fat}g</span>
                      <span className="macro-label">Fat</span>
                    </div>
                  </div>
                  <div className="dosha-effects">
                    <div className={`dosha-badge vata ${food.vataEffect.toLowerCase()}`}>
                      V: {food.vataEffect}
                    </div>
                    <div className={`dosha-badge pitta ${food.pittaEffect.toLowerCase()}`}>
                      P: {food.pittaEffect}
                    </div>
                    <div className={`dosha-badge kapha ${food.kaphaEffect.toLowerCase()}`}>
                      K: {food.kaphaEffect}
                    </div>
                  </div>
                  <div className="food-tags">
                    {food.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  <button className="btn-view">👁 View</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="food-table-container">
              <table className="food-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Rasa</th>
                    <th>Virya</th>
                    <th>Vata</th>
                    <th>Pitta</th>
                    <th>Kapha</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map(food => (
                    <tr key={food.id}>
                      <td className="food-name">{food.name}</td>
                      <td>{food.category}</td>
                      <td>{food.rasa}</td>
                      <td>{food.virya}</td>
                      <td className={`dosha-cell ${food.vataEffect.toLowerCase()}`}>
                        {food.vataEffect}
                      </td>
                      <td className={`dosha-cell ${food.pittaEffect.toLowerCase()}`}>
                        {food.pittaEffect}
                      </td>
                      <td className={`dosha-cell ${food.kaphaEffect.toLowerCase()}`}>
                        {food.kaphaEffect}
                      </td>
                      <td>{food.calories}</td>
                      <td>{food.protein}g</td>
                      <td>
                        <button
                          className="btn-view-small"
                          onClick={() => setSelectedFood(food)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Food Detail Modal */}
          {selectedFood && (
            <div className="modal-overlay" onClick={() => setSelectedFood(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedFood(null)}>✕</button>
                <div className="modal-header">
                  <h2>{selectedFood.name}</h2>
                  <span className="category-badge-large">{selectedFood.category}</span>
                </div>

                <div className="modal-body">
                  <div className="detail-section">
                    <h3>🌿 Ayurvedic Properties</h3>
                    <div className="properties-grid">
                      <div className="property-detail">
                        <strong>Rasa (Taste):</strong> {selectedFood.rasa}
                      </div>
                      <div className="property-detail">
                        <strong>Virya (Potency):</strong> {selectedFood.virya}
                      </div>
                      <div className="property-detail">
                        <strong>Vipaka (Post-digestive):</strong> {selectedFood.vipaka}
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>⚖️ Dosha Effects</h3>
                    <div className="dosha-effects-detail">
                      <div className={`dosha-effect-card vata ${selectedFood.vataEffect.toLowerCase()}`}>
                        <span className="dosha-name">Vata</span>
                        <span className="effect-value">{selectedFood.vataEffect}</span>
                      </div>
                      <div className={`dosha-effect-card pitta ${selectedFood.pittaEffect.toLowerCase()}`}>
                        <span className="dosha-name">Pitta</span>
                        <span className="effect-value">{selectedFood.pittaEffect}</span>
                      </div>
                      <div className={`dosha-effect-card kapha ${selectedFood.kaphaEffect.toLowerCase()}`}>
                        <span className="dosha-name">Kapha</span>
                        <span className="effect-value">{selectedFood.kaphaEffect}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>📊 Macronutrients (per 100g)</h3>
                    <div className="macros-detail">
                      <div className="macro-detail">
                        <span className="macro-number">{selectedFood.calories}</span>
                        <span className="macro-name">Calories</span>
                      </div>
                      <div className="macro-detail">
                        <span className="macro-number">{selectedFood.protein}g</span>
                        <span className="macro-name">Protein</span>
                      </div>
                      <div className="macro-detail">
                        <span className="macro-number">{selectedFood.carbs}g</span>
                        <span className="macro-name">Carbs</span>
                      </div>
                      <div className="macro-detail">
                        <span className="macro-number">{selectedFood.fat}g</span>
                        <span className="macro-name">Fat</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>🏷️ Properties & Tags</h3>
                    <div className="tags-detail">
                      {selectedFood.tags.map((tag, idx) => (
                        <span key={idx} className="tag-detail">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodDatabase;
