// Nutrient Database for common Ayurvedic ingredients
export const nutrientDatabase = {
  // Grains
  'rice': {
    name: 'Rice (1 cup cooked)',
    quantity: '150g',
    calories: 206,
    protein: 4.3,
    carbs: 44.5,
    fat: 0.3,
    fiber: 0.6,
    calcium: 10,
    iron: 0.2,
    magnesium: 19,
    doshaEffect: { vata: -1, pitta: 0, kapha: 1 }
  },
  'wheat': {
    name: 'Wheat (whole grain, 1 cup)',
    quantity: '170g',
    calories: 567,
    protein: 16.4,
    carbs: 117.8,
    fat: 2.4,
    fiber: 18.7,
    calcium: 54,
    iron: 4.1,
    magnesium: 138,
    doshaEffect: { vata: -1, pitta: -1, kapha: 1 }
  },
  'oats': {
    name: 'Oats (dry, 1 cup)',
    quantity: '150g',
    calories: 607,
    protein: 26.4,
    carbs: 103.8,
    fat: 10.7,
    fiber: 16.5,
    calcium: 191,
    iron: 8.2,
    magnesium: 177,
    doshaEffect: { vata: -1, pitta: 0, kapha: 0 }
  },
  'dal': {
    name: 'Moong Dal (cooked, 1 cup)',
    quantity: '202g',
    calories: 213,
    protein: 14.9,
    carbs: 38.3,
    fat: 0.8,
    fiber: 15.4,
    calcium: 27,
    iron: 2.4,
    magnesium: 48,
    doshaEffect: { vata: -1, pitta: 0, kapha: 1 }
  },
  // Vegetables
  'spinach': {
    name: 'Spinach (raw, 1 cup)',
    quantity: '30g',
    calories: 7,
    protein: 0.9,
    carbs: 1.1,
    fat: 0.1,
    fiber: 0.7,
    calcium: 30,
    iron: 0.8,
    magnesium: 24,
    doshaEffect: { vata: -1, pitta: -1, kapha: -1 }
  },
  'carrot': {
    name: 'Carrot (medium, raw)',
    quantity: '61g',
    calories: 25,
    protein: 0.6,
    carbs: 5.8,
    fat: 0.1,
    fiber: 1.7,
    calcium: 20,
    iron: 0.2,
    magnesium: 8,
    doshaEffect: { vata: -1, pitta: -1, kapha: 0 }
  },
  'broccoli': {
    name: 'Broccoli (1 cup chopped)',
    quantity: '91g',
    calories: 31,
    protein: 2.6,
    carbs: 5.6,
    fat: 0.4,
    fiber: 2.2,
    calcium: 42,
    iron: 0.6,
    magnesium: 15,
    doshaEffect: { vata: -1, pitta: 0, kapha: -1 }
  },
  'tomato': {
    name: 'Tomato (medium)',
    quantity: '123g',
    calories: 22,
    protein: 1.1,
    carbs: 4.8,
    fat: 0.2,
    fiber: 1.5,
    calcium: 12,
    iron: 0.3,
    magnesium: 11,
    doshaEffect: { vata: -1, pitta: 1, kapha: -1 }
  },
  // Proteins
  'chicken': {
    name: 'Chicken Breast (100g)',
    quantity: '100g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    calcium: 15,
    iron: 0.9,
    magnesium: 26,
    doshaEffect: { vata: 0, pitta: 1, kapha: -1 }
  },
  'paneer': {
    name: 'Paneer (100g)',
    quantity: '100g',
    calories: 265,
    protein: 25.4,
    carbs: 3.6,
    fat: 17.4,
    fiber: 0,
    calcium: 389,
    iron: 0.2,
    magnesium: 19,
    doshaEffect: { vata: -1, pitta: 0, kapha: 0 }
  },
  'lentil': {
    name: 'Lentil (cooked, 1 cup)',
    quantity: '198g',
    calories: 230,
    protein: 17.9,
    carbs: 39.9,
    fat: 0.8,
    fiber: 15.3,
    calcium: 38,
    iron: 6.6,
    magnesium: 71,
    doshaEffect: { vata: -1, pitta: -1, kapha: 1 }
  },
  // Oils & Fats
  'ghee': {
    name: 'Ghee (1 tablespoon)',
    quantity: '14g',
    calories: 120,
    protein: 0,
    carbs: 0,
    fat: 13.6,
    fiber: 0,
    calcium: 5,
    iron: 0,
    magnesium: 0,
    doshaEffect: { vata: -1, pitta: -1, kapha: 1 }
  },
  'coconut oil': {
    name: 'Coconut Oil (1 tablespoon)',
    quantity: '14g',
    calories: 117,
    protein: 0,
    carbs: 0,
    fat: 13.5,
    fiber: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    doshaEffect: { vata: -1, pitta: -1, kapha: 1 }
  },
  // Spices (per teaspoon)
  'turmeric': {
    name: 'Turmeric (1 teaspoon)',
    quantity: '2.9g',
    calories: 8,
    protein: 0.3,
    carbs: 1.4,
    fat: 0.1,
    fiber: 0.4,
    calcium: 15,
    iron: 3.1,
    magnesium: 5,
    doshaEffect: { vata: -1, pitta: -1, kapha: -1 }
  },
  'ginger': {
    name: 'Ginger (1 teaspoon)',
    quantity: '2g',
    calories: 5,
    protein: 0.1,
    carbs: 1.1,
    fat: 0.1,
    fiber: 0.1,
    calcium: 2,
    iron: 0.1,
    magnesium: 2,
    doshaEffect: { vata: -1, pitta: 0, kapha: -1 }
  },
  'cumin': {
    name: 'Cumin (1 teaspoon)',
    quantity: '2g',
    calories: 8,
    protein: 0.4,
    carbs: 0.9,
    fat: 0.4,
    fiber: 0.2,
    calcium: 20,
    iron: 1.4,
    magnesium: 10,
    doshaEffect: { vata: -1, pitta: 0, kapha: -1 }
  },
  // Fruits
  'banana': {
    name: 'Banana (medium)',
    quantity: '118g',
    calories: 105,
    protein: 1.3,
    carbs: 26.9,
    fat: 0.3,
    fiber: 3.1,
    calcium: 5,
    iron: 0.3,
    magnesium: 31,
    doshaEffect: { vata: -1, pitta: -1, kapha: 1 }
  },
  'apple': {
    name: 'Apple (medium)',
    quantity: '182g',
    calories: 95,
    protein: 0.5,
    carbs: 25.1,
    fat: 0.3,
    fiber: 4.4,
    calcium: 11,
    iron: 0.2,
    magnesium: 9,
    doshaEffect: { vata: 0, pitta: -1, kapha: -1 }
  },
  'dates': {
    name: 'Dates (3 pieces)',
    quantity: '24g',
    calories: 66,
    protein: 0.5,
    carbs: 17.6,
    fat: 0.1,
    fiber: 1.6,
    calcium: 15,
    iron: 0.2,
    magnesium: 5,
    doshaEffect: { vata: -1, pitta: -1, kapha: 1 }
  },
  // Milk products
  'milk': {
    name: 'Milk (1 cup)',
    quantity: '240ml',
    calories: 149,
    protein: 7.7,
    carbs: 11.7,
    fat: 7.9,
    fiber: 0,
    calcium: 276,
    iron: 0.1,
    magnesium: 24,
    doshaEffect: { vata: -1, pitta: -1, kapha: 0 }
  },
  'yogurt': {
    name: 'Yogurt (1 cup)',
    quantity: '227g',
    calories: 100,
    protein: 10,
    carbs: 7,
    fat: 0,
    fiber: 0,
    calcium: 450,
    iron: 0.1,
    magnesium: 27,
    doshaEffect: { vata: -1, pitta: 0, kapha: 1 }
  }
};

