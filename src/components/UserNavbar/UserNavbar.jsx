import React from "react";
import logo from "../../assets/toplogo.png";
import { Link } from "react-router-dom";
// import "./Navbar.css";
import { useAuthPopUp } from "../../Context/AuthPopUpContext";
const UserNavbar = () => {
  const { onOpen } = useAuthPopUp();

  const { setShowModal, setType } = useAuthPopUp();


  const handleShowPopUp = (actionType) => {
    setType(actionType);
    setShowModal(true);
    console.log("show modal", setShowModal);
  };

  const {  onClose } = useAuthPopUp();
  return (
    <header className=" flex justify-between items-center lg:px-4 px-2  shadow-xl bg-white ">
      <Link to="/">
        <img src={logo} alt="" className=" w-[200px]" />
      </Link>
      <nav className=" flex items-center">
        <div className=" flex">
          <Link
            to="/"
            className="mx-4 lg:flex  text-[20px] font-semibold link"
          >
            Home
          </Link>
         
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
