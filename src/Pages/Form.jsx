import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import '../Styling/Font.css';
import '../Styling/Form.css';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

export const PortfolioForm = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ projects: 0, skills: 0, certificates: 0, patents: 0, research: 0 });
  const [data, setData] = useState({ projects: [], skills: [], certificates: [], patents: [], research: [] });
  const [summary, setSummary] = useState('');

  const [searchParams] = useSearchParams();
  const credentialsDocId = searchParams.get("credId");


React.useEffect(() => {
  if (credentialsDocId) {
    console.log("✅ Received credId in Form Page:", credentialsDocId);
  } else {
    console.warn("⚠️ credId not found in Form Page URL");
  }
}, [credentialsDocId]);


  const handleCountChange = (e, type) => {
    let value = parseInt(e.target.value, 10) || 0;
    if (value > 6) {
      value = 6;
      alert("You can only enter up to 6 entries for " + type + ".");
    }

    setCounts(prev => ({ ...prev, [type]: value }));

    setData(prev => {
      const current = prev[type] || [];
      let updated;
      if (current.length < value) {
        const toAdd = Array.from({ length: value - current.length }, () =>
          type === 'skills' ? { name: '', percentage: '' } : { name: '', description: '' }
        );
        updated = [...current, ...toAdd];
      } else {
        updated = current.slice(0, value);
      }

      return { ...prev, [type]: updated };
    });
  };

  const handleDataChange = (type, index, field, value) => {
    const updated = [...data[type]];
    if (type === 'skills') {
      updated[index] = {
        ...updated[index],
        [field]: field === 'percentage' ? Number(value) : value,
      };
    } else {
      updated[index][field] = value;
    }
    setData(prev => ({ ...prev, [type]: updated }));
  };

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const credentialsId = queryParams.get('credId');

  const handleSubmit = async () => {
    const allData = {
      data,
      summary,
      createdAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "portfolios"), allData);
      const formId = docRef.id;
      alert("🎉 Data saved successfully! Your Portfolio ID is: " + formId);

      // ✅ Navigate to one page only; links to skills/projects can be added there
      navigate(`/home?formId=${formId}&credId=${credentialsDocId}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ Failed to save data. Check console for error.");
    }
  };

  const renderCards = (type) => {
    if (counts[type] === 0) return <p>No {type} added yet.</p>;

    return (
      <Carousel responsive={responsive} className="skill-slider">
        {data[type].map((item, index) => (
          <div key={index} className="data-card">
            <h4>{type.charAt(0).toUpperCase() + type.slice(1)} {index + 1}</h4>
            {type === 'skills' ? (
              <>
                <input
                  placeholder="Skill Name"
                  value={item.name}
                  onChange={(e) => handleDataChange(type, index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Proficiency %"
                  value={item.percentage}
                  onChange={(e) => handleDataChange(type, index, 'percentage', e.target.value)}
                  min="0"
                  max="100"
                />
              </>
            ) : (
              <>
                <input
                  placeholder={`${type.slice(0, -1)} Name`}
                  value={item.name}
                  onChange={(e) => handleDataChange(type, index, 'name', e.target.value)}
                />
                <textarea
                  placeholder={`${type.slice(0, -1)} Description`}
                  value={item.description}
                  onChange={(e) => handleDataChange(type, index, 'description', e.target.value)}
                />
              </>
            )}
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <section className="form" id="form">
      <div className="portfolio-form-container">
        <h2>Portfolio Details</h2>
        <div className="form-group">
          <div className="details-heading">
            <label htmlFor="summary">Summary About You:</label>
          </div>
          <textarea
            id="summary"
            name="summary"
            rows="3"
            className="form-control"
            placeholder="Write a brief summary about yourself..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {['projects', 'skills', 'certificates', 'patents', 'research'].map(type => (
          <div key={type} className="form-group">
            <div className='inline-label-input'>
              <div className="details-heading">
                <label htmlFor={`${type}-count`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}:
                </label>
              </div>
              <input
                type="number"
                id={`${type}-count`}
                min="0"
                max="6"
                value={counts[type]}
                onChange={(e) => handleCountChange(e, type)}
              />
            </div>
            {renderCards(type)}
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>Submit Portfolio</button>
      </div>
    </section>
  );
};
// navigate(`/home?id=${id}`);