// Calculate nutritional values for a recipe
export function calculateRecipeNutrients(ingredients) {
  let totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    vataScore: 0,
    pittaScore: 0,
    kaphaScore: 0
  };

  ingredients.forEach(ingredient => {
    const nutrient = nutrientDatabase[ingredient.name.toLowerCase()] || {};
    const qty = parseFloat(ingredient.quantity) || 1;

    totals.calories += (nutrient.calories || 0) * qty;
    totals.protein += (nutrient.protein || 0) * qty;
    totals.carbs += (nutrient.carbs || 0) * qty;
    totals.fat += (nutrient.fat || 0) * qty;
    totals.fiber += (nutrient.fiber || 0) * qty;
    totals.calcium += (nutrient.calcium || 0) * qty;
    totals.iron += (nutrient.iron || 0) * qty;
    totals.magnesium += (nutrient.magnesium || 0) * qty;

    if (nutrient.doshaEffect) {
      totals.vataScore += (nutrient.doshaEffect.vata || 0) * qty;
      totals.pittaScore += (nutrient.doshaEffect.pitta || 0) * qty;
      totals.kaphaScore += (nutrient.doshaEffect.kapha || 0) * qty;
    }
  });

  return {
    ...totals,
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein * 10) / 10,
    carbs: Math.round(totals.carbs * 10) / 10,
    fat: Math.round(totals.fat * 10) / 10,
    fiber: Math.round(totals.fiber * 10) / 10,
    calcium: Math.round(totals.calcium),
    iron: Math.round(totals.iron * 10) / 10,
    magnesium: Math.round(totals.magnesium)
  };
}

