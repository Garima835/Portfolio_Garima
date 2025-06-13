import React, { useEffect, useState } from 'react';
import { Row, Col } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { SkillCard } from "./SkillCard.jsx";
import '../Styling/Skill.css';
import '../Styling/Font.css';

export const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const formId = localStorage.getItem("formId");
    if (!formId) {
      console.warn("❌ No formId found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchSkills = async () => {
      try {
        const docRef = doc(db, "portfolios", formId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const skillsData = data?.data?.skills || [];
          setSkills(skillsData);
        } else {
          console.warn("❌ No such portfolio document.");
        }
      } catch (error) {
        console.error("🔥 Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading skills...</p>;

  return (
    <section className="skill" id="skills">
      <Row>
        <Col>
          <div className="skill-bx animate__animated animate__fadeIn">
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
    </section>
  );
};