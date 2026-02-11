import '../styles/NutrientAnalysis.css';

function NutrientAnalysis({ nutrients, recipe, showDosha = true }) {
  if (!nutrients) return null;

  // Calculate macronutrient percentages
  const totalCalories = nutrients.calories;
  const proteinCalories = nutrients.protein * 4;
  const carbCalories = nutrients.carbs * 4;
  const fatCalories = nutrients.fat * 9;

  const proteinPercent = totalCalories > 0 ? (proteinCalories / totalCalories) * 100 : 0;
  const carbPercent = totalCalories > 0 ? (carbCalories / totalCalories) * 100 : 0;
  const fatPercent = totalCalories > 0 ? (fatCalories / totalCalories) * 100 : 0;

  // Get nutrition quality indicators
  const getNutritionQuality = () => {
    let quality = 'Balanced';
    let score = 0;

    // High fiber is good
    if (nutrients.fiber > 5) score += 2;
    else if (nutrients.fiber > 3) score += 1;

    // Good macro balance
    if (proteinPercent > 15 && proteinPercent < 35) score += 2;
    if (carbPercent > 40 && carbPercent < 60) score += 2;
    if (fatPercent > 20 && fatPercent < 35) score += 2;

    // Good micronutrients
    if (nutrients.calcium > 100) score += 1;
    if (nutrients.iron > 2) score += 1;
    if (nutrients.magnesium > 50) score += 1;

    if (score >= 7) quality = 'Excellent';
    else if (score >= 5) quality = 'Very Good';
    else if (score >= 3) quality = 'Good';

    return quality;
  };

  const nutritionQuality = getNutritionQuality();

  return (
    <div className="nutrient-analysis-panel">
      <div className="analysis-header">
        <h3>Nutritional Analysis</h3>
        <span className={`quality-badge quality-${nutritionQuality.toLowerCase().replace(' ', '-')}`}>
          {nutritionQuality}
        </span>
      </div>

      {/* Calories Summary */}
      <div className="calories-summary">
        <div className="calorie-value">
          <span className="label">Total Calories</span>
          <span className="value">{nutrients.calories}</span>
        </div>
        <div className="daily-reference">
          <span className="percent">{Math.round((nutrients.calories / 2000) * 100)}% of daily intake</span>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="macros-section">
        <h4>Macronutrients</h4>
        <div className="macro-bar">
          <div className="macro-segment protein" style={{ width: `${proteinPercent}%` }}>
            <span className="macro-label-bar">{Math.round(proteinPercent)}%</span>
          </div>
          <div className="macro-segment carbs" style={{ width: `${carbPercent}%` }}>
            <span className="macro-label-bar">{Math.round(carbPercent)}%</span>
          </div>
          <div className="macro-segment fat" style={{ width: `${fatPercent}%` }}>
            <span className="macro-label-bar">{Math.round(fatPercent)}%</span>
          </div>
        </div>

        <div className="macros-legend">
          <div className="macro-item">
            <span className="macro-color protein"></span>
            <div className="macro-detail">
              <span className="macro-name">Protein</span>
              <span className="macro-value">{nutrients.protein}g</span>
            </div>
          </div>
          <div className="macro-item">
            <span className="macro-color carbs"></span>
            <div className="macro-detail">
              <span className="macro-name">Carbs</span>
              <span className="macro-value">{nutrients.carbs}g</span>
            </div>
          </div>
          <div className="macro-item">
            <span className="macro-color fat"></span>
            <div className="macro-detail">
              <span className="macro-name">Fat</span>
              <span className="macro-value">{nutrients.fat}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Fiber</span>
          <span className="detail-value">{nutrients.fiber}g</span>
          <span className="detail-bar" style={{ width: `${Math.min(nutrients.fiber * 10, 100)}%` }}></span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Calcium</span>
          <span className="detail-value">{nutrients.calcium}mg</span>
          <span className="detail-bar" style={{ width: `${Math.min((nutrients.calcium / 1000) * 100, 100)}%` }}></span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Iron</span>
          <span className="detail-value">{nutrients.iron}mg</span>
          <span className="detail-bar" style={{ width: `${Math.min((nutrients.iron / 18) * 100, 100)}%` }}></span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Magnesium</span>
          <span className="detail-value">{nutrients.magnesium}mg</span>
          <span className="detail-bar" style={{ width: `${Math.min((nutrients.magnesium / 400) * 100, 100)}%` }}></span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-box">
        <h4>Nutritional Guidance</h4>
        <ul className="guidance-list">
          {nutrients.protein > 20 && <li>✓ Excellent protein source</li>}
          {nutrients.fiber > 5 && <li>✓ High in dietary fiber</li>}
          {nutrients.calcium > 100 && <li>✓ Good calcium content</li>}
          {nutrients.iron > 2 && <li>✓ Good iron source</li>}
          {proteinPercent >= 10 && <li>✓ Adequate protein balance</li>}
          {carbPercent >= 45 && <li>✓ Good energy source</li>}
          {fatPercent <= 30 && <li>✓ Healthy fat balance</li>}
        </ul>
      </div>

      {/* Dosha Suitability */}
      {showDosha && recipe && (
        <div className="dosha-suitability">
          <h4>Dosha Suitability</h4>
          <div className="dosha-tags">
            {recipe.suitableFor && recipe.suitableFor.map(dosha => (
              <span key={dosha} className={`dosha-suitable dosha-${dosha.toLowerCase()}`}>
                ✓ {dosha}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NutrientAnalysis;
