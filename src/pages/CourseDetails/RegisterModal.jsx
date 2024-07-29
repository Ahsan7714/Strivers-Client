import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import et from "../../assets/et.png";
import { Link } from "react-router-dom";
import "./CourseDetails.css";
import sq from "../../assets/sqaure.png";
import { useDispatch, useSelector } from "react-redux";
import { requestCourse, clearState } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import Loader from "../../components/Spinner/Loader";

const RegisterModal = ({ isOpen, onClose, event, course }) => {
  const dispatch = useDispatch();
  const { loading, error, isRequestSubmitted } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    courseId: "",
    packageId: "",
    paidThrough: "e-transfer",
    cardNumber: "123213",
    pricePaid: "",
    mocksPurcahsed: "",
  });
  const [mockCount, setMockCount] = useState(0);
  const prices = { 1: 100, 2: 200, 3: 300 };

  const getPrice = (count) => {
    return prices[count] || `${prices[1]}-${prices[3]}`;
  };

  useEffect(() => {
    if (isRequestSubmitted) {
      toast.success("Request Submitted Successfully");
      onClose();
      dispatch(clearState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isRequestSubmitted, error, dispatch, onClose]);

  if (!isOpen || !event || !course) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMockChange = (e) => {
    setMockCount(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, mocksPurcahsed, paidThrough, cardNumber } = formData;
    const pricePaid = mocksPurcahsed
      ? event.packageId.mocksPrices[mocksPurcahsed - 1].price
      : event.packageId.price;

    const courseRequestData = {
      email,
      courseId: course.id,
      packageId: event.packageId.id,
      mocksPurcahsed,
      paidThrough,
      cardNumber,
      pricePaid,
    };

    dispatch(requestCourse(courseRequestData));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md lg:w-[80%] lg:h-fit  h-[95vh] overflow-y-auto shadow-lg">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h2 className="text-[24px] font-semibold">Dental Srtivers</h2>
          <button onClick={onClose}>
            <IoMdClose className="text-[30px]" />
          </button>
        </div>
        <div className=" flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 flex flex-col lg:pt-10">
            {/* <h1>{course.title}</h1> */}
            <div className=" flex flex-col gap-2">
              <div className=" flex justify-between">
                <h1 className=" text-[20px]">Course :</h1>
                <h1 className=" font-medium">{course.title}</h1>
              </div>
              <div className=" flex justify-between">
                <h1 className=" text-[20px]">Package :</h1>
                <h1 className=" font-medium">{event.packageId.packageName}</h1>
              </div>

              {event.packageId.packageType === "fullCourse" ? (
                <div className="flex flex-col gap-1 text-[#000000e6]">
                  <h1 className=" text-[20px] font-medium">Features :</h1>
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
              ) : (
                <div>
                  <p>Mock only</p>
                </div>
              )}
            </div>
            {event.packageId.packageType === "mocks" ? (
              <div className="flex flex-col gap-2">
                <h1 className="text-[20px] font-medium">Select Mocks</h1>
                <select
                  className="cursor-pointer bg-white px-5 border border-[#2c5872] text-[20px] h-[40px] rounded-lg"
                  value={mockCount}
                  onChange={handleMockChange}
                >
                  <option value={0}>Select Mocks</option>
                  <option value={1}>1 Mock</option>
                  <option value={2}>2 Mocks</option>
                  <option value={3}>3 Mocks</option>
                </select>
                <div className="flex justify-between py-3 mt-2 border-t border-[#00000066]">
                  <h1 className="text-[20px]">Price</h1>
                  <h1 className="font-bold">
                    $
                    {mockCount === 0
                      ? `${event.packageId.mocksPrices[0].price}-${event.packageId.mocksPrices[2].price}`
                      : getPrice(mockCount)}
                    .00 + HST
                  </h1>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#00000066]">
                  <h1 className="text-[20px] font-medium">Total :</h1>
                  <h1 className="font-bold text-[20px]">
                    $
                    {mockCount === 0
                      ? `${event.packageId.mocksPrices[0].price}-${event.packageId.mocksPrices[2].price}`
                      : getPrice(mockCount)}
                    .00
                  </h1>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between py-3 mt-2 border-t border-[#00000066]">
                  <h1 className="text-[20px]">Price</h1>
                  <h1 className="font-bold">
                    ${event.packageId.price}.00 + HST
                  </h1>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#00000066]">
                  <h1 className="text-[20px] font-medium">Total :</h1>
                  <h1 className="font-bold text-[20px]">
                    ${event.packageId.price}.00
                  </h1>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <h1 className=" text-center font-semibold text-[25px] pb-3">
              Pay Your Registration Fees
            </h1>

            <div>
              <h1 className=" text-center">Our Bank Details</h1>
            </div>
            <div className="flex flex-col lg:flex-row  border rounded-lg p-2 mx-2 border-dashed border-[#2c5872]  ">
              <img src={et} className=" lg:w-[50%]" alt="" />
              <div className=" flex flex-col text-center w-full">
                <h1 className=" font-medium pb-3">Pay us on</h1>
                <div className=" flex justify-between items-center px-1">
                  <h1 className=" text-[14px] font-medium">Account Name :</h1>
                  <h1>Dental Strivers</h1>
                </div>
                <div className=" flex justify-between px-1">
                  <h1 className=" text-[14px] font-medium">Account :</h1>
                  <h1>dental@gmail.com</h1>
                </div>
              </div>
            </div>
            <div className="  flex gap-2 py-3 mx-auto w-full">
              <h1>or</h1>
              <div className=" w-[100px] bg-white rounded-lg p-1 shadow-lg cursor-pointer  ">
                <img src={sq} alt="" />
              </div>
            </div>
            <div>
              <h1 className=" text-center">Your Details</h1>
           
                <input
                  type="text"
                  name = "email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className=" my-3 outline-none border w-[80%] border-[#00000073] rounded p-2 "
                />
                <div className="capitalize ">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      required
                      className="custom-checkbox"
                      name="consultationFeePaid"
                    />
                    <p>i paid registration fee.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      required
                      className="custom-checkbox"
                      name="accountNumberProvided"
                    />
                    <p>
                      I have read and understand the features included in the
                      selected package.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      required
                      className="custom-checkbox"
                      name="contactInformationProvided"
                    />
                    <p>
                      i agreed with the{" "}
                      <Link to="/privacy-policy" className=" text-blue-500">
                        privacy policy.
                      </Link>{" "}
                    </p>
                  </div>
                </div>
                <div className=" mt-3 flex justify-end ">
                  <button type="submit" className=" bg-[#2c5872] text-white px-5 py-2 rounded-md">
                    Register
                  </button>
                </div>
            </div>
          </div>
        </div>
              </form>
      </div>
    </div>
  );
};

export default RegisterModal;
