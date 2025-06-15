import React from 'react';
import './Home.css';
import profileImage from '../assets/profile.png';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-left">
        <h1>
          <span className="green">Prajna</span>{' '}
          <span className="blue">Begadi</span>
        </h1>
        <h2>Software Developer</h2>
        <p>
          Building reliable and user-friendly Android applications using Java and modern development practices. Passionate about clean code and seamless user experiences.
        </p>
        <div className="icons">
          <a href="mailto:prajbegadi@gmail.com" title="Email">
            <FaEnvelope />
          </a>
          <a href="https://github.com/Prajna-begadi" target="_blank" rel="noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/prajna-begadi" target="_blank" rel="noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="home-right">
        <img src={profileImage} alt="Profile" />
      </div>
    </section>
  );
};

export default Home;
