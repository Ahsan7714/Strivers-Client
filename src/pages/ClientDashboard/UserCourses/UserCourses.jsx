import React,{useState} from "react";
import UserSidebar from "../../../components/UserSidebar/UserSidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
// import "./UserPackages.css"; // If you need additional styles
import MobileNavbar from '../../../components/MobileNavbar/MobileNavbar';
import UserNavbar from '../../../components/UserNavbar/UserNavbar';
import PurchaseModel from "./PurchaseModel";


const AllPackages = [
  {
    title: "Objective Structured Clinical Examination (OSCE)",
    features:  [
      "5 month course",
      "Highly qualified successful mentors",
      "weekly performance review",
      "Live discussion of criteria and demos (Twice a week)"
    ],
    link: "/user/my-course/content",
    linkText: "Subscribe",
    image: "https://acecourses.ca/images/1043.jpg",
    intfees : "2000",
    locfees : "1500",
    intbasic : "300",
    locbasic : "200",
    intinter : "500",
    locinter : "400",
    intadvance : "800",
    locadvance : "600",
  },
  {
    title: "US And Canadian Universities Bench Exam Preparation.",
    features: [
      "5 month course",
      "Highly qualified successful mentors",
      "weekly performance review",
      "Live discussion of criteria and demos (Twice a week)"
    ],
    link: "/user/my-course/content",
    linkText: "Subscribe",
    image: "https://acecourses.ca/images/688.jpg",
    intfees : "2000",
    locfees : "1500",
    intbasic : "300",
    locbasic : "200",
    intinter : "500",
    locinter : "400",
    intadvance : "800",
    locadvance : "600",

  },
  // You can add more package objects here if needed
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
       <UserNavbar/>
    <div className=' flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] lg:h-[80vh] h-fit rounded-md'>
    {screenSize > 786 ? (
          <UserSidebar/>
      ) : <MobileNavbar/>}
        <div className=" flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar">
          <div className="main-content w-full lg:px-7">
            <h1 className="text-center text-[30px] font-bold py-5">Our Courses</h1>
            <section className=" py-7">
              <div className=" grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-0   items-start justify-start w-full ">
                {AllPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className="lg:w-[370px] w-[90%]  mx-auto   shadow-lg text-center flex flex-col justify-center items-center  rounded-md"
                  >
                     <img
              src={pkg.image}
              className=" rounded-t-md"
              alt="Product 2"
            />
                    <h2 className="font-semibold text-[20px] py-4">
                      {pkg.title}
                    </h2>
                    <div className=" h-[100px]">
                      <ul className="text-start ">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center pl-4 gap-1">
                            <FaLongArrowAltRight />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-9 mb-6 ">
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setSelectedEvent(pkg);
                        }}
                        className="bg-[#a0b36d] text-white py-2  px-10 rounded-md"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <PurchaseModel 
         isOpen={modalIsOpen}
         event={selectedEvent}
         onClose={closeModal} />
    </>
  );
};

export default UserCourses;
