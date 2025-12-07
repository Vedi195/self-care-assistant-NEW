import React, { useState, useEffect } from 'react';
import './SkinHairCare.css';

import Confetti from "react-confetti";
import { FaRegCopy } from 'react-icons/fa';
import ReactMarkdown from "react-markdown";

const quizQuestionsMaster = [
  // skin questions
  {
    id: 'skinType',
    question: "How would you describe your skin’s behavior on a normal day?",
    category: "skin",
    options: ["Oily", "Dry", "Combination", "Sensitive", "Normal"]
  },
  {
    id: 'skinConcern',
    question: "What’s the biggest skin issue you want to fix right now?",
    category: "skin",
    options: ["Acne", "Dark Spots", "Aging / Fine Lines", "Dry Patches", "Redness / Irritation"]
  },

  // hair questions
  {
    id: 'hairType',
    question: "What type of hair do you naturally have?",
    category: "hair",
    options: ["Straight", "Wavy", "Curly", "Coily"]
  },
  {
    id: 'hairTexture',
    question: "How would you describe your hair texture?",
    category: "hair",
    options: ["Fine", "Medium", "Thick", "Coarse"]
  },
  {
    id: 'hairConcern',
    question: "Which hair concern bothers you the most?",
    category: "hair",
    options: ["Frizz", "Hair Fall", "Dandruff", "Damage", "Dryness", "Oiliness"]
  },
  {
    id: 'washFrequency',
    question: "How often do you usually wash your hair?",
    category: "hair",
    options: ["Daily", "Every 2 Days", "2–3× Weekly", "Once a Week", "Rarely"]
  },

  // general
  {
    id: 'budget',
    question: "What’s your preferred budget for beauty products?",
    category: "general",
    options: ["Budget", "Mid-Range", "Premium", "Luxury"]
  },

  // optional extras (kept but shown only in 'both' or if you want to expand)
  {
    id: 'skinAfterWash',
    question: "How does your skin usually feel after washing your face?",
    category: "skin",
    options: ["Tight", "Soft", "Oily", "Itchy / Red"]
  },
  {
    id: 'scalpBehavior',
    question: "How does your scalp behave most days?",
    category: "hair",
    options: ["Normal", "Itchy", "Flaky", "Oily"]
  }
];

const fullRoutines = {
  skin: {
    oily: {
      morning: [
        "Foaming cleanser (2 mins)",
        "Salicylic toner (30 sec)",
        "Gel moisturizer (1 min)",
        "Sunscreen SPF 30+ (1 min)"
      ],
      evening: [
        "Oil cleanser (1 min)",
        "Foaming cleanser (2 min)",
        "Retinol (2–3 nights/week)",
        "Light moisturizer (1 min)"
      ]
    },
    dry: {
      morning: [
        "Cream cleanser",
        "Hydrating toner",
        "Vitamin C serum",
        "Thick moisturizer",
        "SPF 30+"
      ],
      evening: [
        "Oil/cream cleanser",
        "Hydrating toner",
        "Hyaluronic serum",
        "Night cream"
      ]
    },
    combination: {
      morning: [
        "Gentle cleanser",
        "Balancing toner",
        "Light moisturizer",
        "SPF 30+"
      ],
      evening: [
        "Cleanser",
        "Niacinamide serum",
        "Gel moisturizer"
      ]
    },
    sensitive: {
      morning: [
        "Non-foaming cleanser",
        "Aloe toner",
        "Light cream",
        "SPF"
      ],
      evening: [
        "Cream cleanser",
        "Centella serum",
        "Calming moisturizer"
      ]
    },
    normal: {
      morning: [
        "Gentle cleanser",
        "Hydrating toner",
        "Moisturizer",
        "SPF"
      ],
      evening: [
        "Cleanser",
        "Serum (Vitamin C / HA)",
        "Night moisturizer"
      ]
    }
  },

  hair: {
    straight: {
      wash: ["Use mild shampoo", "Apply light conditioner", "Air dry"],
      weekly: ["Hair oiling once a week", "Hair mask once a week"]
    },
    wavy: {
      wash: ["Sulfate-free shampoo", "Condition mid–ends", "Scrunch while drying"],
      weekly: ["Deep conditioning", "Apply hair serum"]
    },
    curly: {
      wash: ["Co-wash or sulfate-free shampoo", "Leave-in conditioner", "Dry with microfiber towel"],
      weekly: ["Curl mask", "Hair oil before wash"]
    },
    coily: {
      wash: ["Moisturizing shampoo", "Rich conditioner", "Leave-in cream"],
      weekly: ["Hot oil treatment", "Deep hydration mask"]
    }
  }
};

