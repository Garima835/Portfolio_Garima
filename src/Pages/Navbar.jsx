import { useState, useEffect} from "react";
import { Navbar, Nav } from "react-bootstrap";
import React from 'react';
import logo from '../Images/Logo1.png';
import icon1 from '../Images/nav-icon1.svg';
import icon4 from '../Images/nav-icon3 (1).png';  
import { HashLink } from "react-router-hash-link";
import { NavLink } from 'react-router-dom';
import '../Styling/Navbar.css';
import '../Styling/Font.css';

export const NavBar = () => {
    // TO POINT TOWARDS THE HOMEPAGE, INITIALLY SET AT HOME
    const [activeLink, setActiveLink] = useState('home');
    // TO CHECK IF USER SCROLLED THE SCREEN
    const [scrolled, setScrolled] = useState(false);

    const storedData = JSON.parse(localStorage.getItem('portfolioData'));

    if (!storedData) {
        return <p>No portfolio data found. Please fill the form first.</p>;
    }
    //FUNCTION TO SPECIFY WHAT TO DO WHEN WINDOW IS SCROLLED
    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > 50){
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll",onScroll);
        return () => window.removeEventListener("scroll",onScroll);
    },[])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }
    return(
        // <Router>
        <Navbar expand="lg" className={scrolled ? "scrolled":"" }>
        {/* <Container> */}
            <Navbar.Brand href="#home">
                {/* <img src={logo} alt="LOGO" className="logo-img" /> */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className = "navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link> */}
                    <Nav.Link as={NavLink} to="/skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                    <Nav.Link as={NavLink} to="/projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                    <Nav.Link as={NavLink} to="/certificates" className={activeLink === 'certificates' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('certificates')}>Certificates</Nav.Link> */}
                </Nav>
                <span className="navbar-text">
                    <div className="social-icon">
                        <a href={storedData.linkedin}><img src={icon1} alt = "Icon1"/></a>  
                        <a href={storedData.github}><img src={icon4} alt = "Icon2"/></a>  
                    </div>
                    {/* CONTACT US FORM */}
                    <HashLink to='#contact'>
                    <button className="vvd" onClick = {() => console.log('Contact')}>
                        <Nav.Link as={NavLink} to="/contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Let's Connect</Nav.Link>
                    </button>
                    </HashLink>
                </span>   
            </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>
    // </Router>
    )
}