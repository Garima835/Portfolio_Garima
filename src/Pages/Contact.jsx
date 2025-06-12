import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import contactImg from "../Images/girl1.png";
import "animate.css";
import { jsPDF } from "jspdf";
import TrackVisibility from "react-on-screen";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../Styling/Font.css";
import "../Styling/Contact.css";

export const Contact = () => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContactData = async () => {
      const credId = new URLSearchParams(window.location.search).get('id');
      if (!credId) {
        console.warn("No credentials ID found in URL.");
        return;
      }
      try {
        const docRef = doc(db, "portfolios", credId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const credentials = docSnap.data();
          console.log("✅ Firestore raw data:", credentials);
          // setFormData(data.credentials);
          const innerData = credentials?.credentials || {}
          console.log("💬 Credentials from Firestore:", innerData);
          setFormData(innerData);
        } else {
          console.log("❌ No such document!");
        }
      } catch (err) {
        console.error("Error fetching credentials data:", err);
        setError("⚠️ Error fetching contact info.");
      }
    };

    fetchContactData();
  }, []);

  const handleDownloadPDF = () => {
    if (!formData) {
      alert("⚠️ No contact data available.");
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const boxWidth = 380;
    const boxHeight = 210;
    const boxX = (pageWidth - boxWidth) / 2;
    const boxY = (pageHeight - boxHeight) / 2;

    doc.setFillColor(250, 213, 165);
    doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 20, 20, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 90);
    doc.setFontSize(28);
    doc.text(" My Portfolio Contact Card", boxX + 20, boxY + 40);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(18);

    let y = boxY + 80;
    const lineHeight = 26;

    doc.text(` Name: ${formData.name}`, boxX + 20, y); y += lineHeight;
    doc.text(` Email: ${formData.email}`, boxX + 20, y); y += lineHeight;
    doc.text(` Phone: ${formData.phone}`, boxX + 20, y); y += lineHeight;
    doc.text(` LinkedIn: ${formData.linkedin}`, boxX + 20, y); y += lineHeight;
    doc.text(` GitHub: ${formData.github}`, boxX + 20, y); y += lineHeight;

    doc.save("BeautifulContactCard.pdf");
  };

  if (error) {
    return <p className="no-data-msg">{error}</p>;
  }

  if (!formData) {
    return <p className="no-data-msg">⏳ Loading contact details...</p>;
  }

  return (
    <section className="contact" id="connect">
      <Row className="align-items-center">
        <Col size={12} md={6}>
          <TrackVisibility>
            {({ isVisible }) => (
              <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact" />
            )}
          </TrackVisibility>
        </Col>
        <Col size={12} md={6}>
          <TrackVisibility>
            {({ isVisible }) => (
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2> Get In Touch With Me</h2>
                <div className="profile-card animate__animated animate__fadeInUp">
                  <h2><span className="highlight">{formData.name}</span></h2>
                  <p><strong>📧 Email:</strong> {formData.email}</p>
                  <p><strong>📞 Phone:</strong> {formData.phone}</p>
                  <p><strong>🔗 LinkedIn:</strong> <a href={formData.linkedin} target="_blank" rel="noreferrer">View Profile</a></p>
                  <p><strong>💻 GitHub:</strong> <a href={formData.github} target="_blank" rel="noreferrer">View Projects</a></p>
                </div>
              </div>
            )}
          </TrackVisibility>
          <button className="download-btn" onClick={handleDownloadPDF}>
            📥 Download vCard as PDF
          </button>
        </Col>
      </Row>
    </section>
  );
};
