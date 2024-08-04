import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../Firebase"; // Import storage from your firebase.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  postContent,
  clearState,
  getAllCourses,
} from "../../../store/reducers/adminReducers";
import toast from "react-hot-toast";
import { cloudinaryConfig } from "../../../cloudinaryConfig";
import axios from 'axios';


function PostContent() {
  const dispatch = useDispatch();
  const { isContentPosted, error, courses } = useSelector(
    (state) => state.admin
  );
  const [isFullCourse, setIsFullCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedCourseTitle, setSelectedCourseTitle] =
    useState("Select a course...");
  const [selectedPackageTitle, setSelectedPackageTitle] = useState(
    "Select a package..."
  );

  const [uploadProgress, setUploadProgress] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pkgdropdownOpen, setPkgdropdownOpen] = useState(false);
  const [mocks, setMocks] = useState({
    weekNo: "",
    lectureNo: "",
    topic: "",
    mockLink: "",
    // description: "",
  });

  const [fullCourse, setFullCourse] = useState({
    weekNo: "",
    lectureNo: "",
    topic: "",
    meetLink: "",
    // description: "",
    pdfLink: "",
  });

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (isContentPosted) {
      toast.success("Content posted successfully");
      dispatch(clearState());
      // // clear the form
      setMocks({
        weekNo: "",
        lectureNo: "",
        topic: "",
        mockLink: "",
        // description: "",
      });
      setFullCourse({
        weekNo: "",
        lectureNo: "",
        topic: "",
        meetLink: "",
        // description: "",
        pdfLink: "",
      });

      setSelectedCourse("");
      setSelectedPackage("");
      setSelectedCourseTitle("Select a course...");
      setSelectedPackageTitle("Select a package...");
      // empty pdf file

    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isContentPosted, error, dispatch]);

  const handleToggleMocks = () => {
    setIsFullCourse(false);
  };

  const handleToggleFullCourse = () => {
    setIsFullCourse(true);
  };

  const handleChangeMocks = (e) => {
    const { name, value } = e.target;
    setMocks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeFullCourse = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setFullCourse((prev) => ({
        ...prev,
        pdf: files[0],
      }));
    } else {
      setFullCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePackageChange = (packageId, packageTitle) => {
    setSelectedPackage(packageId);
    setSelectedPackageTitle(packageTitle);
    setPkgdropdownOpen(false);
  };


  const handleUploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
            console.log(`Upload is ${progress}% done`);
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file to Cloudinary", error);
      toast.error("Error uploading file");
      return null;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentData = isFullCourse
      ? {
          ...fullCourse,
          contentType: "zoom",
          packageName: selectedPackageTitle,
          courseId: selectedCourse,
          packageId: selectedPackage,
        }
      : {
          ...mocks,
          contentType: "mocks",
          packageName: selectedPackageTitle,
          courseId: selectedCourse,
          packageId: selectedPackage,
        };

        if (isFullCourse && fullCourse.pdf) {
          const pdfUrl = await handleUploadToCloudinary(fullCourse.pdf);
          if (pdfUrl) {
            contentData.pdfLink = pdfUrl;
            contentData.contentType = "pdf";
          }
          setUploadProgress(0); // Reset progress after upload is complete
        }
        

    dispatch(postContent(contentData));
  };

  const handleCoursesChange = (courseId, courseTitle) => {
    setSelectedCourse(courseId);
    setSelectedCourseTitle(courseTitle);
    setDropdownOpen(false);
    console.log(courseId);
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
      <div className="lg:ml-[23%] w-[77%] pt-[3%]">
        <div className="lg:w-[77%] mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">
            Post Course Content
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Course
            </label>
            <div className="relative inline-block w-full">
              <button
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full text-left rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedCourseTitle}
              </button>
              <ul
                id="course-options"
                className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 ${
                  dropdownOpen ? "" : "hidden"
                }`}
              >
                {courses &&
                  courses.map((course) => (
                    <li
                      key={course._id}
                      className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                      onClick={() =>
                        handleCoursesChange(course.id, course.title)
                      }
                    >
                      {course.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Package
            </label>
            <div className="relative inline-block w-full">
              <button
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full text-left rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setPkgdropdownOpen(!pkgdropdownOpen)}
              >
                {selectedPackageTitle}
              </button>
              <ul
                id="package-options"
                className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 ${
                  pkgdropdownOpen ? "" : "hidden"
                }`}
              >
                {selectedCourse &&
                  courses
                    .find((course) => course.id === selectedCourse)
                    .packages.map((pkg) => (
                      <li
                        key={pkg._id}
                        className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                        onClick={() =>
                          handlePackageChange(
                            pkg.packageId.id,
                            pkg.packageId.packageName
                          )
                        }
                      >
                        {pkg.packageId.packageName}
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <h2 className="text-lg font-medium text-gray-700 mr-4">
              Select Package Type
            </h2>
            <button
              type="button"
              onClick={handleToggleMocks}
              className={`px-3 py-2 mr-2 ${
                !isFullCourse
                  ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              Mocks Only
            </button>
            <button
              type="button"
              onClick={handleToggleFullCourse}
              className={`px-3 py-2 ${
                isFullCourse
                  ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              Full Course
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {isFullCourse ? (
              <div className="bg-[#f8fafb] rounded-md shadow-lg p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Week Number
                  </label>
                  <input
                    type="number"
                    name="weekNo"
                    value={fullCourse.weekNo}
                    onChange={handleChangeFullCourse}
                    placeholder="Enter week number..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Lecture Number
                  </label>
                  <input
                    type="number"
                    name="lectureNo"
                    value={fullCourse.lectureNo}
                    onChange={handleChangeFullCourse}
                    placeholder="Enter lecture number..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={fullCourse.topic}
                    onChange={handleChangeFullCourse}
                    placeholder="Enter topic..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mock Link
                  </label>
                  <input
                    type="text"
                    name="meetLink"
                    value={fullCourse.meetLink}
                    onChange={handleChangeFullCourse}
                    placeholder="Paste Your Meet Link Here"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload PDF
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    name="pdf"
                    onChange={handleChangeFullCourse}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {uploadProgress > 0 && (
                    <div className="mt-2">
                      <progress className="w-full" value={uploadProgress} max="100"></progress>
                      <p className="text-center text-sm text-gray-500">{uploadProgress.toFixed(2)}% uploaded</p>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full px-3 py-2 bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white rounded-md"
                >
                  Post Content
                </button>
              </div>
            ) : (
              <div className="bg-[#f8fafb] rounded-md shadow-lg p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Week Number
                  </label>
                  <input
                    type="number"
                    name="weekNo"
                    value={mocks.weekNo}
                    onChange={handleChangeMocks}
                    placeholder="Enter week number..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Lecture Number
                  </label>
                  <input
                    type="number"
                    name="lectureNo"
                    value={mocks.lectureNo}
                    onChange={handleChangeMocks}
                    placeholder="Enter lecture number..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={mocks.topic}
                    onChange={handleChangeMocks}
                    placeholder="Enter topic ..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mock Link
                  </label>
                  <input
                    type="text"
                    name="mockLink"
                    value={mocks.mockLink}
                    onChange={handleChangeMocks}
                    placeholder="Paste Your Mock Link Here"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full px-3 py-2 bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white rounded-md"
                >
                  Post Content
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