const organicRemedies = [
  {
    name: "Honey & Oatmeal Face Mask",
    purpose: "For sensitive or dry skin",
    ingredients: ["2 tbsp oatmeal", "1 tbsp honey", "1 tsp water"],
    instructions: "Mix ingredients, apply for 15 minutes, rinse with warm water",
    benefits: "Soothes irritation, provides gentle exfoliation"
  },
  {
    name: "Coconut Oil Hair Treatment",
    purpose: "For dry or damaged hair",
    ingredients: ["2-3 tbsp coconut oil", "Optional: few drops essential oil"],
    instructions: "Warm oil, apply to hair, leave for 30 minutes, shampoo out",
    benefits: "Deep moisturizing, reduces protein loss"
  },
  {
    name: "Green Tea Toner",
    purpose: "For oily or acne-prone skin",
    ingredients: ["1 green tea bag", "1 cup hot water", "1 tsp apple cider vinegar"],
    instructions: "Steep tea, cool, add vinegar, apply with cotton pad",
    benefits: "Reduces inflammation, controls oil production"
  },
  {
    name: "Avocado Hair Mask",
    purpose: "For nourishing dry hair",
    ingredients: ["1 ripe avocado", "2 tbsp olive oil", "1 tbsp honey"],
    instructions: "Mash avocado, mix with oil and honey, apply for 20 minutes",
    benefits: "Rich in vitamins, deeply moisturizes"
  }
];

