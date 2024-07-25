import React, { useState, useEffect } from "react";
import UserNavbar from "../../../components/UserNavbar/UserNavbar.jsx";
import UserSidebar from "../../../components/UserSidebar/UserSidebar.jsx";
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { FaLongArrowAltRight } from "react-icons/fa";

function UserPayments() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="flex lg:w-4/5 w-[90%] lg:mx-auto my-5 border border-gray-200 lg:h-[80vh] h-fit rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar content-center">
          <div className="main-content w-full lg:px-7">
            <h1 className="text-center text-[30px] font-bold py-5">
              My Payments
            </h1>
            <div className=" mt-7 detail-cont flex lg:flex-row flex-col lg:w-full w-[90%] bg-gray-200 py-10 px-14 rounded-md">
              <div className="detail-cont-a flex-1 flex lg:flex-row flex-col justify-around items-center">
                <div className="flex flex-col gap-5">
                  <h1 className="text-4xl font-bold">Full Course</h1>
                  <div className="bg-white rounded-xl inline-block text-center font-semibold text-[#6bcaef] py-1 px-5">
                    <h1>Start Aug/Jan</h1>
                  </div>
                </div>
                <div className="text-3xl flex items-center">
                  <h1 className="text-[#2c5872] font-bold">$2100 + HST</h1>
                </div>
              </div>
              <div className="flex-1 flex lg:flex-row flex-col gap-8 lg:gap-0 justify-around">
                <div className="flex flex-col font-medium text-[#000000c1]">
                  <div className="flex gap-2 items-center">
                    <FaLongArrowAltRight />
                    <p>6 Months</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaLongArrowAltRight />
                    <p>3 Lectures Each Week</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaLongArrowAltRight />
                    <p>Mocks Sessions</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaLongArrowAltRight />
                    <p>Live Zoom Sessions</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaLongArrowAltRight />
                    <p>Recorded Zoom Lectures</p>
                  </div>
                </div>
                <div className="lg:text-3xl text-2xl lg:h-16 flex justify-center items-center my-auto">
                  <button className="bg-red-600 text-white rounded-full px-5 py-2 cursor-default">
                    Paid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserPayments;
