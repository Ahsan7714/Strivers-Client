import React, { useState, useEffect } from "react";
import UserNavbar from "../../../components/UserNavbar/UserNavbar.jsx";
import UserSidebar from "../../../components/UserSidebar/UserSidebar.jsx";
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../components/Spinner/Loader.jsx";
import {
  getTickets,
  clearState,
} from "../../../store/reducers/userReducers.js";

function UserPayments() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.user);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

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
            {loading ? (
              <Loader />
            ) : tickets && tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="mt-7 detail-cont flex lg:flex-row flex-col lg:w-full w-[90%] bg-gray-200 py-10 px-14 rounded-md mb-5"
                >
                  <div className="detail-cont-a flex-2 flex  flex-col justify-around items-center">
                    <div className="flex flex-col gap-5">
                      <h1 className="text-xl font-bold">
                        {ticket.courseId.title}
                      </h1>
                      <div className=" flex gap-3 items-center">
                        <p className=" font-medium">Package :</p>
                        <p className="text-xl font-bold">
                          {ticket.packageId.packageName}
                        </p>
                      </div>
                      {/* <div className="bg-white rounded-xl inline-block text-center w-[100px] font-semibold text-[#6bcaef] py-1 px-5">
                        <h1>Start {ticket.startDate}</h1>
                      </div> */}
                    </div>
                  
                  </div>
                  <div className="flex-1 flex lg:flex-col flex-col gap-8 lg:gap-0 justify-end items-end">
                    <div className="flex flex-col font-medium text-[#000000c1]"></div>
                    <div className="lg:text-3xl text-2xl lg:h-16 flex justify-center items-center my-auto">
                      <h1 className="bg-green-600 text-white rounded-full px-8 py-2 cursor-default">
                        Paid
                      </h1>
                    </div>
                    <div className="text-3xl flex items-center">
                      <h1 className="text-[#2c5872] font-bold flex">
                        ${ticket.packageId.price} + HST
                      </h1>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg">No payments found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserPayments;
