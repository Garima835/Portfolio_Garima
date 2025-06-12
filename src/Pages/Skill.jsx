// Skill.jsx
import React from 'react';
import { Row, Col } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { SkillCard } from "./SkillCard.jsx";
import '../Styling/Skill.css';
import '../Styling/Font.css';

export const Skill = () => {
  const location = useLocation();
  const skills = location.state?.skills || [];

  console.log("👀 Received skills:", skills);

  return (
    <section className="skill" id="skills">
      {/* <Container> */}
        <Row>
          <Col>
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>Here are some of the skills I have added to my portfolio:</p>
              <div className="skills-container">
                {skills.length === 0 ? (
                  <p className="no-data-msg">No skills added yet.</p>
                ) : (
                  skills.map((skill, index) => (
                    <SkillCard key={index} name={skill.name} percentage={skill.percentage} />
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>
      {/* </Container> */}
    </section>
  );
};