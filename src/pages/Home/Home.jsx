import React from "react";
import "./Home.css";
import Courses from "../../components/Courses/Courses";
import FAQs from "../../components/FAQs/FAQs";
import Rewiews from "../../components/Reviews/Rewiews";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ContactUs from "../../components/ContactUs/ContactUs";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import { useAuthPopUp } from "../../Context/AuthPopUpContext";
import AuthPopUp from "../../components/AuthPopUp/AuthPopUp";
import Whatsapp from "../../components/Whatsapp/Whatsapp";

const Home = () => {
  const { showModal, type, onClose, onOpen } = useAuthPopUp();

  return (
    <div className="font-sans leading-normal tracking-normal ">
      {/* Header */}
      <Navbar />
      {showModal && <AuthPopUp />}

      {/* Hero Section */}
      <section
        className="relative bg-no-repeat bg-cover bg-center h-[70vh] lg:h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/287237/pexels-photo-287237.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-8 text-white rounded animate-fade-in-down">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Achieve Your Dental License with Dental Strivers
          </h1>
          <p className="text-xl lg:text-2xl mt-4 text-white">
            Dental Strivers is dedicated to helping international trained dental
            professionals develop the knowledge and expertise required to excel
            in the NDEB examinations. Our program provides comprehensive
            training and resources to ensure success.
          </p>
          {/* <button className="bg-[#2ed0be] text-white px-8 py-3 rounded mt-6  transform hover:scale-105 transition duration-300">
            Enroll Now
          </button> */}
        </div>
      </section>

      {/* our courses */}
      <Courses />

      {/* Features Section */}
      <WhyChooseUs />

      {/*  */}

      <Rewiews />
      <FAQs />

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#295e7d] to-[#6d97ae] text-white py-16 text-center">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <button className="bg-white text-blue-600 px-8 py-3 rounded mt-6 hover:bg-gray-200 transform hover:scale-105 transition duration-300">
          Enroll Now
        </button>
      </section>
      {/*  */}

      <ContactUs />

      {/* Footer */}
      <Footer />
      <Whatsapp />
    </div>
  );
};

export default Home;
