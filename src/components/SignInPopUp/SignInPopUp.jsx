import React, { useState, useEffect } from 'react';
import './SignInPopUp.css';
import { CustomSpinner } from '../Spinner/Spinner';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAuthPopUp } from '../../Context/AuthPopUpContext';
// import { signUp, login, clearState, loadUser } from '../../../store/reducers/userReducers';
// import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignInPopUp = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
//   const { isUserRegistered, isUserLogged, user, error, loading } = useSelector(state => state.user);
  const { type, onClose, onOpen } = useAuthPopUp();

  // State for sign-in data
  const [pin, setPin] = useState('');
  const [phoneNo, setPhoneNo] = useState(''); // 

  // State for sign-up data
  const [signUpData, setSignUpData] = useState({
    name: '',
    phoneNo: '',
    pin: '',
  });

  // Handler for sign-up input changes
  const onSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // Separate useEffect for handling user login
//   useEffect(() => {
//     if (isUserLogged) {
//       toast.success('Logged In Successfully');
//       dispatch(loadUser());
//       dispatch(clearState());
//       onClose();
//     }
//   }, [isUserLogged, dispatch, navigate, onClose]);

  // Separate useEffect for handling user registration
//   useEffect(() => {
//     if (isUserRegistered) {
//       toast.success('Registered Successfully');
//       dispatch(loadUser());
//       dispatch(clearState());
//       onClose();
//     }
//     if (error) {
//       toast.error(error);
//       dispatch(clearState());
//     }
//   }, [isUserRegistered, error, dispatch, onClose]);

  // Handler for sign-up button click
  const handleSignUpClick = () => {
   
    console.log("Sign Up Data:", signUpData);
    // dispatch(signUp(signUpData));
  };

  // Handler for opening the sign-in modal from the sign-up modal
  const handleOpenSignIn = () => {
    onClose();
    onOpen('signIn');
  };

  const handleOpenSignUp = () => {
    onClose();
    onOpen('signUp');
  };

  // Handler for sign-in button click
  const handleSignIn = () => {
    // dispatch(login({ pin , phoneNo }));
  };

//   if (loading) {
//     return <CustomSpinner />;
//   }

  return (
    <div className="backdrop_shadow">
      <div className="modal_body">
        {type === 'signIn' ? (
          <div className="signIn_body">
            <div className="close_modal" onClick={onClose}>
              <IoCloseCircleOutline />
            </div>
            <div className="lower_body">
              <form className='gap-1 flex flex-col' onSubmit={handleSignIn}>
                <label htmlFor="sigin_pin">Login</label>
                <input
                  className='loginSearch'
                  type="text"
                  placeholder="Enter Your Email"
                  name="phoneNo"
                  id="sigin_pin"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  value={phoneNo}
                  required
                />
                <input
                  className='loginSearch'
                  type="text"
                  placeholder="Enter Your Password"
                  name="pin"
                  id="sigin_pin"
                  onChange={(e) => setPin(e.target.value)}
                  value={pin}
                  required
                />
                <button className="signin_btn" type="submit">Sign In</button>
                <p>
                  New member?{' '}
                  <button type="button" onClick={handleOpenSignUp}>
                    Create an account
                  </button>
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="signUp_body flex flex-col gap-3">
            <div className="close_modal" onClick={onClose}>
              <IoCloseCircleOutline />
            </div>
            <h1>Create An Account</h1>
            <form onSubmit={handleSignUpClick} className=' form-login'>
            <input className='loginSearch' required type="text" placeholder="Enter Your Name" name="name" onChange={onSignUpChange} />
            <input className='loginSearch' required type="text" placeholder="Enter Your Email*" name="phoneNo" onChange={onSignUpChange} />
            <input className='loginSearch' required type="text" placeholder="Create a Password" name="pin" onChange={onSignUpChange} />
            <button className='signUpBtn' type='submit'>Sign Up</button>
           
            </form>
           
            <p>
              Have an account?{' '}
              <button type="button" onClick={handleOpenSignIn}>
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPopUp;
