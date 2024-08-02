import React, { useState, useEffect } from 'react';
import './SignInPopUp.css';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAuthPopUp } from '../../Context/AuthPopUpContext';
import { signUp , signIn , clearState ,loadUser } from '../../store/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../Spinner/Loader';

const SignInPopUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignedUp, isSignedIn, error, loading, user } = useSelector(state => state.user);
  const { type, onClose, onOpen } = useAuthPopUp();

  // State for sign-in data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for sign-up data
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
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
 

  // Separate useEffect for handling user registration
  useEffect(() => {
    if (isSignedUp) {
      toast.success('Registered Successfully');
      dispatch(loadUser());
      dispatch(clearState());
      onClose();
    }
    if (error) {
      console.log(error);
      toast.error(error);
      dispatch(clearState());
    }
  }, [isSignedUp, error, dispatch, onClose]);

  // Handler for sign-up button click
  const handleSignUpClick = (e) => {
    e.preventDefault();
    dispatch(signUp(signUpData));
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

  useEffect(() => {
    if (isSignedIn) {
      toast.success('Logged In Successfully');
      dispatch(loadUser()).then(() => {
        dispatch(clearState());
        if (user?.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/user/my-course');
        }
      });
      onClose();
    }
    if (error) {
      // console.log(error);
      toast.error(error);
      dispatch(clearState());
    }
  }, [isSignedIn, dispatch, navigate, onClose, user?.role]);

  // Handler for sign-in button click
  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  if (loading) {
    return <Loader />;
  }

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
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  id="sigin_pin"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <input
                  className='loginSearch'
                  type="text"
                  placeholder="Enter Your Password"
                  name="password"
                  id="sigin_pin"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
              <input className='loginSearch' required type="email" placeholder="Enter Your Email*" name="email" onChange={onSignUpChange} />
              <input className='loginSearch' required type="text" placeholder="Create a Password" name="password" onChange={onSignUpChange} />
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
