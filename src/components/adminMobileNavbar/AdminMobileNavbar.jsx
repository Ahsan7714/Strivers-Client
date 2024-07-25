import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdEventNote, MdPostAdd } from "react-icons/md";
import {
  FaUserCheck,
  FaUser,
  FaUserPlus,
  FaBook,
  FaBars,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./AdminMobileNavbar.css";
import logo from "../../assets/toplogo.png";

function AdminMobileNavbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="mobile-navbar">
      <div className="hamburger ml-4 mt-4" onClick={toggleSidebar}>
        <FaBars className=" bg-[#427590] text-white h-[30px] w-[30px] p-1 rounded-sm" />
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn text-[30px]" onClick={toggleSidebar}>
          <IoMdClose />
        </button>
        <div>
          <img src={logo} alt="" className=" w-[200px]" />
        </div>
        <div className="  h-full overflow-y-auto  content-scrollbar rounded-t-md rounded-es-md">
          <div className="flex flex-col  px-5 py-10  gap-10">
            <Link
              to="/dashboard"
              className={`
        ${
          location.pathname == "/dashboard"
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
            >
              {/* <FaUserCheck /> */}
              <p>Users</p>
            </Link>
            <Link
              to="/dashboard/req-users"
              className={`
        ${
          location.pathname == "/dashboard/req-users"
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
            >
              {/* <FaUserPlus /> */}
              <p>User Requests</p>
            </Link>

            <Link
              to="/dashboard/courses"
              className={`
        ${
          location.pathname == "/dashboard/courses"
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
            >
              {/* <FaBook /> */}
              <p>Courses</p>
            </Link>
            <Link
              to="/dashboard/add-courses"
              className={`
        ${
          location.pathname == "/dashboard/add-courses"
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
            >
              {/* <MdEventNote /> */}
              <p>New Course</p>
            </Link>
            <Link
              to="/dashboard/post-content"
              className={`
        ${
          location.pathname == "/dashboard/post-content"
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
            >
              {/* <MdPostAdd /> */}
              <p>Post Content</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMobileNavbar;
