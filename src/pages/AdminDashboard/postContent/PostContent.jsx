import React, { useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";
import { Select,MenuItem } from "@mui/material";

function PostContent() {
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [standardContent, setStandardContent] = useState({
    weekNumber: "",
    lectureNumber: "",
    topic: "",
    link: "",
    description: "",
  });
  const [premiumContent, setPremiumContent] = useState({
    weekNumber: "",
    lectureNumber: "",
    topic: "",
    link: "",
    description: "",
    pdf: null,
  });
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleStandard = () => {
    setIsPremium(false);
  };

  const handleTogglePremium = () => {
    setIsPremium(true);
  };

  const handleChangeStandard = (e) => {
    const { name, value } = e.target;
    setStandardContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePremium = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setPremiumContent((prev) => ({
        ...prev,
        pdf: files[0],
      }));
    } else {
      setPremiumContent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPremium) {
      console.log("Premium Content:", premiumContent);
    } else {
      console.log("Standard Content:", standardContent);
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
      <div className="lg:ml-[23%] w-[77%] pt-[3%]">
        <div className="lg:w-[77%] mx-auto p-5">
          <h1 className="text-[30px] font-semibold py-3">
            Post Course Content
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Course
            </label>
            <Select
              value={selectedCourse}
              onChange={handleCourseChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Select a course...</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
            </Select>
          </div>
          <div className="mb-4 flex items-center">
            <h2 className="text-lg font-medium text-gray-700 mr-4">Select Package</h2>
            <button
              type="button"
              onClick={handleToggleStandard}
              className={`px-3 py-2 mr-2 ${
                !isPremium
                  ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={handleTogglePremium}
              className={`px-3 py-2 ${
                isPremium
                  ? "bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md`}
            >
              Premium
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {isPremium ? (
              <div className="bg-[#f8fafb] rounded-md shadow-lg p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Week Number
                  </label>
                  <input
                    type="number"
                    name="weekNumber"
                    value={premiumContent.weekNumber}
                    onChange={handleChangePremium}
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
                    name="lectureNumber"
                    value={premiumContent.lectureNumber}
                    onChange={handleChangePremium}
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
                    value={premiumContent.topic}
                    onChange={handleChangePremium}
                    placeholder="Enter topic..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Meet Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={premiumContent.link}
                    onChange={handleChangePremium}
                    placeholder="/mocklink"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={premiumContent.description}
                    onChange={handleChangePremium}
                    placeholder="Write a description ..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="4"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload PDF
                  </label>
                  <input
                    type="file"
                    name="pdf"
                    onChange={handleChangePremium}
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
            ) : (
              <div className="bg-[#f8fafb] rounded-md shadow-lg p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Week Number
                  </label>
                  <input
                    type="number"
                    name="weekNumber"
                    value={standardContent.weekNumber}
                    onChange={handleChangeStandard}
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
                    name="lectureNumber"
                    value={standardContent.lectureNumber}
                    onChange={handleChangeStandard}
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
                    value={standardContent.topic}
                    onChange={handleChangeStandard}
                    placeholder="Enter topic ..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Meet Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={standardContent.link}
                    onChange={handleChangeStandard}
                    placeholder="/mocklink"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={standardContent.description}
                    onChange={handleChangeStandard}
                    placeholder="Write a description ..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="4"
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
