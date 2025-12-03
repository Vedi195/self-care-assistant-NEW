import React from "react";
import "./Cookies.css";

const Cookies = () => {
  return (
    <div className="policy-page">
      <div className="policy-card">
        <h1>🍪 Cookies Policy</h1>
        <p>
          Our Self-Care Assistant uses tiny cookies to remember your preferences
          and make your experience smooth and comforting.
        </p>

        <h2>✨ What Cookies Do</h2>
        <ul>
          <li>Save your app preferences</li>
          <li>Store streaks, tasks, or reminders locally</li>
          <li>Do NOT track browsing or personal data</li>
        </ul>

        <h2>🔧 Managing Cookies</h2>
        <p>
          You may clear cookies anytime, but doing so may reset your streaks or
          saved tasks.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
