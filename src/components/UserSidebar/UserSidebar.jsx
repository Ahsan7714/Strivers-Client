import React,{useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './UserSidebar.css';
import { useDispatch , useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaBook } from "react-icons/fa6";
import { logout,clearState } from "../../store/reducers/userReducers";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="bg-[#f8fafb] h-full overflow-y-auto w-[20%] content-scrollbar rounded-t-md rounded-es-md">
      <div className="flex flex-col px-5 py-10 gap-10">
        <Link
          to="/user/my-course"
          className={`
            ${
              location.pathname === "/user/my-course" ||
              location.pathname === "/user/my-course/content"
                ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
                : "text-[#000000a5] "
            }
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>My Courses</p>
        </Link>
        {/* <Link
          to="/user/packages"
          className={`
            ${
              location.pathname === "/user/packages"
                ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
                : "text-[#000000a5] "
            }
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Packages</p>
        </Link> */}
        
        <Link
          to="/user/courses"
          className={`
            ${
              location.pathname === "/user/courses"
                ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
                : "text-[#000000a5] "
            }
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Courses</p>
        </Link>
        <Link
          to="/user/payments"
          className={`
            ${
              location.pathname === "/user/payments"
                ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
                : "text-[#000000a5] "
            }
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Payments</p>
        </Link>
         <Link
          to="/user/profile"
          className={`
            ${
              location.pathname === "/user/profile"
                ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
                : "text-[#000000a5] "
            }
            flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Profile</p>
        </Link> 
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center text-[20px] h-10 px-4 rounded-md text-[#000000a5]"
        >
          <p>Logout</p>
        </button>
        
      </div>
    </div>
  );
};

export default AdminSidebar;