// Get dosha recommendation based on scores
export function getDoshaRecommendation(vataScore, pittaScore, kaphaScore) {
  const scores = { vata: vataScore, pitta: pittaScore, kapha: kaphaScore };
  const maxScore = Math.max(...Object.values(scores));
  
  const recommendations = {
    vata: vataScore === maxScore ? 'Excellent for Vata pacification' : 'Consider for Vata',
    pitta: pittaScore === maxScore ? 'Excellent for Pitta pacification' : 'Consider for Pitta',
    kapha: kaphaScore === maxScore ? 'Excellent for Kapha pacification' : 'Consider for Kapha'
  };

  return recommendations;
}

// Sample Ayurvedic recipes
export const sampleRecipes = [
  // MORNING RECIPES
  {
    id: 1,
    name: 'Moong Dal with Rice',
    description: 'Light, easily digestible comfort food',
    mealTime: 'Morning',
    servings: 2,
    prepTime: '5 min',
    cookTime: '20 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'dal', quantity: 0.5 },
      { name: 'rice', quantity: 0.5 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 }
    ],
    instructions: [
      'Wash and soak dal and rice for 15 minutes',
      'Heat ghee in a pot',
      'Add cumin seeds for tempering',
      'Add dal and rice, mix well',
      'Add 3 cups water and bring to boil',
      'Reduce heat and simmer for 15-20 minutes until soft',
      'Add turmeric and salt to taste',
      'Serve hot'
    ],
    healthBenefits: [
      'Easily digestible',
      'High protein content',
      'Balances all three doshas',
      'Provides sustained energy'
    ]
  },

  // MORNING BEVERAGE
  {
    id: 2,
    name: 'Turmeric Ginger Tea',
    description: 'Anti-inflammatory wellness drink',
    mealTime: 'Morning',
    servings: 1,
    prepTime: '2 min',
    cookTime: '5 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'milk', quantity: 1 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ginger', quantity: 0.25 }
    ],
    instructions: [
      'Heat milk in a saucepan',
      'Add turmeric and ginger',
      'Simmer for 3-5 minutes',
      'Strain and serve hot'
    ],
    healthBenefits: [
      'Anti-inflammatory properties',
      'Aids digestion',
      'Boosts immunity',
      'Promotes better sleep'
    ]
  },

  // MORNING - OATMEAL
  {
    id: 5,
    name: 'Warm Oatmeal with Dates and Ghee',
    description: 'Nourishing breakfast with natural sweetness',
    mealTime: 'Morning',
    servings: 1,
    prepTime: '2 min',
    cookTime: '10 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Kapha'],
    ingredients: [
      { name: 'oats', quantity: 0.33 },
      { name: 'milk', quantity: 1 },
      { name: 'dates', quantity: 0.5 },
      { name: 'ghee', quantity: 0.25 }
    ],
    instructions: [
      'Boil milk in a pot',
      'Add oats and stir well',
      'Cook for 5-8 minutes on low heat',
      'Chop dates and add to oatmeal',
      'Add ghee and mix',
      'Add honey and serve warm'
    ],
    healthBenefits: [
      'Rich in fiber',
      'Provides sustained energy',
      'Easy to digest',
      'Balances nervous system'
    ]
  },

  // AFTERNOON/LUNCH - SPINACH PANEER
  {
    id: 3,
    name: 'Spinach and Paneer Curry',
    description: 'Protein-rich green vegetable dish',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '10 min',
    cookTime: '15 min',
    difficulty: 'Medium',
    suitableFor: ['Vata', 'Kapha'],
    ingredients: [
      { name: 'spinach', quantity: 1.5 },
      { name: 'paneer', quantity: 0.5 },
      { name: 'tomato', quantity: 0.5 },
      { name: 'ginger', quantity: 0.25 },
      { name: 'ghee', quantity: 0.75 }
    ],
    instructions: [
      'Blanch spinach and make paste',
      'Cut paneer into cubes',
      'Heat ghee in pan',
      'Add ginger and tomato, cook until soft',
      'Add spinach paste and cook for 5 minutes',
      'Add paneer cubes gently',
      'Simmer for 5 more minutes',
      'Season and serve'
    ],
    healthBenefits: [
      'High in iron',
      'Excellent protein source',
      'Rich in calcium',
      'Supports digestive health'
    ]
  },

  // AFTERNOON/LUNCH - KHICHDI
  {
    id: 4,
    name: 'Vegetable Khichdi',
    description: 'Detoxifying comfort meal',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '5 min',
    cookTime: '25 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'rice', quantity: 0.75 },
      { name: 'dal', quantity: 0.5 },
      { name: 'carrot', quantity: 0.75 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 }
    ],
    instructions: [
      'Wash rice and dal thoroughly',
      'Chop vegetables into small pieces',
      'Heat ghee in pot',
      'Add turmeric and dal',
      'Add rice and vegetables',
      'Add 3.5 cups water',
      'Bring to boil, then reduce heat',
      'Cook until all ingredients are soft (20 min)',
      'Serve warm'
    ],
    healthBenefits: [
      'Complete one-pot meal',
      'Easy to digest',
      'Balances all doshas',
      'Perfect for recovery and detox'
    ]
  },

  // LUNCH - DAL CURRY
  {
    id: 6,
    name: 'Red Lentil Dal Curry',
    description: 'Protein-rich traditional lentil soup',
    mealTime: 'Lunch',
    servings: 3,
    prepTime: '5 min',
    cookTime: '30 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'dal', quantity: 1 },
      { name: 'tomato', quantity: 1 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 }
    ],
    instructions: [
      'Wash lentils and boil with 4 cups water',
      'Add turmeric while boiling',
      'Heat ghee separately',
      'Add cumin and cook until seeds crackle',
      'Add chopped tomatoes to ghee',
      'Once lentils are soft, add the ghee mixture',
      'Simmer for 10 minutes',
      'Season with salt and serve hot'
    ],
    healthBenefits: [
      'High in protein',
      'Rich in fiber',
      'Supports digestive fire',
      'Grounding and nourishing'
    ]
  },

  // LUNCH - BROCCOLI CURRY
  {
    id: 7,
    name: 'Broccoli and Carrot Curry',
    description: 'Light seasonal vegetable dish',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '8 min',
    cookTime: '15 min',
    difficulty: 'Easy',
    suitableFor: ['Pitta', 'Kapha'],
    ingredients: [
      { name: 'broccoli', quantity: 1 },
      { name: 'carrot', quantity: 0.75 },
      { name: 'coconut oil', quantity: 0.5 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'turmeric', quantity: 0.25 }
    ],
    instructions: [
      'Cut broccoli into florets',
      'Slice carrots into thin pieces',
      'Heat coconut oil in pan',
      'Add cumin seeds for tempering',
      'Add carrots first, cook for 5 minutes',
      'Add broccoli and turmeric',
      'Cook until vegetables are tender (8-10 min)',
      'Season and serve hot'
    ],
    healthBenefits: [
      'Rich in vitamins',
      'Anti-inflammatory',
      'Supports immune system',
      'Light and cooling'
    ]
  },

  // EVENING/NIGHT - LIGHT SOUP
  {
    id: 8,
    name: 'Mung Bean and Vegetable Soup',
    description: 'Light, easily digestible evening meal',
    mealTime: 'Dinner',
    servings: 2,
    prepTime: '10 min',
    cookTime: '25 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'dal', quantity: 0.5 },
      { name: 'carrot', quantity: 0.75 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ginger', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 }
    ],
    instructions: [
      'Heat ghee and add ginger',
      'Add diced carrots and cook for 3 minutes',
      'Add washed mung beans',
      'Add 4 cups water and turmeric',
      'Bring to boil, then simmer for 20 minutes',
      'Beans should be soft and soup light',
      'Season with salt and serve hot'
    ],
    healthBenefits: [
      'Light on digestion',
      'Perfect dinner food',
      'Cooling and calming',
      'Promotes restful sleep'
    ]
  },

  // NIGHT - WARM MILK
  {
    id: 9,
    name: 'Warm Milk with Ashwagandha',
    description: 'Calming bedtime drink',
    mealTime: 'Dinner',
    servings: 1,
    prepTime: '1 min',
    cookTime: '5 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'milk', quantity: 1 },
      { name: 'ghee', quantity: 0.25 }
    ],
    instructions: [
      'Heat milk in a saucepan',
      'Add ghee',
      'Simmer for 2-3 minutes',
      'Add ashwagandha powder (1/4 tsp)',
      'Stir well and serve warm'
    ],
    healthBenefits: [
      'Promotes deep sleep',
      'Reduces stress and anxiety',
      'Nourishes the nervous system',
      'Calming and grounding'
    ]
  },

  // NIGHT - LIGHT SOUP WITH ROTI
  {
    id: 10,
    name: 'Light Clear Vegetable Broth',
    description: 'Soothing evening soup',
    mealTime: 'Dinner',
    servings: 2,
    prepTime: '5 min',
    cookTime: '20 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta'],
    ingredients: [
      { name: 'carrot', quantity: 1 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ginger', quantity: 0.25 },
      { name: 'ghee', quantity: 0.25 }
    ],
    instructions: [
      'Heat ghee in pot',
      'Add minced ginger and cook until fragrant',
      'Add chopped carrots',
      'Add 4 cups water and turmeric',
      'Bring to boil and simmer for 15 minutes',
      'Carrots become soft and broth is clear',
      'Season with salt and serve hot'
    ],
    healthBenefits: [
      'Very light and soothing',
      'Aids evening digestion',
      'Cooling and calming',
      'Perfect before sleep'
    ]
  },

  // LUNCH - APPLE AND COCONUT
  {
    id: 11,
    name: 'Apple and Coconut Oatmeal',
    description: 'Nourishing breakfast with cooling coconut',
    mealTime: 'Morning',
    servings: 1,
    prepTime: '3 min',
    cookTime: '8 min',
    difficulty: 'Easy',
    suitableFor: ['Pitta', 'Kapha'],
    ingredients: [
      { name: 'oats', quantity: 0.33 },
      { name: 'apple', quantity: 0.5 },
      { name: 'coconut oil', quantity: 0.25 },
      { name: 'milk', quantity: 0.75 }
    ],
    instructions: [
      'Grate or dice apple',
      'Boil milk with diced apple',
      'Add oats and stir well',
      'Cook on low heat for 5-7 minutes',
      'Add coconut oil at the end',
      'Sweeten with honey if needed',
      'Serve warm'
    ],
    healthBenefits: [
      'Cooling for Pitta',
      'Cooling effect from apple and coconut',
      'Light yet nourishing',
      'Balances blood sugar'
    ]
  },

  // LUNCH - CHICKPEA CURRY
  {
    id: 12,
    name: 'Chickpea and Bean Curry',
    description: 'Hearty legume-based lunch',
    mealTime: 'Lunch',
    servings: 3,
    prepTime: '10 min',
    cookTime: '35 min',
    difficulty: 'Medium',
    suitableFor: ['Kapha'],
    ingredients: [
      { name: 'lentil', quantity: 1 },
      { name: 'tomato', quantity: 1 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ginger', quantity: 0.25 },
      { name: 'ghee', quantity: 0.75 }
    ],
    instructions: [
      'Soak chickpeas overnight (or use canned)',
      'Heat ghee in a large pot',
      'Add ginger and cook until golden',
      'Add diced tomatoes and simmer',
      'Add cooked chickpeas and turmeric',
      'Add 2 cups water and cook covered for 20 min',
      'Stir occasionally until sauce thickens',
      'Season with salt and serve hot'
    ],
    healthBenefits: [
      'High in protein and fiber',
      'Grounding for Vata',
      'Warming for cold weather',
      'Long-lasting energy'
    ]
  },

  // MORNING - SEMOLINA UPMA
  {
    id: 13,
    name: 'Semolina Upma',
    description: 'Savory millet porridge breakfast',
    mealTime: 'Morning',
    servings: 2,
    prepTime: '5 min',
    cookTime: '10 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Kapha'],
    ingredients: [
      { name: 'wheat', quantity: 0.5 },
      { name: 'carrot', quantity: 0.5 },
      { name: 'ghee', quantity: 0.5 },
      { name: 'cumin', quantity: 0.25 }
    ],
    instructions: [
      'Toast semolina in ghee until golden',
      'Finely dice carrots',
      'Add 2 cups water to the toasted semolina',
      'Add diced carrots and cumin',
      'Bring to boil, stirring constantly',
      'Reduce heat and simmer for 5 minutes',
      'Cover and let rest for 2 minutes',
      'Serve warm with ghee drizzle'
    ],
    healthBenefits: [
      'Easy to digest',
      'Grounding and warming',
      'Quick energy source',
      'Light yet satisfying'
    ]
  },

  // MORNING - BANANA HONEY PORRIDGE
  {
    id: 14,
    name: 'Banana and Honey Porridge',
    description: 'Sweet nourishing morning meal',
    mealTime: 'Morning',
    servings: 1,
    prepTime: '2 min',
    cookTime: '8 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta'],
    ingredients: [
      { name: 'oats', quantity: 0.33 },
      { name: 'banana', quantity: 0.5 },
      { name: 'milk', quantity: 1 },
      { name: 'ghee', quantity: 0.25 }
    ],
    instructions: [
      'Slice banana into small pieces',
      'Heat milk in a pot',
      'Add oats and stir',
      'Add banana slices',
      'Cook on low heat for 5-7 minutes',
      'Add ghee and honey',
      'Stir well and serve hot'
    ],
    healthBenefits: [
      'Rich in potassium',
      'Natural sweetness balances doshas',
      'Calming and nourishing',
      'Good for bone health'
    ]
  },

  // LUNCH - BITTER MELON CURRY
  {
    id: 15,
    name: 'Bitter Melon Curry',
    description: 'Detoxifying bitter greens',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Medium',
    suitableFor: ['Pitta', 'Kapha'],
    ingredients: [
      { name: 'broccoli', quantity: 1.5 },
      { name: 'tomato', quantity: 0.75 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 },
      { name: 'ginger', quantity: 0.25 }
    ],
    instructions: [
      'Slice bitter melon thinly',
      'Soak in salt water for 10 minutes to reduce bitterness',
      'Heat ghee in pan',
      'Sauté ginger briefly',
      'Add squeezed bitter melon',
      'Add tomatoes and turmeric',
      'Cook until tender (12-15 minutes)',
      'Season and serve hot'
    ],
    healthBenefits: [
      'Strong detoxifying properties',
      'Supports liver health',
      'Balances blood sugar',
      'Aids digestion'
    ]
  },

  // LUNCH - POTATO AND MUSHROOM
  {
    id: 16,
    name: 'Potato and Mushroom Curry',
    description: 'Earthy seasonal vegetable dish',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '8 min',
    cookTime: '20 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Kapha'],
    ingredients: [
      { name: 'carrot', quantity: 1 },
      { name: 'tomato', quantity: 0.75 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 },
      { name: 'ginger', quantity: 0.25 }
    ],
    instructions: [
      'Dice potatoes and mushrooms into small pieces',
      'Heat ghee in a large pan',
      'Add cumin seeds and let them crackle',
      'Add ginger and cook for 1 minute',
      'Add diced vegetables and cook for 5 minutes',
      'Add chopped tomatoes and turmeric',
      'Add 1 cup water and cover',
      'Cook until vegetables are tender (12-15 min)',
      'Season and serve hot'
    ],
    healthBenefits: [
      'Grounding and warming',
      'Rich in minerals',
      'Sustains energy',
      'Supports immune system'
    ]
  },

  // LUNCH - BEET AND CARROT CURRY
  {
    id: 17,
    name: 'Beet and Carrot Curry',
    description: 'Colorful root vegetable dish',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '10 min',
    cookTime: '25 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta'],
    ingredients: [
      { name: 'carrot', quantity: 1.5 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 },
      { name: 'ginger', quantity: 0.25 }
    ],
    instructions: [
      'Peel and dice beets and carrots',
      'Heat ghee in pot',
      'Add cumin and ginger',
      'Add diced vegetables',
      'Cook for 5 minutes, stirring occasionally',
      'Add turmeric and 1.5 cups water',
      'Bring to boil and then simmer for 15 minutes',
      'Vegetables should be soft and sweet',
      'Season with salt and serve hot'
    ],
    healthBenefits: [
      'Excellent for blood health',
      'Rich in folate and iron',
      'Naturally sweet and grounding',
      'Supports heart health'
    ]
  },

  // LUNCH - GREEN GRAM CURRY
  {
    id: 18,
    name: 'Green Gram Curry',
    description: 'Light and nutritious lentil dish',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '5 min',
    cookTime: '30 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'dal', quantity: 0.75 },
      { name: 'tomato', quantity: 0.75 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 }
    ],
    instructions: [
      'Rinse green gram lentils',
      'Heat ghee in pot',
      'Add cumin seeds',
      'Add lentils and sauté for 1 minute',
      'Add 3 cups water and turmeric',
      'Bring to boil and simmer for 20 minutes',
      'Add chopped tomatoes and cook for 5 more minutes',
      'Lentils should be cooked but not mushy',
      'Season and serve hot'
    ],
    healthBenefits: [
      'High in protein',
      'Easy to digest when properly prepared',
      'Balances all doshas',
      'Chlorophyll rich'
    ]
  },

  // DINNER - BARLEY AND VEGETABLE SOUP
  {
    id: 19,
    name: 'Barley and Vegetable Soup',
    description: 'Warming evening soup',
    mealTime: 'Dinner',
    servings: 2,
    prepTime: '5 min',
    cookTime: '35 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Kapha'],
    ingredients: [
      { name: 'wheat', quantity: 0.5 },
      { name: 'carrot', quantity: 0.75 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ghee', quantity: 0.25 },
      { name: 'ginger', quantity: 0.25 }
    ],
    instructions: [
      'Rinse barley grains',
      'Heat ghee with ginger',
      'Add barley and toast lightly for 2 minutes',
      'Add diced carrots',
      'Pour 4.5 cups water',
      'Add turmeric and bring to boil',
      'Reduce heat and simmer for 30 minutes',
      'Barley should be tender',
      'Season and serve warm'
    ],
    healthBenefits: [
      'Very light and warming',
      'Good for evening meal',
      'Aids digestion and sleep',
      'Ancient grain with fiber'
    ]
  },

  // DINNER - CREAM OF TOMATO SOUP
  {
    id: 20,
    name: 'Cream of Tomato Soup',
    description: 'Soothing evening tomato soup',
    mealTime: 'Dinner',
    servings: 2,
    prepTime: '8 min',
    cookTime: '20 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta'],
    ingredients: [
      { name: 'tomato', quantity: 2 },
      { name: 'milk', quantity: 0.75 },
      { name: 'ghee', quantity: 0.5 },
      { name: 'ginger', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 }
    ],
    instructions: [
      'Chop tomatoes into small pieces',
      'Heat ghee in pot',
      'Add ginger and cumin',
      'Add chopped tomatoes',
      'Cook for 10 minutes until soft',
      'Blend the cooked tomatoes into smooth puree',
      'Return to pot and add milk',
      'Simmer for 5 minutes without boiling',
      'Season and serve warm'
    ],
    healthBenefits: [
      'Warming and soothing',
      'Easy on digestion at night',
      'Rich in lycopene',
      'Comforting for nervous system'
    ]
  },

  // DINNER - HERBAL BROTH
  {
    id: 21,
    name: 'Herbal Cleansing Broth',
    description: 'Detoxifying herbal soup',
    mealTime: 'Dinner',
    servings: 1,
    prepTime: '3 min',
    cookTime: '15 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'carrot', quantity: 0.75 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'ginger', quantity: 0.5 },
      { name: 'ghee', quantity: 0.25 }
    ],
    instructions: [
      'Heat ghee in a pot',
      'Add sliced ginger',
      'Chop carrot into small pieces',
      'Add carrot and turmeric',
      'Pour 2 cups water',
      'Bring to boil and simmer for 12 minutes',
      'Strain lightly or leave pieces',
      'Season with rock salt',
      'Serve warm before bed'
    ],
    healthBenefits: [
      'Deep cleansing properties',
      'Anti-inflammatory',
      'Calming before sleep',
      'Supports immune system'
    ]
  },

  // MORNING - SESAME SEED MILK
  {
    id: 22,
    name: 'Sesame Seed Milk',
    description: 'Warm calcium-rich morning drink',
    mealTime: 'Morning',
    servings: 1,
    prepTime: '5 min',
    cookTime: '10 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta'],
    ingredients: [
      { name: 'milk', quantity: 1 },
      { name: 'ghee', quantity: 0.25 }
    ],
    instructions: [
      'Crush 1 tbsp sesame seeds lightly',
      'Heat milk in a saucepan',
      'Add crushed sesame seeds',
      'Add ghee',
      'Simmer for 5 minutes',
      'Strain through fine cloth',
      'Add honey if desired',
      'Serve warm'
    ],
    healthBenefits: [
      'Rich in calcium and minerals',
      'Warming and grounding',
      'Supports bone health',
      'Nourishes nerves'
    ]
  },

  // LUNCH - LENTIL AND SPINACH
  {
    id: 23,
    name: 'Lentil and Spinach Dal',
    description: 'Iron-rich nutritious lunch',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '5 min',
    cookTime: '30 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta', 'Kapha'],
    ingredients: [
      { name: 'dal', quantity: 0.75 },
      { name: 'spinach', quantity: 1 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'ghee', quantity: 0.5 }
    ],
    instructions: [
      'Wash and soak lentils',
      'Heat ghee and add cumin',
      'Add soaked lentils',
      'Add 3 cups water and turmeric',
      'Bring to boil and simmer for 20 minutes',
      'Blanch and finely chop spinach',
      'Add spinach to cooked lentils',
      'Cook for 5 more minutes',
      'Season and serve hot'
    ],
    healthBenefits: [
      'High in iron',
      'Complete protein',
      'Deep blood nourishment',
      'Energy boosting'
    ]
  },

  // DINNER - RICE PUDDING
  {
    id: 24,
    name: 'Light Rice Pudding (Kheer Lite)',
    description: 'Light evening pudding',
    mealTime: 'Dinner',
    servings: 2,
    prepTime: '5 min',
    cookTime: '20 min',
    difficulty: 'Easy',
    suitableFor: ['Vata', 'Pitta'],
    ingredients: [
      { name: 'rice', quantity: 0.25 },
      { name: 'milk', quantity: 1.5 },
      { name: 'ghee', quantity: 0.25 },
      { name: 'dates', quantity: 0.5 }
    ],
    instructions: [
      'Toast rice lightly in ghee',
      'Add milk slowly while stirring',
      'Bring to simmer and cook for 15 minutes',
      'Rice should be cooked and soft',
      'Add chopped dates in last 2 minutes',
      'Stir well and cook until creamy',
      'Add cardamom if available',
      'Serve warm'
    ],
    healthBenefits: [
      'Very light for evening',
      'Nourishing and satisfying',
      'Promotes deep sleep',
      'Sweet grounding energy'
    ]
  },

  // LUNCH - CHICKPEA AND BROCCOLI
  {
    id: 25,
    name: 'Roasted Chickpea and Broccoli',
    description: 'Protein-rich vegetable medley',
    mealTime: 'Lunch',
    servings: 2,
    prepTime: '8 min',
    cookTime: '25 min',
    difficulty: 'Easy',
    suitableFor: ['Kapha', 'Pitta'],
    ingredients: [
      { name: 'broccoli', quantity: 1.25 },
      { name: 'coconut oil', quantity: 0.5 },
      { name: 'turmeric', quantity: 0.25 },
      { name: 'cumin', quantity: 0.25 },
      { name: 'lentil', quantity: 0.5 }
    ],
    instructions: [
      'Soak chickpeas overnight or use canned',
      'Cut broccoli into florets',
      'Heat coconut oil in a large pan',
      'Add cumin seeds and cook 30 seconds',
      'Add cooked chickpeas and broccoli',
      'Add turmeric and 1 cup water',
      'Cook covered for 15 minutes',
      'Vegetables should be tender but firm',
      'Season and serve'
    ],
    healthBenefits: [
      'Complete protein combination',
      'High in fiber',
      'Anti-inflammatory',
      'Supports metabolism'
    ]
  }
];


