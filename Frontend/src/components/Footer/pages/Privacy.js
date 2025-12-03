import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="policy-page">
      <div className="policy-card">
        <h1>🔐 Privacy Policy</h1>
        <p>
          Your privacy is important to us. This Self-Care Assistant app collects
          minimal data to provide a personalized and calming experience.
        </p>

        <h2>📌 What We Collect</h2>
        <ul>
          <li>Basic usage activity (like reminders, to-do items)</li>
          <li>No financial or sensitive data is collected</li>
          <li>No data is shared with third-party companies</li>
        </ul>

        <h2>💬 How We Use Your Data</h2>
        <p>
          All information is used only to improve your wellness journey and is
          stored securely.
        </p>

        <h2>🛡 Your Rights</h2>
        <p>You can request deletion or correction of your data anytime.</p>
      </div>
    </div>
  );
};

export default Privacy;
