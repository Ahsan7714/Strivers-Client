import React, { useState } from "react";
import UserSidebar from "../../../components/UserSidebar/UserSidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
// import "./UserPackages.css"; // If you need additional styles
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar";
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import PurchaseModel from "./PurchaseModel";

const AllPackages = [
  {
    title: "Objective Structured Clinical Examination (OSCE)",
    link: "/user/my-course/content",
    linkText: "Subscribe",
    image: "https://acecourses.ca/images/1043.jpg",
    intfees: "2000",
    locfees: "1500",
    intbasic: "300",
    locbasic: "200",
    intinter: "500",
    locinter: "400",
    intadvance: "800",
    locadvance: "600",
  },
];

const UserCourses = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] lg:h-[80vh] h-fit rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar content-center">
          <div className="main-content w-full lg:px-7">
            <h1 className="text-center text-[30px] font-bold py-5">Our Courses</h1>
            <section className="py-6">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-0 items-start justify-start w-full">
                {AllPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`lg:w-[370px] w-[90%] mx-auto shadow-lg text-center flex flex-col justify-center items-center rounded-md ${
                      AllPackages.length === 1 ? "lg:col-span-2" : "" // Center card if there's only one
                    }`}
                  >
                    <img src={pkg.image} className="rounded-t-md" alt="Product" />
                    <h2 className="font-semibold text-[20px] py-4">{pkg.title}</h2>
                    <div className="mt-3 mb-6">
                      <Link
                        to='/course-details'
                        // onClick={() => {
                        //   setModalIsOpen(true);
                        //   setSelectedEvent(pkg);
                        // }}
                        className="bg-[#a0b36d] text-white py-2 px-10 rounded-md"
                      >
                        See Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      {/* <PurchaseModel 
         isOpen={modalIsOpen}
         event={selectedEvent}
         onClose={closeModal} /> */}
    </>
  );
};

export default UserCourses;
