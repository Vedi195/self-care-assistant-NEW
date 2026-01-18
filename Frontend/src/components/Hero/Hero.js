import React from 'react';
import './Hero.css';

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="hero-title">Welcome to Self-Care Assistant</h1>
        <p className="hero-subtitle">Your personal wellness guide for daily life</p>
      </motion.div>
    </section>
  );
};

export default Hero;