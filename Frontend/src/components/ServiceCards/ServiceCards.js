import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCards.css';

import { motion } from "framer-motion";

const ServiceCards = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: '👗👔',
      title: 'Fashion Suggestion',
      description: 'What should i wear today?',
      path: '/fashion-suggestion'
    },
    {
      id: 2,
      icon: '🧘🏻‍♀️🧘🏻',
      title: 'Health Tips',
      description: 'Tips to stay fit and strong',
      path: '/health-tips'
    },
    {
      id: 3,
      icon: '📅',
      title: 'Daily Routine',
      description: 'Plan your perfect day',
      path: '/daily-routine'
    },
    {
      id: 4,
      icon: '💆🏻‍♀️💆🏻',
      title: 'Skin & Hair Care',
      description: 'Your daily skin & hair routine',
      path: '/skin-hair-care'
    },
    {
      id: 5,
      icon: '✅',
      title: 'To-do List',
      description: 'Track your daily goals',
      path: '/todo-list'
    },
    {
      id: 6,
      icon: '⏰',
      title: 'Reminders',
      description: "Don't forget your self-care",
      path: '/reminders'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="service-cards">
      <motion.div
        className="card"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="cards-grid"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {services.map((service) => (
            <div 
              key={service.id} 
              className="service-card"
              onClick={() => handleCardClick(service.path)}
            >
              <div className="card-icon">
                {service.icon}
              </div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServiceCards;