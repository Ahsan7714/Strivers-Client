
import React,{useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { RiTeamLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { TbMessageReport } from "react-icons/tb";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import './UserSidebar.css';
// import { logout , clearState } from "../../store/reducers/userReducers";
// import { useDispatch , useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaBook } from "react-icons/fa6";


const AdminSidebar = () => {
  const location = useLocation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isLoggedOut } = useSelector((state) => state.user);

  return (
    <div className=" bg-[#f8fafb] h-full overflow-y-auto w-[20%] content-scrollbar rounded-t-md rounded-es-md">
      <div className="flex flex-col  px-5 py-10  gap-10">
     
        <Link
          to="/user/my-course"
          className={`
        ${
          location.pathname == "/user/my-course" ||
          location.pathname == "/user/my-course/content" 
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
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
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Packages</p>
        </Link>
     
        <Link
          to="/user/courses"
          className={`
        ${
          location.pathname == "/user/courses"
            ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Courses</p>
        </Link>
        {/* <Link
          to="/user/profile"
          className={`
        ${
          location.pathname == "/user/profile"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <p>Profile</p>
        </Link> */}
        
      </div>
    </div>
  );
};

export default AdminSidebar;
