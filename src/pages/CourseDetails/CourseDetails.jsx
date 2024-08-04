import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaLongArrowAltRight } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../components/Spinner/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../store/reducers/userReducers";
import { useParams } from "react-router-dom";
import RegisterModal from "./RegisterModal";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, course, user } = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mockCount, setMockCount] = useState(0);
  const [mockPrice, setMockPrice] = useState("Price not available");

  useEffect(() => {
    dispatch(getCourse(id));
  }, [dispatch, id]);

  const getPrice = (count, mocksPrices) => {
    const mock = mocksPrices.find((mock) => mock.quantity === count);
    return mock ? mock.price : "Price not available";
  };

  const handleMockChange = (event, mocksPrices) => {
    const count = parseInt(event.target.value);
    setMockCount(count);
    const price = getPrice(count, mocksPrices);
    setMockPrice(price);
    console.log(count, price);
  };

  const openModal = (event) => {
    setSelectedCourse(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="bg-gradient-to-r from-[#2b3e50] via-[#427590] to-[#2b3e50] text-center flex flex-col justify-center items-center mb-10 h-[40vh] text-white">
          <h1 className="text-[40px] font-bold">{course?.title} </h1>
        </div>
        <div className="my-5 text-center flex flex-col justify-center items-center lg:w-[80%] px-6 lg:px-0 mx-auto">
          <h1 className="text-[35px] lg:text-[40px]">What is {course?.title}</h1>
          <p className="text-[20px] lg:text-[25px] py-5">{course?.description}</p>
          <p className="text-[20px] lg:text-[25px] lg:p-5">
            Coverage of the exam is based on the competencies for a beginning Dental Practitioner in Canada. Questions are distributed among 8 major content areas and each area carries a different percentage of questions.
          </p>
        </div>
      </div>
      <section>
        <div className="flex flex-col gap-5 w-[95%] mx-auto my-10">
          <h1 className="text-[40px]">AFK Packages</h1>
          {course.packages && course.packages.length > 0 ? (
            course.packages.map((pack) => (
              pack.packageId.packageType === "fullCourse" ? (
                <div
                  key={pack._id}
                  className="detail-cont flex lg:flex-row flex-col w-full bg-gray-200 py-10 px-14 rounded-md"
                >
                  <div className="detail-cont-a flex-1 flex lg:flex-row flex-col justify-around items-center">
                    <div className="flex flex-col gap-5">
                      <h1 className="text-[40px] font-bold">{pack.packageId.packageName}</h1>
                      <div className="bg-white rounded-3xl w-fit text-center font-semibold text-[#6bcaef] py-1 px-5">
                        <h1>Start Mar / Aug</h1>
                      </div>
                    </div>
                    <div className="text-[35px] flex">
                      <h1 className="text-[#2c5872] font-bold">${pack.packageId.price} + HST</h1>
                    </div>
                  </div>
                  <div className="flex-1 flex lg:flex-row flex-col gap-8 lg:gap-0 justify-around">
                    <div className="flex flex-col font-medium gap-2 text-[#000000c1]">
                      <div className="flex gap-2 items-center">
                        <FaLongArrowAltRight />
                        <p>5 Months</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaLongArrowAltRight />
                        <p>Live zoom sessions with 2 lectures weekly</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaLongArrowAltRight />
                        <p>Access to recorded zoom lectures</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaLongArrowAltRight />
                        <p>7-8 Quizzes</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaLongArrowAltRight />
                        <p>2-3 Mini-Mocks</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaLongArrowAltRight />
                        <p>3 Full Mocks</p>
                      </div>
                    </div>
                    <div className="lg:text-[30px] flex text-[25px] lg:h-[40px] justify-center items-center my-auto">
                      <button onClick={() => openModal(pack)} className="bg-[#2c5872] text-white rounded-full px-5 py-2">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : pack.packageId.packageType === "mock" ? (
                <div key={pack._id} className="detail-cont flex lg:flex-row flex-col w-full bg-gray-200 py-14 px-14 rounded-md">
                  <div className="detail-cont-a flex-1 flex lg:flex-row flex-col justify-around items-center">
                    <div className="flex flex-col gap-5">
                      <h1 className="text-[40px] font-bold">{pack.packageId.packageName}</h1>
                      <div className="bg-white rounded-3xl w-fit text-center font-semibold text-[#6bcaef] py-1 px-5">
                        <h1>Start Mar / Aug</h1>
                      </div>
                    </div>
                    <div className="text-[35px] flex">
                      <h1 className="text-[#2c5872] font-bold">
                        ${mockCount === 0 
                          ? `${pack.packageId.mocksPrices[0]?.price || 'N/A'}-${pack.packageId.mocksPrices[2]?.price || 'N/A'}` 
                          : mockPrice} + HST
                      </h1>
                    </div>
                  </div>
                  <div className="flex-1 flex lg:flex-row flex-col gap-8 lg:gap-0 justify-between">
                    <div className="flex flex-col font-medium gap-2 text-[#000000c1]">
                      <div className="w-[80%] py-5 lg:py-0">
                        <p>Enroll for AFK mock exams to maximize your chance and get a complete review before your exam.</p>
                      </div>
                      <div className="flex gap-0 items-center lg:py-5">
                        <h1 className="font-semibold lg:text-[23px] text-[18px] w-[150px]">Select Mocks</h1>
                        <select
                          className="cursor-pointer bg-white px-5 border border-[#2c5872] text-[20px] h-[40px] rounded-lg"
                          value={mockCount}
                          onChange={(e) => handleMockChange(e, pack.packageId.mocksPrices)}
                        >
                          <option value={0}>Select Mocks</option>
                          <option value={1}>1 Mock</option>
                          <option value={2}>2 Mocks</option>
                          <option value={3}>3 Mocks</option>
                        </select>
                      </div>
                    </div>
                    <div className="lg:text-[30px] flex text-[25px] lg:h-[40px] w-[100%] justify-center items-center my-auto flex-col gap-4">
                      <button onClick={() => openModal(pack)} className="bg-[#2c5872] text-white rounded-full px-5 py-2">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            ))
          ) : (
            <p>No package found</p>
          )}
        </div>
        <RegisterModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          event={selectedCourse}
          course={course}
          selectedMocks={{ mockCount, mockPrice }}
        />
      </section>
      <Footer />
    </>
  );
};

export default CourseDetails;
