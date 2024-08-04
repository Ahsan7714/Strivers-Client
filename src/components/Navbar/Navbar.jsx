import React, { useEffect } from "react";
import logo from "../../assets/toplogo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuthPopUp } from "../../Context/AuthPopUpContext";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../store/reducers/userReducers";

const Navbar = () => {
  const dispatch = useDispatch();
  const { onOpen, setShowModal, setType } = useAuthPopUp();
  const { user, loading, error } = useSelector(state => state.user);

  useEffect(() => {
  
    // dispatch(loadUser());
  }, []);

  const handleShowPopUp = (actionType) => {
    setType(actionType);
    setShowModal(true);
    console.log("show modal", setShowModal);
  };

  return (
    <header className="flex justify-between items-center lg:px-4 px-2 shadow-xl bg-white">
      <Link to="/">
        <img src={logo} alt="" className="w-[200px]" />
      </Link>
      <nav className="flex items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="mx-4 lg:flex hidden text-[20px] font-semibold link"
          >
            Home
          </Link>

          <Link
            to="about-us"
            className="mx-4 lg:flex hidden text-[20px] font-semibold link"
          >
            About Us
          </Link>

          {user ? (
            user.role === 'admin' ? (
              <Link
                to="/dashboard/req-users"
                 className="bg-[#8a9866] text-white font-semibold px-4 py-2 rounded ml-4 hover:bg-[#78845a]"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/user/my-course"
                className="bg-[#8a9866] text-white font-semibold px-4 py-2 rounded ml-4 hover:bg-[#78845a]"
              >
                Dashboard
              </Link>
            )
          ) : (
            <button
              onClick={() => handleShowPopUp("signUp")}
              className="bg-[#8a9866] text-white font-semibold px-4 py-2 rounded ml-4 hover:bg-[#78845a]"
            >
              Login/Register
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
