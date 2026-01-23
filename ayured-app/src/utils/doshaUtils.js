// Dosha calculation and assessment logic

export const doshas = {
  VATA: 'Vata',
  PITTA: 'Pitta',
  KAPHA: 'Kapha'
};

export const doshaQuestions = [
  {
    id: 1,
    category: 'Body Type',
    question: 'What best describes your body type?',
    answers: [
      { text: 'Thin, lean, or light-boned', dosha: 'Vata', points: 3 },
      { text: 'Moderate, muscular, well-proportioned', dosha: 'Pitta', points: 3 },
      { text: 'Sturdy, broad, gains weight easily', dosha: 'Kapha', points: 3 }
    ]
  },
  {
    id: 2,
    category: 'Digestion',
    question: 'How is your digestion typically?',
    answers: [
      { text: 'Variable, often irregular', dosha: 'Vata', points: 3 },
      { text: 'Strong, fast digestion', dosha: 'Pitta', points: 3 },
      { text: 'Slow, heavy digestion', dosha: 'Kapha', points: 3 }
    ]
  },
  {
    id: 3,
    category: 'Sleep',
    question: 'How is your sleep pattern?',
    answers: [
      { text: 'Light sleep, easily disturbed', dosha: 'Vata', points: 3 },
      { text: 'Moderate sleep, heat sensitive', dosha: 'Pitta', points: 3 },
      { text: 'Deep sleep, sleep a lot', dosha: 'Kapha', points: 3 }
    ]
  },
  {
    id: 4,
    category: 'Mood',
    question: 'What is your dominant mood/personality?',
    answers: [
      { text: 'Creative, anxious, quick-changing', dosha: 'Vata', points: 3 },
      { text: 'Focused, ambitious, competitive', dosha: 'Pitta', points: 3 },
      { text: 'Calm, stable, laid-back', dosha: 'Kapha', points: 3 }
    ]
  },
  {
    id: 5,
    category: 'Appetite',
    question: 'What is your appetite level?',
    answers: [
      { text: 'Variable, skips meals', dosha: 'Vata', points: 3 },
      { text: 'Strong, gets angry if hungry', dosha: 'Pitta', points: 3 },
      { text: 'Moderate, steady', dosha: 'Kapha', points: 3 }
    ]
  },
  {
    id: 6,
    category: 'Temperature Preference',
    question: 'What weather do you prefer?',
    answers: [
      { text: 'Warm, avoid cold and wind', dosha: 'Vata', points: 3 },
      { text: 'Cool, avoid heat', dosha: 'Pitta', points: 3 },
      { text: 'Warm and dry, avoid damp', dosha: 'Kapha', points: 3 }
    ]
  }
];

export const calculateDosha = (answers) => {
  const scores = { Vata: 0, Pitta: 0, Kapha: 0 };

  answers.forEach((answerId, questionIndex) => {
    const question = doshaQuestions[questionIndex];
    const answer = question.answers[answerId];
    scores[answer.dosha] += answer.points;
  });

  const sortedDoshas = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([dosha, score]) => ({ dosha, score }));

  return {
    primary: sortedDoshas[0].dosha,
    secondary: sortedDoshas[1].dosha,
    tertiary: sortedDoshas[2].dosha,
    scores: scores,
    imbalanceLevel: calculateImbalance(sortedDoshas[0].score, sortedDoshas[2].score)
  };
};

const calculateImbalance = (maxScore, minScore) => {
  const difference = maxScore - minScore;
  if (difference > 10) return 'High';
  if (difference > 5) return 'Moderate';
  return 'Balanced';
};

// Food recommendations based on dosha
export const foodRecommendations = {
  Vata: {
    toEat: [
      'Warm, cooked foods',
      'Ghee and oils',
      'Sweet, sour, salty tastes',
      'Grains: wheat, rice, oats',
      'Vegetables: carrots, beets, asparagus, zucchini',
      'Fruits: bananas, avocados, berries',
      'Spices: ginger, cumin, black pepper',
      'Nuts and seeds (soaked)',
      'Warm milk with spices',
      'Sesame oil'
    ],
    toAvoid: [
      'Raw, cold foods',
      'Dry fruits and vegetables',
      'Caffeine in excess',
      'Refined sugar',
      'Corn, barley',
      'Bitter and astringent tastes',
      'Ice cream, cold drinks',
      'Excessive fasting',
      'Popcorn, crackers',
      'Carbonated beverages'
    ]
  },
  Pitta: {
    toEat: [
      'Cool, refreshing foods',
      'Coconut oil',
      'Sweet, bitter, astringent tastes',
      'Whole grains: barley, rice, oats',
      'Vegetables: leafy greens, cucumbers, broccoli, celery',
      'Fruits: coconut, melons, grapes, pomegranate',
      'Legumes: mung beans, split peas',
      'Spices: cilantro, fennel, turmeric',
      'Cooling herbs: mint, aloe',
      'Ghee (in moderation)'
    ],
    toAvoid: [
      'Spicy, hot foods',
      'Alcohol and caffeine',
      'Excess salt',
      'Red meat',
      'Sesame and mustard oil',
      'Sour fruits and fermented foods',
      'Hot peppers, garlic, onions',
      'Hot beverages',
      'Fried and greasy foods',
      'Excess sun exposure'
    ]
  },
  Kapha: {
    toEat: [
      'Light, warming foods',
      'Mustard oil',
      'Spicy, bitter, astringent tastes',
      'Light grains: barley, millet, corn',
      'Vegetables: leafy greens, broccoli, cabbage, peppers',
      'Fruits: apples, pears, berries, pomegranate',
      'Legumes: mung beans, lentils',
      'Spices: ginger, black pepper, cayenne, turmeric',
      'Honey (in moderation)',
      'Herbal teas'
    ],
    toAvoid: [
      'Heavy, oily foods',
      'Dairy in excess',
      'Sweet, salty tastes',
      'Rice, wheat in excess',
      'Coconut oil, sesame oil',
      'Nuts in excess',
      'Cold drinks and foods',
      'Sugar and refined carbs',
      'Meat and fish (heavy proteins)',
      'Frozen desserts'
    ]
  }
};

