import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard.jsx";
import projImg1 from "../Images/card1.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import '../Styling/Font.css';
import '../Styling/Project.css';

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [research, setResearch] = useState([]);
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const formId = localStorage.getItem("formId");
    if (!formId) {
      console.warn("❌ No formId found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, "portfolios", formId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data()?.data || {};

          const projectEntries = data.projects || [];
          const researchEntries = data.research || [];
          const patentEntries = data.patents || [];

          setProjects(projectEntries.map(item => ({
            title: item.name,
            description: item.description,
            imgUrl: projImg1
          })));

          setResearch(researchEntries.map(item => ({
            title: item.name,
            description: item.description,
            imgUrl: projImg1
          })));

          setPatents(patentEntries.map(item => ({
            title: item.name,
            description: item.description,
            imgUrl: projImg1
          })));
        } else {
          console.warn("❌ No such document found.");
        }
      } catch (error) {
        console.error("🔥 Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading projects and research...</p>;

  return (
    <section className="project" id="project">
      <Row>
        <Col size={12}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2><strong>Projects and Research Work</strong></h2>
                <p>Here, you’ll find a blend of my web development expertise, diverse coding skills, and software projects crafted with care. Alongside my hands-on projects, I’m passionate about exploring innovative ideas through research, constantly learning and pushing the boundaries of technology.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Review Papers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Patents</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {projects.length === 0 ? (
                          <p className="no-data-msg">No projects added yet.</p>
                        ) : (
                          projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                          ))
                        )}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        {research.length === 0 ? (
                          <p className="no-data-msg">No research papers added yet.</p>
                        ) : (
                          research.map((res, index) => (
                            <ProjectCard key={index} {...res} />
                          ))
                        )}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        {patents.length === 0 ? (
                          <p className="no-data-msg">No patents added yet.</p>
                        ) : (
                          patents.map((pat, index) => (
                            <ProjectCard key={index} {...pat} />
                          ))
                        )}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
              </TrackVisibility>
              </Col>
            </Row>
              </section>
  );
};