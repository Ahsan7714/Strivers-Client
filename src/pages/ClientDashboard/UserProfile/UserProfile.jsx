import React, { useState, useEffect } from "react";
import UserNavbar from "../../../components/UserNavbar/UserNavbar.jsx";
import UserSidebar from "../../../components/UserSidebar/UserSidebar.jsx";
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar.jsx";
import Footer from "../../../components/Footer/Footer.jsx";

const UserProfile = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSaveChanges = () => {
    // Add your logic to handle password change here
    if (newPassword !== confirmPassword) {
      console.log("New Password and Confirm Password do not match");
      return;
    }

    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Reset the input fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <UserNavbar />
      <div className="flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] lg:h-[80vh] h-fit rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar content-center">
          <div className="main-content lg:w-full  lg:px-7 w-[90%]">
            <h1 className="text-center text-[30px] font-bold py-5">Update Profile</h1>
            <div className="flex flex-col items-center">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded-md w-full lg:w-1/2"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded-md w-full lg:w-1/2"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded-md w-full lg:w-1/2"
              />
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