// Meal timing recommendations by dosha
export const mealTimings = {
  Vata: {
    breakfast: '8:00 - 9:00 AM',
    lunch: '12:00 - 1:00 PM (largest meal)',
    dinner: '6:00 - 7:00 PM (light)',
    note: 'Eat at regular times for grounding'
  },
  Pitta: {
    breakfast: '7:00 - 8:00 AM (light)',
    lunch: '12:00 - 1:00 PM (largest meal)',
    dinner: '7:00 - 8:00 PM (moderate)',
    note: 'Avoid eating too late to prevent acidity'
  },
  Kapha: {
    breakfast: '7:00 - 8:00 AM (light or skip)',
    lunch: '12:00 - 1:00 PM (largest meal)',
    dinner: '6:00 - 7:00 PM (light)',
    note: 'Avoid heavy breakfasts; exercise before eating'
  }
};

// Seasonal adjustments
export const seasonalDiets = {
  Vata: {
    spring: 'Increase warm oils; add grounding foods like root vegetables',
    summer: 'Can handle more raw foods but keep warm; add cooling spices to prevent overheating',
    fall: 'Increase oils and warm foods; favor heavier foods for stability',
    winter: 'Maximum warming; favor ghee, oils, and heating spices'
  },
  Pitta: {
    spring: 'Cooling herbs and vegetables; reduce spicy foods',
    summer: 'Maximum cooling; coconut, cucumber, melons; avoid heat',
    fall: 'Warm but not spicy; balance with cooling ingredients',
    winter: 'More warming but avoid excess heat; favor mild spices'
  },
  Kapha: {
    spring: 'Light, warming foods; avoid mucus-forming foods',
    summer: 'Light meals; increase exercise; spicy and bitter foods',
    fall: 'Warming spices; light meals; promote digestion',
    winter: 'Maximum heat and movement; favor spicy and dry foods'
  }
};

// Smart insights rules
export const generateSmartInsights = (dosha, healthIssues = []) => {
  const insights = [];

  const baseInsights = {
    Vata: [
      '✓ Your Vata is naturally variable - establish routines to ground yourself',
      '✓ Drink warm water instead of cold drinks to improve digestion',
      '✓ Avoid skipping meals - eat at regular times',
      '✓ Warm oils like sesame help balance your variable nature',
      '✓ Practice calming activities like yoga and meditation',
      '✓ Ensure adequate sleep (7-8 hours) for stability'
    ],
    Pitta: [
      '✓ Your Pitta tends toward intensity - practice cooling activities',
      '✓ Drink coconut water to naturally cool your system',
      '✓ Avoid excessive heat (sun, spicy foods, intense exercise)',
      '✓ Summer is your challenging season - increase cooling foods',
      '✓ Practice patience and compassion in daily life',
      '✓ Take time to relax; don\'t push yourself too hard'
    ],
    Kapha: [
      '✓ Your Kapha brings stability - use it to establish healthy routines',
      '✓ Morning exercise stimulates your digestion',
      '✓ Light, warming foods prevent sluggishness',
      '✓ Vary your routine to stay mentally sharp',
      '✓ Warming spices like ginger enhance your metabolism',
      '✓ Avoid excessive daytime napping'
    ]
  };

  insights.push(...baseInsights[dosha]);

  // Health issue-specific insights
  if (healthIssues.includes('digestion')) {
    insights.push('⚠ For better digestion: eat slowly, chew well, avoid cold water with meals');
  }
  if (healthIssues.includes('sleep')) {
    insights.push('⚠ For better sleep: avoid screens 1 hour before bed, warm milk with spices');
  }
  if (healthIssues.includes('stress')) {
    insights.push('⚠ For stress: practice meditation, breathing exercises, and warm oils');
  }
  if (healthIssues.includes('weight')) {
    insights.push('⚠ For weight management: consistent exercise, proper meal timing, reduce snacking');
  }
  if (healthIssues.includes('energy')) {
    insights.push('⚠ For better energy: morning routines, warm lemon water, regular sleep');
  }

  return insights;
};
