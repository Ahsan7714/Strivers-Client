import React from 'react';
import './Whatsapp.css';

const Whatsapp = () => {
  const handleClick = () => {
    window.open('https://wa.me/14373135736', '_blank');
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
    </div>
  );
};

export default Whatsapp;