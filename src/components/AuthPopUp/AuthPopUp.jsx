import React from 'react';
import './AuthPopUp.css';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAuthPopUp } from '../../Context/AuthPopUpContext';
import SignInPopUp from '../SignInPopUp/SignInPopUp';

const AuthPopUp = () => {
  const { type, onClose } = useAuthPopUp();

  let ContentComponent;
  switch (type) {

    case 'signUp':
      ContentComponent = SignInPopUp;
      break;
    case 'signIn':
      ContentComponent = SignInPopUp;
      break;
    default:
      ContentComponent = SignInPopUp;
      break;
  }

  return (
    <div className="">
      {/* <div className="modal_body">
        <div className="popup_content"> */}
          {ContentComponent ? <ContentComponent /> : <CustomSpinner />}
        {/* </div>
      </div> */}
    </div>
  );
};

export default AuthPopUp;
