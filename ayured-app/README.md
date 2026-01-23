# AyurBalance - AI-Powered Ayurvedic Health App

An intelligent React application that provides personalized Ayurvedic diet plans, dosha assessments, and health insights using rule-based AI recommendations.

## Features

### 🧘 **Dosha Assessment Quiz**
- Interactive 6-question quiz to determine your unique Ayurvedic constitution
- Calculates Primary, Secondary, and Tertiary doshas
- Measures imbalance level for personalized guidance
- Visual scoring system with detailed results

### 🍎 **AI-Powered Food Recommendations**
- Personalized diet plans based on your dosha and health profile
- Input: Age, gender, height, weight, health issues, current season
- Get recommendations for:
  - Foods to eat and avoid
  - Optimal meal timings
  - Seasonal diet adjustments
  - Sample daily menus

### ✨ **Smart Health Insights**
- Rule-based AI suggestions tailored to your dosha
- Daily wellness tips (morning/evening routines, exercise, hydration)
- Quick remedies for common health issues
- Seasonal adjustment guidelines
- Health-concern-specific recommendations

### 👨‍⚕️ **Doctor Portal**
- Create and manage patient diet charts
- Auto-generate diet plans using AI
- Edit and approve patient charts
- Track patient health profiles
- Store clinical notes and observations

## Tech Stack

- **Frontend**: React 19.2.3
- **Routing**: React Router v6
- **Styling**: CSS3 with responsive design
- **State Management**: React Hooks

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/ayured-app.git
cd ayured-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3001
```

## Project Structure

```
ayured-app/
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Landing.js
│   │   ├── DoshaQuiz.js
│   │   ├── FoodRecommendations.js
│   │   ├── SmartInsights.js
│   │   ├── DoctorAuth.js
│   │   └── DoctorDietChart.js
│   ├── styles/
│   │   ├── Landing.css
│   │   ├── DoshaQuiz.css
│   │   ├── FoodRecommendations.css
│   │   ├── SmartInsights.css
│   │   ├── DoctorAuth.css
│   │   └── DoctorDietChart.css
│   ├── utils/
│   │   └── doshaUtils.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with feature overview |
| `/dosha-quiz` | Dosha assessment quiz |
| `/food-recommendations` | Personalized diet recommendations |
| `/smart-insights` | Health insights and tips |
| `/doctor-auth` | Doctor login/signup |
| `/doctor-diet-chart` | Doctor portal for managing patient charts |

## How to Use

### For Users:
1. Click "Start Your Journey" on the landing page
2. Complete the Dosha Assessment quiz (6 questions)
3. View your dosha profile with balance status
4. Get personalized food recommendations
5. Explore smart health insights

### For Doctors:
1. Click "Doctor Login" on the navbar
2. Sign in or create an account
3. Access the diet chart management portal
4. Create patient profiles and generate AI-powered diet plans
5. Edit, approve, and track patient charts

## Dosha Types Explained

**Vata (Air & Ether)**: Creative, adaptable, quick-moving
- Recommendations: Warm foods, oils, grounding practices

**Pitta (Fire & Water)**: Driven, intelligent, focused
- Recommendations: Cool foods, cooling herbs, moderation

**Kapha (Water & Earth)**: Stable, compassionate, grounded
- Recommendations: Light foods, spices, active lifestyle

## AI Recommendation Engine

The app uses a rule-based AI system that:
- Analyzes dosha composition from user answers
- Considers specific health issues
- Factors in seasonal changes
- Generates personalized diet and lifestyle suggestions
- Can be extended with real ML models for enhanced predictions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project

## Contact

For questions or suggestions, please open an issue on GitHub.

---

**Disclaimer**: This app provides educational content based on Ayurvedic principles. Always consult with a qualified healthcare provider before making significant dietary or lifestyle changes.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
