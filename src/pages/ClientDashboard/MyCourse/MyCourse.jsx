import React, { useEffect, useState } from "react";
import UserSidebar from "../../../components/UserSidebar/UserSidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./MyCourse.css";
import { Link , useNavigate } from "react-router-dom";
import MobileNavbar from "../../../components/MobileNavbar/MobileNavbar";
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getCourses, getContent } from "../../../store/reducers/userReducers";
import Loader from "../../../components/Spinner/Loader";

const MyCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCourses, loading, error, content } = useSelector((state) => state.user);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchContent = (courseId, packageId) => {
    console.log(courseId, packageId);
    dispatch(getContent( {courseId, packageId} ));
    navigate(`/user/my-course/${courseId}/${packageId}`);
    
  };

  return (
    <>
      <UserNavbar />
      <div className="flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] h-[80vh] rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="main-content w-full p-7">
          <h1 className="text-center text-[30px] font-bold">My Courses</h1>
          {loading ? (
            <Loader />
          ) : allCourses.length > 0 ? (
            <section className="health-products-c">
              <div className="product-grid-c">
                {allCourses.map((course, index) => (
                  <div key={index} className="product-card-c w-[300px]">
                    <img
                      src={
                        course.courseDetails.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt={course.title}
                    />
                    <h2 className="font-semibold px-1 py-3 text-[20px]">
                      {course.courseDetails.title}
                    </h2>
                    <div className="flex gap-6 px-2">
                      <h5>Package : </h5>
                      <h5 className="font-medium">{course.packageDetails.packageName}</h5>
                    </div>
                    <div className="my-6">
                      <button
                        className="bg-gradient-to-r from-[#427590] to-[#427590bd] text-white py-2 px-10 rounded-md"
                        onClick={() => fetchContent(course.courseDetails.id, course.packageDetails.id)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <p className="text-start text-[20px] mt-10">No courses found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCourse;
