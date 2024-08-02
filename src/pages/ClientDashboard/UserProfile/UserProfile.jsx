import React, { useState, useEffect } from "react";
import UserNavbar from "../../../components/UserNavbar/UserNavbar.jsx";
import UserSidebar from "../../../components/UserSidebar/UserSidebar.jsx";
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { updatePassword, clearState } from "../../../store/reducers/userReducers.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../components/Spinner/Loader.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, isPasswordUpdated } = useSelector((state) => state.user);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (isPasswordUpdated) {
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(clearState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isPasswordUpdated]);

  const handleSaveChanges = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <UserNavbar />
      <div className="flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] lg:h-[80vh] h-fit rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar content-center">
          <div className="main-content lg:w-full lg:px-7 w-[90%]">
            <h1 className="text-center text-[30px] font-bold py-5">Update Profile</h1>
            <div className="flex flex-col items-center">
              <div className="relative w-full lg:w-1/2 mb-4">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full outline-none"
                />
                <FontAwesomeIcon
                  icon={showOldPassword ? faEyeSlash : faEye}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              <div className="relative w-full lg:w-1/2 mb-4">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full outline-none"
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              <div className="relative w-full lg:w-1/2 mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full outline-none"
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white p-2 rounded-md w-full lg:w-1/2 hover:bg-gradient-to-r hover:from-[#6a97af] hover:to-[#2b5870]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
