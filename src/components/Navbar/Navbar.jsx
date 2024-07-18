import React from "react";
import logo from "../../assets/toplogo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <header className=" flex justify-between items-center lg:px-4 px-2  shadow-xl bg-white ">
      <Link to="/">
        <img src={logo} alt="" className=" w-[200px]" />
      </Link>
      <nav className=" flex items-center">
        <div className=" flex">
          <Link
            to="/"
            className="mx-4 lg:flex hidden text-[20px] font-semibold link"
          >
            Home
          </Link>

          <Link
            to="about-us"
            className="mx-4  lg:flex hidden text-[20px] font-semibold link"
          >
            About Us
          </Link>
        </div>

        <button className="bg-[#8a9866] text-white font-semibold  px-4 py-2 rounded ml-4 hover:bg-[#78845a]">
          Login/Register
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
