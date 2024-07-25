import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const CourseDetails = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* <section
        className="relative bg-no-repeat bg-cover bg-center h-[70vh] lg:h-[50vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/287237/pexels-photo-287237.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-8 text-white rounded animate-fade-in-down">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
          AFK (Assessment of Fundamental Knowledge)  
          </h1>
        </div>
      </section> */}
        <div className="bg-gradient-to-r from-[#2b3e50] via-[#427590] to-[#2b3e50] text-center flex flex-col justify-center items-center mb-10 h-[40vh] text-white">
          <h1 className="text-[40px] font-bold">AFK </h1>
          <h1 className="text-[40px] font-bold">
            (Assessment of Fundamental Knowledge)
          </h1>
        </div>
        <div className=" my-5 text-center flex flex-col justify-center items-center w-[80%] mx-auto">
          <h1 className=" text-[40px]">What is Assessment of Fundamental Knowledge?</h1>
          <p className=" text-[25px] pt-5">
            The AFK exam is the first phase that a foreign-trained dentist needs
            to complete in order to become a licensed dentist in Canada. This
            multiple-choice exam tests students’ knowledge of biomedical science
            as well as applied clinical science. The assessment consists of two
            books with each book containing 150 single-answer multiple choice
            questions.
          </p>
          <p className=" text-[25px] p-5">
            Coverage of the exam is based on the competencies for a beginning
            Dental Practitioner in Canada. Questions are distributed among 8
            major content areas and each area carries a different percentage of
            questions.
          </p>
        </div>
      </div>
      {/*  packages  */}
      <section>
        <div className=" flex flex-col w-[95%] ms-auto">
            <h1 className="">AFK Packages</h1>
            <div className=" flex">
                <div className="">

                </div>

            </div>
        </div>
      </section>
      {/*  */}
      <Footer />
    </>
  );
};

export default CourseDetails;
