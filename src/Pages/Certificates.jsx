import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard.jsx";
import projImg1 from "../Images/Card1.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import '../Styling/Font.css';
import '../Styling/Project.css';

export const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const portfolioId = new URLSearchParams(window.location.search).get('id');
      if (!portfolioId) {
        console.warn("No portfolio ID found in URL.");
        setError("Portfolio ID missing in URL.");
        return;
      }

      try {
        const docRef = doc(db, "portfolios", portfolioId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data()?.data || {};
          const certificateEntries = data.certificates || [];

          const formatted = certificateEntries.map((item) => ({
            title: item.name,
            description: item.description,
            imgUrl: projImg1,
          }));

          setCertificates(formatted);
        } else {
          setError("No such document found.");
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setError("Error loading certificates.");
      }
    };

    fetchData();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="project" id="project">
      <Row>
        <Col size={12}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2><strong>Certificates</strong></h2>
                <p>This page showcases the certifications I’ve earned throughout my learning journey. Each certificate represents a milestone in mastering new skills—from web development and software engineering to data structures and algorithms.</p>

                <Tab.Container id="certificates-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" />
                  
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {certificates.length === 0 ? (
                          <p className="no-data-msg">No certificates added yet.</p>
                        ) : (
                          certificates.map((certificate, index) => (
                            <ProjectCard key={index} {...certificate} />
                          ))
                        )}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            }
          </TrackVisibility>
        </Col>
      </Row>
    </section>
  );
};
