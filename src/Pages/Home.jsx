import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import headerImg from "../Images/header-img.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import '../Styling/Font.css';
import '../Styling/Banner.css';

export const Home = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Web Designer"];
  const [error, setError] = useState("");
  const [storedData, setStoredData] = useState(null);
  const period = 2000;

  const location = useLocation();
  const navigate = useNavigate();

  // Step 1: Get from URL or fallback to localStorage
  const query = new URLSearchParams(location.search);
  const urlFormId = query.get("formId");
  const urlCredId = query.get("credId");

  // Step 2: Prefer URL, fallback to localStorage
  const formId = urlFormId || localStorage.getItem("formId");
  const credId = urlCredId || localStorage.getItem("credId");

  // Step 3: Save to localStorage (when from URL)
  useEffect(() => {
    if (urlFormId) localStorage.setItem("formId", urlFormId);
    if (urlCredId) localStorage.setItem("credId", urlCredId);
  }, [urlFormId, urlCredId]);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!formId) {
        setError("No formId found in URL or localStorage.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "portfolios", formId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const innerData = data?.data || {};
          const summaryText = data?.summary || "No summary found.";

          setStoredData(innerData);
          setSummary(summaryText);
        } else {
          setError("Portfolio not found.");
        }
      } catch (err) {
        console.error("🔥 Error fetching summary:", err);
        setError("Failed to load summary. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [formId]);

  useEffect(() => {
    const ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  if (loading || !storedData) return <p style={{ padding: "2rem" }}>Loading your portfolio...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section className="banner" id="home">
      <Row className="align-items-center">
        <Col xs={12} md={6} xl={7}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Judy`} <span className="txt-rotate"><span className="wrap">{text}</span></span></h1>
                <p>{summary}</p>

                <button onClick={() => navigate('/skills')}>
                  View Skills <ArrowRightCircle size={25} />
                </button>

                <button onClick={() => navigate('/projects')}>
                  View Projects and Research Work <ArrowRightCircle size={25} />
                </button>

                <button onClick={() => navigate('/certificates')}>
                  View Certificates <ArrowRightCircle size={25} />
                </button>

                <button onClick={() => navigate('/contact')}>
                  View Contact <ArrowRightCircle size={25} />
                </button>
              </div>
            }
          </TrackVisibility>
        </Col>

        <Col xs={12} md={6} xl={5}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <img src={headerImg} alt="Header Img" />
              </div>
            }
          </TrackVisibility>
        </Col>
      </Row>
    </section>
  );
};