import React from 'react';
import toplogo from "../../assets/toplogo.png";
import { Link, useLocation } from 'react-router-dom';
import "./AdminSidebar.css";
import { MdEventNote, MdPostAdd } from "react-icons/md";
import { FaUserCheck ,FaUserPlus,  FaBook } from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 bg-[#f8fafb] h-full overflow-y-auto w-[22%] content-scrollbar font-outfit">
      <div className="flex items-center justify-center">
        <img src={toplogo} alt="Top Logo" className="w-[200px]" />
        <h1 className="py-5 font-bold text-[30px] text-black"></h1>
      </div>
      <div className="flex flex-col px-12 py-10 gap-10">
        <Link
          to="/dashboard"
          className={`
            ${location.pathname === "/dashboard" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <FaUserCheck />
          <p>Users</p>
        </Link>
        <Link
          to="/dashboard/req-users"
          className={`
            ${location.pathname === "/dashboard/req-users" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af]  text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <FaUserPlus />
          <p>User Requests</p>
        </Link>
        <Link
          to="/dashboard/courses"
          className={`
            ${location.pathname === "/dashboard/courses" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <FaBook />
          <p>Courses</p>
        </Link>
        <Link
          to="/dashboard/add-courses"
          className={`
            ${location.pathname === "/dashboard/add-courses" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <MdEventNote />
          <p>New Course</p>
        </Link>
        <Link
          to="/dashboard/add-package"
          className={`
            ${location.pathname === "/dashboard/add-package" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <MdEventNote />
          <p>Add Package</p>
        </Link>
        <Link
          to="/dashboard/post-content"
          className={`
            ${location.pathname === "/dashboard/post-content" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <MdPostAdd />
          <p>Post Content</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
