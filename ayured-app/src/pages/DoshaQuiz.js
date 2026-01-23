import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { doshaQuestions, calculateDosha } from '../utils/doshaUtils';
import '../styles/DoshaQuiz.css';

function DoshaQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < doshaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const doshaResult = calculateDosha(newAnswers);
      setResults(doshaResult);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return (
      <div className="dosha-page">
        <Navbar />
        <div className="dosha-results-container">
          <div className="results-card">
            <h1>Your Dosha Profile</h1>
            
            <div className="dosha-scores">
              <div className="score-item primary">
                <h2>{results.primary}</h2>
                <p>Primary Dosha</p>
                <div className="score-bar" style={{width: (results.scores[results.primary] / 18 * 100) + '%'}}></div>
                <span className="score-number">{results.scores[results.primary]}/18</span>
              </div>
              
              <div className="score-item secondary">
                <h2>{results.secondary}</h2>
                <p>Secondary Dosha</p>
                <div className="score-bar" style={{width: (results.scores[results.secondary] / 18 * 100) + '%'}}></div>
                <span className="score-number">{results.scores[results.secondary]}/18</span>
              </div>
              
              <div className="score-item tertiary">
                <h2>{results.tertiary}</h2>
                <p>Tertiary Dosha</p>
                <div className="score-bar" style={{width: (results.scores[results.tertiary] / 18 * 100) + '%'}}></div>
                <span className="score-number">{results.scores[results.tertiary]}/18</span>
              </div>
            </div>

            <div className="imbalance-info">
              <h3>Balance Status: <span className={`balance-${results.imbalanceLevel.toLowerCase()}`}>{results.imbalanceLevel}</span></h3>
              <p>
                {results.imbalanceLevel === 'High' && 'Your doshas are significantly imbalanced. Focus on balancing your primary dosha.'}
                {results.imbalanceLevel === 'Moderate' && 'Your doshas are moderately imbalanced. Work on grounding practices.'}
                {results.imbalanceLevel === 'Balanced' && 'Your doshas are well-balanced! Maintain your current practices.'}
              </p>
            </div>

            <div className="results-actions">
              <button className="btn-recommendations" onClick={() => navigate('/food-recommendations', { state: { dosha: results.primary } })}>
                Get Food Recommendations
              </button>
              <button className="btn-insights" onClick={() => navigate('/smart-insights', { state: { dosha: results.primary } })}>
                View Smart Insights
              </button>
              <button className="btn-retake" onClick={handleReset}>
                Retake Quiz
              </button>
              <button className="btn-home" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = doshaQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;

  return (
    <div className="dosha-page">
      <Navbar />
      <div className="quiz-container">
        <div className="quiz-card">
          <div className="quiz-header">
            <h1>Dosha Assessment Quiz</h1>
            <p>Discover your unique constitution</p>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: progress + '%'}}></div>
            <p className="progress-text">Question {currentQuestion + 1} of {doshaQuestions.length}</p>
          </div>

          <div className="question-section">
            <h3 className="category">{question.category}</h3>
            <h2 className="question-text">{question.question}</h2>

            <div className="answers-grid">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => handleAnswer(index)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-footer">
            <button className="btn-cancel" onClick={() => navigate('/')}>
              Exit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoshaQuiz;
