import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/Font.css';
import '../Styling/welcome.css';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/credentials');
  };

  return (
    <section className="welcome" id="welcome">
    <div className="text-center mt-5">
      <h1>📚 Welcome to Your Portfolio Builder! 📚</h1>
      <button className="btn btn-primary mt-4" onClick={handleEnter}>
        Enter
      </button>
    </div>
    </section>
  );
};