// Get recipes by dosha
export function getRecipesByDosha(dosha) {
  return sampleRecipes.filter(recipe => recipe.suitableFor.includes(dosha));
}

// Get recipes by difficulty
export function getRecipesByDifficulty(difficulty) {
  return sampleRecipes.filter(recipe => recipe.difficulty === difficulty);
}

// Save custom recipe to localStorage
export function saveCustomRecipe(recipe) {
  const recipes = localStorage.getItem('customRecipes');
  const parsed = recipes ? JSON.parse(recipes) : [];
  recipe.id = Date.now();
  recipe.isCustom = true;
  parsed.push(recipe);
  localStorage.setItem('customRecipes', JSON.stringify(parsed));
  return recipe;
}

// Load custom recipes from localStorage
export function loadCustomRecipes() {
  const recipes = localStorage.getItem('customRecipes');
  return recipes ? JSON.parse(recipes) : [];
}

// Get all recipes (sample + custom)
export function getAllRecipes() {
  return [...sampleRecipes, ...loadCustomRecipes()];
}

// Delete custom recipe
export function deleteCustomRecipe(recipeId) {
  const recipes = loadCustomRecipes();
  const filtered = recipes.filter(r => r.id !== recipeId);
  localStorage.setItem('customRecipes', JSON.stringify(filtered));
}

// Get available ingredients for autocomplete
export function getAvailableIngredients() {
  return Object.keys(nutrientDatabase).map(key => ({
    value: key,
    label: nutrientDatabase[key].name
  }));
}
