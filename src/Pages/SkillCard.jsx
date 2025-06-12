import React from 'react';

export const SkillCard = ({ name, percentage }) => {
  return (
    <div className="skill-card-box">
      <div className="skill-title">{name}</div>
      <div className="skill-progress">
        <div className="skill-progress-fill" style={{ width: `${percentage}%` }}>
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};
