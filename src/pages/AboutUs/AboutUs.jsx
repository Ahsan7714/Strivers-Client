import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AboutUs = () => {
  return (
    <div className=" bg-gray-100">
      <Navbar />
      <div className=" flex flex-col w-[90%] lg:w-[60%] justify-center items-center mx-auto my-10  lg:my-16">
        <h1 className=" text-[45px] font-bold py-4 text-[#325040] ">
          About Us
        </h1>
        <p className=" text-[20px]">
          Welcome to <strong> Dental Strivers,</strong> an educational platform
          dedicated to guiding dental professionals towards achieving their
          dreams of obtaining a dental license in Canada. We provide
          comprehensive courses that include live Zoom sessions, detailed
          lecture PDFs, and recorded lectures, all designed to prepare you
          thoroughly for the National Dental Examining Board (NDEB)
          examinations.
        </p>
        <p className=" text-[20px]">
          At Dental Strivers, we are more than a team;{" "}
          <strong> we are a family.</strong> Our specialization lies in hard
          work and unwavering dedication. Loyalty is our core ability, and
          teamwork is our greatest strength. Day and night hold no distinction
          for us; our commitment remains constant, regardless of the time or
          circumstances.
        </p>
        <p className=" text-[20px]">
          Our approach is responsive and efficient, ensuring high sustainability
          in our operations. We are dedicated to supporting aspiring dentists
          from all over the world, working tirelessly without watching the
          clock. With patience and dedication, we strive to meet and exceed the
          expectations of our students.
        </p>
        <p className=" text-[20px]">
          Dental Strivers stands for <strong> ownership, responsibility, and efficiency.</strong>
          We take pride in executing each task with a high level of systematic
          coordination, ensuring that every detail is meticulously handled. Join
          us at Dental Strivers and be part of a community that values
          excellence, teamwork, and relentless dedication. Together, we will
          help you achieve your goals and build a successful career in dentistry
          in Canada. Dental Strivers
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
