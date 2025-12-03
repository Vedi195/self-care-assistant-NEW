import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="policy-page">
      <div className="policy-card">
        <h1>📜 Terms & Conditions</h1>
        <p>
          By using Vedika’s Self-Care Assistant, you agree to follow these
          simple and peaceful terms.
        </p>

        <h2>🌼 Usage Rules</h2>
        <ul>
          <li>Use the app for personal wellness and motivation</li>
          <li>Do not misuse or modify system features</li>
        </ul>

        <h2>🌿 Service Limitations</h2>
        <p>
          This is a wellness guide and not a replacement for medical or mental
          health treatment.
        </p>

        <h2>❤️ User Responsibilities</h2>
        <p>
          Keep your login information private and use the app respectfully.
        </p>
      </div>
    </div>
  );
};

export default Terms;
