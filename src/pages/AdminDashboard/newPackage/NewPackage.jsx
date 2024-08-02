import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";
import { Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCourses,
  postPackage,
} from "../../../store/reducers/adminReducers";
import toast from "react-hot-toast";
import Loader from "../../../components/Spinner/Loader";

function NewPackage() {
  const dispatch = useDispatch();
  const { loading, error, courses, isPackageCreated } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const [isFullCourse, setIsFullCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseTitle, setSelectedCourseTitle] =
    useState("Select a course...");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [standardContent, setStandardContent] = useState({
    packageName: "",
    price: "",
    start: "",
    end: "",
  });
  const [premiumContent, setPremiumContent] = useState({
    packageName: "",
    price: "",
    start: "",
    end: "",
    mocksPrices: [
      { quantity: 1, price: "" },
      { quantity: 2, price: "" },
      { quantity: 3, price: "" },
    ],
  });

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleStandard = () => {
    setIsFullCourse(false);
  };

  const handleTogglePremium = () => {
    setIsFullCourse(true);
  };

  const handleChangeStandard = (e) => {
    const { name, value } = e.target;
    setStandardContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePremium = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("mocksPrice")) {
      const index = parseInt(name.split("-")[1]);
      const newMocksPrices = premiumContent.mocksPrices.map((mockPrice, idx) =>
        idx === index ? { ...mockPrice, price: value } : mockPrice
      );
      setPremiumContent((prev) => ({
        ...prev,
        mocksPrices: newMocksPrices,
        price : premiumContent.mocksPrices[0].price
      }));
    } else {
      setPremiumContent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCourseChange = (courseId, courseTitle) => {
    setSelectedCourse(courseId);
    setSelectedCourseTitle(courseTitle);
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = isFullCourse ? standardContent : premiumContent;
    const packageType = isFullCourse ? "fullCourse" : "mock";
    const payload = { ...content, packageType, courseId: selectedCourse };

    if (!isFullCourse) {
      payload.mocksPrices = premiumContent.mocksPrices;
    }

    dispatch(postPackage(payload))
      .then(() => {
        toast.success("Package created successfully!");
        setStandardContent({
          packageName: "",
          price: "",
          start: "",
          end: "",
        });
        setPremiumContent({
          packageName: "",
          price: "",
          start: "",
          end: "",
          mocksPrices: [
            { quantity: 1, price: "" },
            { quantity: 2, price: "" },
            { quantity: 3, price: "" },
          ],
        });
      })
      .catch((err) => {
        toast.error("Failed to create package");
      });
  };

  return (
    <div className="flex font-outfit">
      {screenSize > 768 ? <AdminSidebar /> : <AdminMobileNavbar />}
      <div className="lg:ml-[23%] w-[77%] pt-[3%]">
        <div className="lg:w-[77%] mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">Add Package</h1>
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
                        handleCourseChange(course.id, course.title)
                      }
                    >
                      {course.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mb-4 flex items-center w-full">
            <h2 className="text-lg font-medium text-gray-700 mr-4">
              Select Package
            </h2>
            <button
              type="button"
              onClick={handleTogglePremium}
              className={`px-3 py-2 mr-2 ${
                isFullCourse
                  ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              Full Course
            </button>
            <button
              type="button"
              onClick={handleToggleStandard}
              className={`px-3 py-2 ${
                !isFullCourse
                  ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              Mocks Only
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {isFullCourse ? (
              <div className="bg-[#f8fafb] rounded-md shadow-lg p-4 w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="packageName"
                    value={standardContent.packageName}
                    onChange={handleChangeStandard}
                    placeholder="Enter package name..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Package Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={standardContent.price}
                    onChange={handleChangeStandard}
                    placeholder="Enter package price..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start"
                    value={standardContent.start}
                    onChange={handleChangeStandard}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end"
                    value={standardContent.end}
                    onChange={handleChangeStandard}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[#f8fafb] rounded-md shadow-lg p-4 w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="packageName"
                    value={premiumContent.packageName}
                    onChange={handleChangePremium}
                    placeholder="Enter package name..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start"
                    value={premiumContent.start}
                    onChange={handleChangePremium}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end"
                    value={premiumContent.end}
                    onChange={handleChangePremium}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mocks Prices
                  </label>
                  {premiumContent.mocksPrices.map((mockPrice, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="number"
                        name={`mocksPrice-${index}`}
                        value={mockPrice.price}
                        onChange={handleChangePremium}
                        placeholder={`Mocks ${mockPrice.quantity} price`}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white rounded-md"
            >
              Submit
            </button>
          </form>
          {/* {loading && <Loader />}
          {error && <p className="text-red-500">{error}</p>} */}
        </div>
      </div>
    </div>
  );
}

export default NewPackage;
