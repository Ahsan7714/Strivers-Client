import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";
import "./NewCourse.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { InputAdornment, TextField } from "@mui/material";
import { BsCurrencyDollar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../components/Spinner/Loader";
import {
  getAllCourses,
  clearState,
  postCourse,
} from "../../../store/reducers/adminReducers";
import { storage } from "../../../Firebase"; // Import storage from your firebase.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function NewCourse() {
  const dispatch = useDispatch();
  const { loading: coursesLoading, error, courses, isCourseCreated } = useSelector(
    (state) => state.admin
  );
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [courseSubmitting, setCourseSubmitting] = useState(false); // New state for course submission

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isCourseCreated) {
      toast.success("Course added successfully!");
      setFormData({
        title: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
      setUploadProgress(0); // Reset upload progress
      setCourseSubmitting(false); // Reset course submission state
      dispatch(clearState());
      dispatch(getAllCourses());
    }
    if (error) {
      toast.error("Failed to add course!");
      setCourseSubmitting(false); // Reset course submission state
      dispatch(clearState());
    }
  }, [isCourseCreated, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({ ...formData, image: file });
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourseSubmitting(true); // Set course submission state

    if (formData.image) {
      const storageRef = ref(storage, `images/${formData.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error("Image upload failed!");
          console.error("Image upload error: ", error);
          setCourseSubmitting(false); // Reset course submission state on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newCourseData = {
              ...formData,
              image: downloadURL,
            };
            dispatch(postCourse(newCourseData));
          });
        }
      );
    } else {
      dispatch(postCourse(formData));
    }
  };

  return (
    <div className="flex font-outfit">
      {screenSize > 768 ? (
        <>
          <AdminSidebar />
        </>
      ) : (
        <>
          <AdminMobileNavbar />
        </>
      )}
      <div className="lg:ml-[24%] w-[76%]">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#f8fafb] rounded-md shadow-lg lg:w-[70%] mx-auto my-5 flex flex-col p-4">
            <h1 className="text-[30px] font-semibold pb-7 text-center">
              Add Course
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the title of the course..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                name="description"
                onChange={handleChange}
                placeholder="Write a description for the course..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Choose Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {uploadProgress > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Progress
                </label>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#93ae50] h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white px-3 py-2 rounded-md h-[40px]"
              disabled={courseSubmitting} // Disable button during submission
            >
              {courseSubmitting ? "Submitting..." : "Add Course"} 
            </button>
          </div>
        </form>

        <div className="flex flex-col w-full overflow-hidden content-scrollbar">
          <div className="main-content w-full lg:px-7">
            <h1 className="text-center text-[30px] font-bold py-5">
              Active Courses
            </h1>
            <section className="py-7">
              {coursesLoading ? ( // Show loading spinner if courses are being fetched
                <Loader />
              ) : (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 items-start justify-start w-full">
                  {courses && courses.length > 0 ? (
                    courses.map((course, index) => (
                      <div
                        key={index}
                        className="lg:w-[370px] w-[90%] mx-auto shadow-lg  text-center flex flex-col justify-center items-center rounded-md"
                      >
                        <img
                          src={course.image}
                          className="rounded-t-md"
                          alt="Course"
                        />
                        <h2 className="font-semibold text-[20px] py-4">
                          {course.title}
                        </h2>
                        <div className="h-fit p-2">
                          <h1>{course.description}</h1>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No courses available</p>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;
