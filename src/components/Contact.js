import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Feel free to reach out for collaborations or just a friendly hello!</p>
      <ul className="contact-info">
        <li>Email: <a href="prajbegadi@gmail.com">prajbegadi@gmail.com</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/prajna-begadi"target="_blank" rel="noreferrer">https://linkedin.com/in/prajna-begadi</a></li>
        <li>GitHub: <a href="https://github.com/Prajna-begadi" target="_blank" rel="noreferrer">https://github.com/Prajna-begadi</a></li>
      </ul>
    </section>
  );
};

export default Contact;
