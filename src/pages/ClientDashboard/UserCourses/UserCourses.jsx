import React, { useState, useEffect } from "react";
import UserSidebar from "../../../components/UserSidebar/UserSidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar";
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import PurchaseModel from "./PurchaseModel";
import { getAllCourses, clearState } from "../../../store/reducers/userReducers";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Spinner/Loader";

const UserCourses = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { loading, error, courses } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
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
            {loading ? (
              <Loader />
            ) : courses.length > 0 ? (
              <section className="py-6">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 items-start justify-start w-full">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className={`lg:w-[370px] h-fit  w-[90%] mx-auto shadow-lg text-center flex flex-col  items-center rounded-md ${
                        courses.length === 1 ? "lg:col-span-2" : "" // Center card if there's only one
                      }`}
                    >
                      <img src={course.image || "https://via.placeholder.com/300"} className="rounded-t-md lg:h-[250px] w-full" alt="Course" />
                      <h2 className="font-semibold text-[20px] py-4">{course.title}</h2>
                      <div className="mt-3 mb-6">
                        <Link
                          to={`/course/${course.id}`}
                          // onClick={() => {
                          //   setModalIsOpen(true);
                          //   setSelectedEvent(course);
                          // }}
                          className="bg-[#a0b36d] text-white py-2 px-10 rounded-md"
                        >
                          See Packages
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <p className='text-center text-[20px]'>No courses found</p>
            )}
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
