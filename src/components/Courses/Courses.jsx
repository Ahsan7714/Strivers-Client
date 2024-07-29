import React, { useEffect } from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Spinner/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../store/reducers/userReducers";

const Courses = () => {
  const dispatch = useDispatch();
  const { loading, error, courses } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  return (
    <section className="pt-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center ">
        <div className=" flex flex-col items-center justify-center gap-3">
          <h2 className="text-4xl font-bold">Our Courses</h2>
          <p className=" bg-[#508a7e] text-[#508a7e] w-20 h-1 text-center"></p>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center">
        <section class="health-products-b">
          <div class="product-grid-b">
            {courses && courses.length > 0 ? ( 
              courses.map((course) => (
                <div class="product-card-b w-[350px] ">
                  <img src={course.image} alt={course.title} />
                  <h2 className=" font-semibold">{course.title}</h2>
                  <div className=" my-6">
                    <Link
                      to={`/course/${course.id}`}
                      className="bg-gradient-to-r from-[#34647e] to-[#7fa8be] text-white py-2 px-10  my-6 rounded-md"
                    >
                      Explore Now
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No courses available</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Courses;
