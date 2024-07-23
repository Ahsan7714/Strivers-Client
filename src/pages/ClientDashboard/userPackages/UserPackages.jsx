import React from "react";
import UserSidebar from "../../../components/UserSidebar/UserSidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./UserPackages.css"; // If you need additional styles
import MobileNavbar from '../../../components/MobileNavbar/MobileNavbar';
import UserNavbar from '../../../components/UserNavbar/UserNavbar';
const packages = [
  {
    title: "Premium Package",
    features: [
      "Access to All zoom meets",
      "Access to All lectures recordings",
      "Access to All lectures notes",
      "Access to All mocks",
    ],
    link: "/user/my-course/content",
    linkText: "Subscribed",
  },
  // You can add more package objects here if needed
];

const AllPackages = [
  {
    title: "Basic Package",
    features: ["Access to  lectures notes", "Access to  mocks"],
    link: "/user/my-course/content",
    linkText: "Subscribe",
  },
  {
    title: "Standard Package",
    features: [
      "Access to  lectures recordings",
      "Access to  lectures notes",
      "Access to  mocks",
    ],
    link: "/user/my-course/content",
    linkText: "Subscribe",
  },
  {
    title: "Premium Package",
    features: [
      "Access to All zoom meets",
      "Access to All lectures recordings",
      "Access to All lectures notes",
      "Access to All mocks",
    ],
    link: "/user/my-course/content",
    linkText: "Subscribe",
  },
  // You can add more package objects here if needed
];

const UserPackages = () => {
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
       <UserNavbar/>
    <div className=' flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] h-[80vh] rounded-md'>
    {screenSize > 786 ? (
          <UserSidebar/>
      ) : <MobileNavbar/>}
        <div className=" flex flex-col w-full h-[80vh] overflow-y-auto content-scrollbar">
          <div className="main-content w-full pt-7">
            <h1 className="text-center text-[30px] font-bold">My Packages</h1>
            <section className="health-products-c">
              <div className="product-grid-c">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="lg:w-[280px] w-[90%] h-[280px] lg:mx-0 mx-auto  border bg-[#ebebeb] border-[#f8fafb] rounded-md"
                  >
                    <h2 className="font-semibold text-[25px] py-5">
                      {pkg.title}
                    </h2>
                    <div className=" h-[100px]">
                      <ul className="text-start pl-5">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <FaLongArrowAltRight />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="my-6">
                      <Link
                        to={pkg.link}
                        className="bg-[#a0b36d] text-white py-2 px-10 rounded-md"
                      >
                        {pkg.linkText}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="main-content w-full lg:px-7">
            <h1 className="text-center text-[30px] font-bold">All Packages</h1>
            <section className=" py-7">
              <div className=" grid lg:grid-cols-3 grid-cols-1 gap-5 items-start justify-start ">
                {AllPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className="lg:w-[280px] w-[90%] h-[280px] mx-auto  border text-center flex flex-col justify-center items-center bg-[#ebebeb] border-[#f8fafb] rounded-md"
                  >
                    <h2 className="font-semibold text-[25px] py-5">
                      {pkg.title}
                    </h2>
                    <div className=" h-[100px]">
                      <ul className="text-start ">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <FaLongArrowAltRight />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="my-6 ">
                      <Link
                        to={pkg.link}
                        className="bg-[#a0b36d] text-white py-2 px-10 rounded-md"
                      >
                        {pkg.linkText}
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
    </>
  );
};

export default UserPackages;
