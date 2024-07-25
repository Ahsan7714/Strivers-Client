import React from 'react';
import './Whatsapp.css';

const Whatsapp = () => {
  const handleClick = () => {
    window.open('https://wa.me/14373135736?text=Hello%20I%20would%20like%20to%20inquire%20about%20your%20services', '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
    </div>
  );
};

export default Whatsapp;
