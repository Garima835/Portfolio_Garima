import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import gmail from "../Images/gmail.png";
import icon1 from '../Images/linked.png';
import icon4 from '../Images/github.png';
import img from '../Images/credential_page.avif';
import name from "../Images/name.png";

import '../Styling/Font.css';
import '../Styling/credentials.css';

export const Credentials = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = async () => {
    const { name, email, phone, linkedin, github } = formData;

    // ✅ Validation
    if (!name || !email || !phone || !linkedin || !github) {
      alert("Please fill all the fields before proceeding.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      // 🔄 Save formData to Firestore
      const docRef = await addDoc(collection(db, "portfolios"), {
        credentials: formData,
        timestamp: serverTimestamp()

      });

      const credentialsId = docRef.id;
      alert("✅ Credentials saved successfully!");

      // 👉 Navigate with portfolio ID
      navigate(`/portfolio-form?credId=${credentialsId}`);
    } catch (error) {
      console.error("❌ Error saving data to Firestore:", error);
      alert("Something went wrong while saving your data.");
    }
  };

  return (
    <section className="credentials" id="credentials">
      <div className="credentials-container">
        {/* Left Side: Form */}
        <div className="credentials-left">
          <h2>Enter Your Credentials</h2>

          <div className="input-with-icon">
            <input name="name" onChange={handleChange} className="form-control" placeholder="Full Name" />
            <img src={name} alt="User Icon" />
          </div>

          <div className="input-with-icon">
            <input name="email" onChange={handleChange} className="form-control" placeholder="Email" />
            <img src={gmail} alt="Email Icon" />
          </div>

          <div className="input-with-icon">
            <input name="phone" onChange={handleChange} className="form-control" placeholder="Phone" />
            <img src="https://static.vecteezy.com/system/resources/previews/034/089/789/non_2x/shopping-handset-phone-or-telephone-number-or-helpdesk-simple-gold-icon-for-apps-and-websites-vector.jpg" alt="Phone Icon" />
          </div>

          <div className="input-with-icon">
            <input name="linkedin" onChange={handleChange} className="form-control" placeholder="LinkedIn URL" />
            <img src={icon1} alt="LinkedIn Icon" />
          </div>

          <div className="input-with-icon">
            <input name="github" onChange={handleChange} className="form-control" placeholder="GitHub URL" />
            <img src={icon4} alt="GitHub Icon" />
          </div>

          <button className="btn btn-success mt-4" onClick={handleNext}>
            Next
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="credentials-right">
          <img src={img} alt="Credential Visual" className="credential-img" />
        </div>
      </div>
    </section>
  );
};
