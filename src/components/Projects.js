import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="project-card">
        <h3>Anonymous Microblogging App</h3>
        <p>
          Developed an Android application using Java and XML that allows users to share thoughts anonymously. Features include encrypted content, post filtering, and seamless UI/UX design.
        </p>
      </div>
      {/* Add more projects below if needed */}
    </section>
  );
};

export default Projects;
