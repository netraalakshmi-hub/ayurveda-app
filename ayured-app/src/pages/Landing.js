import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AyurBalance</h1>
          <p className="hero-subtitle">
            Create personalized diet plans rooted in Ayurvedic principles. Balance your doshas, nourish your body, and embrace holistic health with our intelligent companion.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-start" onClick={() => navigate('/dosha-quiz')}>Start Your Journey</button>
            <button className="btn-doctor" onClick={() => navigate('/doctor-auth')}>Doctor Login</button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-card" onClick={() => navigate('/dosha-quiz')}>
            <div className="feature-icon">☯</div>
            <h3 className="feature-title">Dosha Assessment</h3>
            <p className="feature-text">Discover your unique constitution</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/food-recommendations')}>
            <div className="feature-icon">❤️</div>
            <h3 className="feature-title">Personalized Plans</h3>
            <p className="feature-text">Customized for your health goals</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/smart-insights')}>
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">AI-Powered</h3>
            <p className="feature-text">Smart recommendations & insights</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;