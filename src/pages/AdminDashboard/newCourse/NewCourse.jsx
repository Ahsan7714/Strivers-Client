import React, { useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminMobileNavbar from "../../../components/adminMobileNavbar/AdminMobileNavbar";
import "./NewCourse.css";
import { FaLongArrowAltRight } from "react-icons/fa";

function NewCourse() {
  const [title, setTitle] = useState("");
  const [canadianStandard, setCanadianStandard] = useState("");
  const [canadianPremium, setCanadianPremium] = useState("");
  const [internationalStandard, setInternationalStandard] = useState("");
  const [internationalPremium, setInternationalPremium] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const AllPackages = [
    {
      title: "Objective Structured Clinical Examination (OSCE)",
      features: [
        "5 month course",
        "Highly qualified successful mentors",
        "weekly performance review",
        "Live discussion of criteria and demos (Twice a week)",
      ],
      link: "/user/my-course/content",
      linkText: "Subscribe",
      image: "https://acecourses.ca/images/1043.jpg",
    },
    {
      title: "US And Canadian Universities Bench Exam Preparation.",
      features: [
        "5 month course",
        "Highly qualified successful mentors",
        "weekly performance review",
        "Live discussion of criteria and demos (Twice a week)",
      ],
      link: "/user/my-course/content",
      linkText: "Subscribe",
      image: "https://acecourses.ca/images/688.jpg",
    },
    // You can add more package objects here if needed
  ];

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      canadianStandard,
      canadianPremium,
      internationalStandard,
      internationalPremium,
      description,
      photo,
    });
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title of the course..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price for Canadian Students
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={canadianStandard}
                      onChange={(e) => setCanadianStandard(e.target.value)}
                      placeholder="Standard"
                      className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      value={canadianPremium}
                      onChange={(e) => setCanadianPremium(e.target.value)}
                      placeholder="Premium"
                      className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price for International Students
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={internationalStandard}
                      onChange={(e) => setInternationalStandard(e.target.value)}
                      placeholder="Standard"
                      className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      value={internationalPremium}
                      onChange={(e) => setInternationalPremium(e.target.value)}
                      placeholder="Premium"
                      className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a description for the course..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <input
                type="file"
                onChange={handlePhotoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#2b5870] to-[#6a97af] text-white px-3 py-2 rounded-md h-[40px]"
            >
              Add Course
            </button>
          </div>
        </form>
        
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar">
          <div className="main-content w-full lg:px-7">
            <h1 className="text-center text-[30px] font-bold py-5">Active Courses</h1>
            <section className="py-7">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-0 items-start justify-start w-full">
                {AllPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className="lg:w-[370px] w-[90%] mx-auto shadow-lg text-center flex flex-col justify-center items-center rounded-md"
                  >
                    <img
                      src={pkg.image}
                      className="rounded-t-md"
                      alt="Product 2"
                    />
                    <h2 className="font-semibold text-[20px] py-4">
                      {pkg.title}
                    </h2>
                    <div className="h-[100px]">
                      <ul className="text-start">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center pl-4 gap-1">
                            <FaLongArrowAltRight />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-9 mb-6">
                      <button
                        className="bg-[#a0b36d] text-white py-2 px-10 rounded-md"
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
    </div>
  );
}

export default NewCourse;
