import React , {useEffect , useState} from 'react';
import toplogo from "../../assets/toplogo.png";
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import "./AdminSidebar.css";
import { MdEventNote, MdPostAdd } from "react-icons/md";
import { FaUserCheck ,FaUserPlus,  FaBook } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout , clearState } from '../../store/reducers/userReducers';
import { useDispatch , useSelector } from 'react-redux';
import toast from 'react-hot-toast';



function AdminSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedOut , loading , error } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedOut) {
      toast.success("Logged out successfully");
      navigate("/");
      dispatch(clearState());
    }
  }, [isLoggedOut, navigate]);


  const handleLogout = () => {
    dispatch(logout());
    // toast.success("Logged out successfully");
    // navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 bg-[#f8fafb] h-full overflow-y-auto w-[22%] content-scrollbar font-outfit">
      <div className="flex items-center justify-center">
        <img src={toplogo} alt="Top Logo" className="w-[200px]" />
        <h1 className="py-5 font-bold text-[30px] text-black"></h1>
      </div>
      <div className="flex flex-col px-12 py-10 gap-10">
      <Link
          to="/"
          className={`
            ${location.pathname === "/dashboard" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <IoHome />
          <p>Home</p>
        </Link>
        {/* <Link
          to="/dashboard"
          className={`
            ${location.pathname === "/dashboard" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <FaUserCheck />
          <p>Users</p>
        </Link> */}
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
        <button
          onClick={handleLogout}
          className={`
            ${location.pathname === "" ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white" : "text-[#000000a5]"}
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md
          `}
        >
          <RiLogoutCircleLine />
          <p>LogOut</p>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
