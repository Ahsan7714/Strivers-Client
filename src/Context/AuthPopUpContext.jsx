// AuthPopUpContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthPopUpContext = createContext();

export const useAuthPopUp = () => useContext(AuthPopUpContext);

export const AuthPopUpProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('signUp');

  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = (type) => {
    setShowModal(true);
    setType(type);
  };

  return (
    <AuthPopUpContext.Provider value={{ showModal, type, onClose, onOpen,setType,setShowModal }}>
      {children}
    </AuthPopUpContext.Provider>
  );
};
