import React, { useState } from 'react';
import './MobileNavbar.css';
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/toplogo.png";



const MobileNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-navbar">
      <div className="hamburger ml-4 mt-4" onClick={toggleSidebar}>
      <FaBars className=' bg-[#427590] text-white h-[30px] w-[30px] p-1 rounded-sm' />
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn text-[30px]" onClick={toggleSidebar}><IoMdClose />
        </button>
        <div >
        <img src={logo} alt="" className=" w-[200px]" />
      </div>
        <div className="  h-full overflow-y-auto  content-scrollbar rounded-t-md rounded-es-md">
      <div className="flex flex-col  px-5 py-10  gap-10">
     
        <Link
          to="/user/my-course"
          className={`
        ${
          location.pathname == "/user/my-course" ||
          location.pathname == "/user/my-course/content" 
            ? "bg-gradient-to-r from-[#99b84c] to-[#b4c883] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>My Courses</p>
        </Link>
        <Link
          to="/user/packages"
          className={`
        ${
          location.pathname == "/user/packages"
            ? "bg-gradient-to-r from-[#99b84c] to-[#b4c883] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Packages</p>
        </Link>
     
        <Link
          to="/clients"
          className={`
        ${
          location.pathname == "/clients"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Courses</p>
        </Link>
        <Link
          to="/chat"
          className={`
        ${
          location.pathname == "/chat"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Profile</p>
        </Link>
        
      </div>
    </div>

      </div>
    </div>
  );
}

export default MobileNavbar;