const SkinHairCare = () => {
  const [currentView, setCurrentView] = useState('main');

  // pre-quiz selection
  const [quizMode, setQuizMode] = useState(null); // 'skin' | 'hair' | 'both'
  const [quizStarted, setQuizStarted] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState([]); // filtered questions for current quiz
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [careProfile, setCareProfile] = useState(null);

  // chat related
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // dropdowns for routines
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [selectedHairType, setSelectedHairType] = useState("");

  useEffect(() => {
    // Load saved profile
    const savedProfile = localStorage.getItem('skinHairProfile');
    if (savedProfile) {
      setCareProfile(JSON.parse(savedProfile));
    }

    // Initialize chat
    setChatMessages([
      {
        type: 'bot',
        message: "✨ Hello! I'm your skin and hair care specialist! Ask me about skincare routines, hair care tips, product recommendations, or any beauty concerns you have. How can I help you glow today?"
      }
    ]);
  }, []);

  // prepare questions when mode selected
  useEffect(() => {
    if (!quizMode) return;

    let filtered = [];
    if (quizMode === 'skin') {
      filtered = quizQuestionsMaster.filter(q => q.category === 'skin' || q.category === 'general');
    } else if (quizMode === 'hair') {
      filtered = quizQuestionsMaster.filter(q => q.category === 'hair' || q.category === 'general');
    } else { // both
      filtered = quizQuestionsMaster.filter(q => q.category === 'skin' || q.category === 'hair' || q.category === 'general');
    }

    // keep order consistent
    setQuizQuestions(filtered);
    setQuizStep(0);
    setQuizAnswers({});
  }, [quizMode]);

  const startQuiz = (mode) => {
    setQuizMode(mode);
    setQuizStarted(true);
    // currentView stays 'quiz'
  };

  const handleQuizAnswer = (answer) => {
    const currentQuestion = quizQuestions[quizStep];
    const newAnswers = { ...quizAnswers, [currentQuestion.id]: answer };
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // finished
      generateCareProfile(newAnswers);
    }
  };

  const generateRecommendations = (answers) => {
    const recs = [];

    // Skin
    const skinType = answers.skinType;
    if (skinType === 'Oily') {
      recs.push({
        category: 'Skincare',
        title: 'Oil Control Routine',
        description: 'Use gel-based cleansers, salicylic acid toners, and lightweight moisturizers. Avoid over-cleansing.',
        products: ['Cetaphil Foaming Cleanser', "Paula's Choice BHA Liquid", 'Neutrogena Oil-Free Moisturizer']
      });
    } else if (skinType === 'Dry') {
      recs.push({
        category: 'Skincare',
        title: 'Hydration Focus',
        description: 'Use cream cleansers, hydrating serums, and rich moisturizers. Add face oils at night.',
        products: ['CeraVe Hydrating Cleanser', 'The Ordinary Hyaluronic Acid', 'Vanicream Daily Facial Moisturizer']
      });
    } else if (skinType === 'Combination') {
      recs.push({
        category: 'Skincare',
        title: 'Balanced Routine',
        description: 'Mix lightweight products for oily areas and richer products for dry zones. Spot-treat where needed.',
        products: ['Gentle Cleanser', 'Niacinamide Serum', 'Light Moisturizer']
      });
    } else if (skinType === 'Sensitive') {
      recs.push({
        category: 'Skincare',
        title: 'Gentle & Soothing',
        description: 'Avoid strong acids and fragrances; opt for centella/aloe based soothing products.',
        products: ['Cetaphil Gentle Cleanser', 'Centella Serum', 'Fragrance-free Moisturizer']
      });
    } else {
      recs.push({
        category: 'Skincare',
        title: 'Daily Essentials',
        description: 'Gentle cleanser, antioxidant serum, moisturizer and SPF daily.',
        products: ['Gentle Cleanser', 'Vitamin C Serum', 'SPF 30+']
      });
    }

    // Hair
    const hairType = answers.hairType;
    if (hairType === 'Curly' || hairType === 'Coily') {
      recs.push({
        category: 'Haircare',
        title: 'Curl Care Method',
        description: 'Use sulfate-free shampoos, deep condition weekly, and apply leave-in conditioner to wet hair.',
        products: ['DevaCurl Low-Poo', 'Shea Moisture Deep Treatment Mask', 'Ouai Leave-In Conditioner']
      });
    } else if (hairType === 'Wavy') {
      recs.push({
        category: 'Haircare',
        title: 'Enhance Your Waves',
        description: 'Use lightweight creams to define waves, avoid heavy oils mid-lengths.',
        products: ['Sulfate-free Shampoo', 'Wave Defining Cream', 'Light Conditioner']
      });
    } else if (hairType === 'Straight') {
      recs.push({
        category: 'Haircare',
        title: 'Light Care',
        description: 'Gentle cleansing and light conditioning to avoid weighing hair down.',
        products: ['Gentle Shampoo', 'Light Conditioner', 'Heat Protectant']
      });
    } else {
      recs.push({
        category: 'Haircare',
        title: 'General Hair Health',
        description: 'Hydrate, avoid excess heat, and deep condition weekly.',
        products: ['Hydrating Shampoo', 'Deep Conditioner', 'Hair Mask']
      });
    }

    return recs;
  };

  const generateCareProfile = (answers) => {
    const profile = {
      skinType: answers.skinType || '',
      skinConcern: answers.skinConcern || '',
      hairType: answers.hairType || '',
      hairTexture: answers.hairTexture || '',
      hairConcern: answers.hairConcern || '',
      washFrequency: answers.washFrequency || '',
      budget: answers.budget || '',
      recommendations: generateRecommendations(answers)
    };

    setCareProfile(profile);
    localStorage.setItem('skinHairProfile', JSON.stringify(profile));
    // reset quiz flow
    setQuizStarted(false);
    setQuizMode(null);
    setQuizQuestions([]);
    setQuizStep(0);
    setQuizAnswers({});
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizStep(0);
    setCareProfile(null);
    localStorage.removeItem('skinHairProfile');
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setIsLoading(true);

    // Add user message to UI
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);

    try {
      const response = await fetch("http://localhost:5000/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a gentle and knowledgeable skin & hair care advisor. Give safe, simple, and practical care tips using common products. Avoid medical advice. Keep suggestions clear and easy to follow. 
          RULES:
          1. If the user is greeting (e.g., "hi", "hello", "hey"), respond casually and short.
          2. If the user says "thanks", "okay", "good", "bye", respond normally and DO NOT give steps.
          3. If the user asks for advice, routines, fashion tips, skin care, hair care, or any guidance — then reply in a structured format with:
            - Headings
            - Steps
            - Bullet points
            - Clean spacing
          4. Always detect user intent before choosing the response format.
          5. Never return steps for small talk.
          User: ${userMessage}`
        })
      });

      const data = await response.json();

      const botResponse = data.reply || "Sorry, I couldn't generate a response right now.";

      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    } catch (error) {
      console.error("Frontend error:", error);
      setChatMessages(prev => [
        ...prev,
        { type: 'bot', message: "⚠️ Something went wrong. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTipToFavorites = (tip) => {
    const favorites = JSON.parse(localStorage.getItem('skinCareFavorites') || '[]');
    if (!favorites.includes(tip)) {
      favorites.push(tip);
      localStorage.setItem('skinCareFavorites', JSON.stringify(favorites));
      alert('Tip saved to favorites! ❤️');
    } else {
      alert('This tip is already in your favorites! 😊');
    }
  };

  // UI helpers
  const goToQuizScreen = () => {
    setCurrentView('quiz');
    setQuizMode(null);
    setQuizStarted(false);
    setQuizQuestions([]);
    setQuizAnswers({});
    setQuizStep(0);
  };

  const cancelPreQuiz = () => {
    setQuizMode(null);
    setQuizStarted(false);
    setQuizQuestions([]);
    setQuizStep(0);
  };

  return (
    <div className="skin-hair-care">
      <div className="care-header">
        <h1>💆‍♀️ Skin & Hair Care</h1>
        <p>Discover your perfect beauty routine with personalized recommendations</p>
      </div>

      <div className="care-nav">
        <button
          className={currentView === 'main' ? 'active' : ''}
          onClick={() => setCurrentView('main')}
        >
          🏠 Overview
        </button>
        <button
          className={currentView === 'quiz' ? 'active' : ''}
          onClick={goToQuizScreen}
        >
          📋 Care Quiz
        </button>
        <button
          className={currentView === 'routines' ? 'active' : ''}
          onClick={() => setCurrentView('routines')}
        >
          📅 Routines
        </button>
        <button
          className={currentView === 'organic' ? 'active' : ''}
          onClick={() => setCurrentView('organic')}
        >
          🌿 Natural Remedies
        </button>
        <button
          className={currentView === 'chat' ? 'active' : ''}
          onClick={() => setCurrentView('chat')}
        >
          💬 Beauty Chat
        </button>
      </div>

      {currentView === 'main' && (
        <div className="main-view">
          <div className="feature-cards">
            <div className="feature-card" onClick={() => { setCurrentView('quiz'); goToQuizScreen(); }}>
              <div className="feature-icon">🔍</div>
              <h3>Find Your Type</h3>
              <p>Take our quiz to discover your skin and hair type with personalized recommendations</p>
            </div>

            <div className="feature-card" onClick={() => setCurrentView('routines')}>
              <div className="feature-icon">📅</div>
              <h3>Care Routines</h3>
              <p>Explore morning and evening routines tailored to your specific needs</p>
            </div>

            <div className="feature-card" onClick={() => setCurrentView('organic')}>
              <div className="feature-icon">🌿</div>
              <h3>Natural Remedies</h3>
              <p>Discover organic DIY treatments using ingredients from your kitchen</p>
            </div>
          </div>

          <div className="daily-tips">
            <h3>💡 Today's Beauty Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🧴</div>
                <h4>Less is More</h4>
                <p>Start with a simple routine and gradually add products. Your skin needs time to adjust.</p>
                <button onClick={() => saveTipToFavorites("Start with a simple routine and gradually add products. Your skin needs time to adjust.")}>
                  ❤️ Save
                </button>
              </div>

              <div className="tip-card">
                <div className="tip-icon">☀️</div>
                <h4>SPF Every Day</h4>
                <p>Sunscreen is your best anti-aging product. Apply daily, even when staying indoors.</p>
                <button onClick={() => saveTipToFavorites("Sunscreen is your best anti-aging product. Apply daily, even when staying indoors.")}>
                  ❤️ Save
                </button>
              </div>

              <div className="tip-card">
                <div className="tip-icon">💧</div>
                <h4>Hydrate Inside Out</h4>
                <p>Drink plenty of water and use hydrating products for healthy, glowing skin.</p>
                <button onClick={() => saveTipToFavorites("Drink plenty of water and use hydrating products for healthy, glowing skin.")}>
                  ❤️ Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- QUIZ VIEW --- */}
      {currentView === 'quiz' && (
        <div className="quiz-view">

          {/* Pre-quiz selection cards */}
          {!quizStarted && !careProfile && (
            <div className="pre-quiz">
              <h2 className="pre-quiz-title">Choose your quiz</h2>
              <div className="pre-quiz-cards">
                <div
                  className="quiz-card"
                  onClick={() => startQuiz('skin')}
                >
                  <div className="quiz-card-icon">🧴</div>
                  <h3>Skin Care Quiz</h3>
                  <p>Quick, targeted questions to build a skincare routine that suits you.</p>
                </div>

                <div
                  className="quiz-card"
                  onClick={() => startQuiz('hair')}
                >
                  <div className="quiz-card-icon">💇‍♀️</div>
                  <h3>Hair Care Quiz</h3>
                  <p>Find the right routine and products for your hair type and concerns.</p>
                </div>

                <div
                  className="quiz-card"
                  onClick={() => startQuiz('both')}
                >
                  <div className="quiz-card-icon">✨</div>
                  <h3>Both (Full Quiz)</h3>
                  <p>A full assessment for skin + hair — more detailed and personalized.</p>
                </div>
              </div>

              <div className="pre-quiz-note">
                <small>Tip: choose the one you care about most — you can retake anytime.</small>
              </div>
            </div>
          )}

          {/* Quiz questions flow */}
          {quizStarted && quizQuestions.length > 0 && (
            <div className="quiz-container">
              <div className="quiz-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
                <span>Question {quizStep + 1} of {quizQuestions.length}</span>
              </div>

              <div className="question-card">
                <h3>{quizQuestions[quizStep].question}</h3>
                <div className="options">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <button
                      key={index}
                      className="option-btn"
                      onClick={() => handleQuizAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quiz-actions">
                <button className="cancel-quiz" onClick={cancelPreQuiz}>Cancel</button>
              </div>
            </div>
          )}

          {/* Results */}
          {careProfile && (
            <div className="results-container">
              <Confetti numberOfPieces={180} gravity={0.25} recycle={false} />
              <h2>✨ Your Personalized Beauty Profile</h2>
              <div className="profile-summary">
                <div className="profile-item">
                  <strong>Skin Type:</strong> {careProfile.skinType}
                </div>
                <div className="profile-item">
                  <strong>Hair Type:</strong> {careProfile.hairType} {careProfile.hairTexture}
                </div>
                <div className="profile-item">
                  <strong>Main Concerns:</strong> {careProfile.skinConcern}{careProfile.hairConcern ? `, ${careProfile.hairConcern}` : ''}
                </div>
              </div>

              <div className="recommendations">
                {careProfile.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <h4>{rec.title}</h4>
                    <p>{rec.description}</p>
                    <div className="rec-products">
                      {rec.products && (
                        <small><strong>Suggested:</strong> {rec.products.join(', ')}</small>
                      )}
                    </div>
                    <button onClick={() => saveTipToFavorites(rec.description)}>
                      ❤️ Save
                    </button>
                  </div>
                ))}
              </div>

              <button className="retry-btn" onClick={resetQuiz}>
                🔄 Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- ROUTINES VIEW --- */}
      {currentView === "routines" && (
        <div className="routines-view">

          <h2>✨ Personalized Skin & Hair Routine</h2>

          {/* Skin Type Dropdown */}
          <div className="select-group">
            <label>Select Skin Type</label>
            <select
              value={selectedSkinType}
              onChange={(e) => setSelectedSkinType(e.target.value)}
            >
              <option value="">Choose your skin type</option>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
              <option value="combination">Combination</option>
              <option value="sensitive">Sensitive</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Hair Type Dropdown */}
          <div className="select-group">
            <label>Select Hair Type</label>
            <select
              value={selectedHairType}
              onChange={(e) => setSelectedHairType(e.target.value)}
            >
              <option value="">Choose your hair type</option>
              <option value="straight">Straight</option>
              <option value="wavy">Wavy</option>
              <option value="curly">Curly</option>
              <option value="coily">Coily</option>
            </select>
          </div>

          {/* Skin Routine Output */}
          {selectedSkinType && (
            <div className="routine-card">
              <h3>🧴 Skin Care Routine ({selectedSkinType})</h3>

              <h4>🌞 Morning Routine</h4>
              <ul>
                {fullRoutines.skin[selectedSkinType].morning.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h4>🌙 Evening Routine</h4>
              <ul>
                {fullRoutines.skin[selectedSkinType].evening.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hair Routine Output */}
          {selectedHairType && (
            <div className="routine-card">
              <h3>💇‍♀️ Hair Care Routine ({selectedHairType})</h3>

              <h4>🚿 Wash Routine</h4>
              <ul>
                {fullRoutines.hair[selectedHairType].wash.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h4>🧪 Weekly Routine</h4>
              <ul>
                {fullRoutines.hair[selectedHairType].weekly.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

      {/* --- ORGANIC VIEW --- */}
      {currentView === 'organic' && (
        <div className="organic-view">
          <h2>🌿 Natural Beauty Remedies</h2>
          <div className="remedies-grid">
            {organicRemedies.map((remedy, index) => (
              <div key={index} className="remedy-card">
                <h3>{remedy.name}</h3>
                <p className="remedy-purpose">{remedy.purpose}</p>
                <div className="remedy-details">
                  <div className="ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                      {remedy.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="instructions">
                    <strong>Instructions:</strong>
                    <p>{remedy.instructions}</p>
                  </div>
                  <div className="benefits">
                    <strong>Benefits:</strong>
                    <p>{remedy.benefits}</p>
                  </div>
                </div>
                <button onClick={() => saveTipToFavorites(`${remedy.name}: ${remedy.instructions}`)}>
                  ❤️ Save Recipe
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CHAT VIEW --- */}
      {currentView === 'chat' && (
        <div className="chat-view">
          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content">
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                    <div className="message-actions">
                      {msg.type === 'bot' && (
                        <button
                          className="copy-btn"
                          onClick={() => navigator.clipboard.writeText(msg.message)}
                        >
                          <FaRegCopy />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message bot">
                  <div className="message-content loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form className="chat-input-form" onSubmit={handleChatSubmit}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about skincare, haircare, products..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !chatInput.trim()}>
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinHairCare;
