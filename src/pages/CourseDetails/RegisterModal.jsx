/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import et from "../../assets/et.png";
import { Link, useParams } from "react-router-dom";
import "./CourseDetails.css";
import sq from "../../assets/sqaure.png";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCourse,
  clearState,
  getCourse,
} from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import Loader from "../../components/Spinner/Loader";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import axios from "axios";
import baseurl from "../../store/baseurl";

const RegisterModal = ({ isOpen, onClose, event, course, selectedMocks }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, isRequestSubmitted } = useSelector(
    (state) => state.user
  );
  const [inputLoading, setInputLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    courseId: "",
    packageId: "",
    paidThrough: "e-transfer",
    cardNumber: "",
    pricePaid: "",
    mocksPurchased: "",
  });
  const [activeAccordion, setActiveAccordion] = useState("e-transfer");

  useEffect(() => {
    if (isOpen) {
      setInputLoading(true);
      setTimeout(() => {
        setInputLoading(false);
      }, 1000); // Adjust the timeout as needed
    }
  }, [isOpen]);

  useEffect(() => {
    if (isRequestSubmitted) {
      dispatch(getCourse(id));
      toast.success("Request Submitted Successfully");
      onClose();
      dispatch(clearState());
    }
    if (error) {
      dispatch(getCourse(id));
      toast.error("You have already requested for this course");
      dispatch(clearState());
    }
  }, [isRequestSubmitted, error, dispatch, onClose, id]);

  if (!isOpen || !event || !course) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, paidThrough, cardNumber } = formData;
    const pricePaid =
      event.packageId.packageType === "mock"
        ? selectedMocks.mockPrice
        : event.packageId.price;

    const courseRequestData = {
      email,
      courseId: course.id,
      packageId: event.packageId.id,
      mocksPurchased: selectedMocks.mockCount,
      paidThrough,
      cardNumber,
      pricePaid,
    };
    console.log(courseRequestData);

    dispatch(requestCourse(courseRequestData));
  };

  const handleSquareImageClick = () => {
    setActiveAccordion("square");
    setFormData((prevData) => ({
      ...prevData,
      paidThrough: "square",
    }));
  };

  const handleETransferClick = () => {
    setActiveAccordion("e-transfer");
    setFormData((prevData) => ({
      ...prevData,
      paidThrough: "e-transfer",
    }));
  };

  const handleCardTokenizeResponse = async (token) => {
    const { email } = formData;
    const pricePaid =
      event.packageId.packageType === "mock"
        ? selectedMocks.mockPrice
        : event.packageId.price;

    console.log(selectedMocks.mockCount);

    alert("asd");

    try {
      const response = await axios.post(`${baseurl}/create-checkout-session`, {
        nonce: token.token,
        amount: pricePaid,
      });

      if (response.data.statusCode === 200) {
        const courseRequestData = {
          receiptLink: response.data.result.payment.receiptUrl,
          courseId: course.id,
          packageId: event.packageId.id,
          mocksPurchased: selectedMocks.mockCount,
          paidThrough: "square",
          cardNumber: token.token,
          pricePaid,
        };

        dispatch(requestCourse(courseRequestData));
        toast.success("Payment Successful and Request Submitted");
        onClose();
        dispatch(clearState());
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment Failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md lg:w-[80%] lg:h-fit h-[95vh] overflow-y-auto shadow-lg">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] font-semibold">Dental Strivers</h2>
            <button onClick={onClose}>
              <IoMdClose className="text-[30px]" />
            </button>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 flex flex-col lg:pt-10">
              {/* Course and Package Details */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h1 className="text-[20px]">Course :</h1>
                  <h1 className="font-medium">{course.title}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-[20px]">Package :</h1>
                  <h1 className="font-medium">{event.packageId.packageName}</h1>
                </div>
                {/* Features or Mocks */}
                {event.packageId.packageType === "fullCourse" ? (
                  <div className="flex flex-col gap-1 text-[#000000e6]">
                    <h1 className="text-[20px] font-medium">Features :</h1>
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
              {event.packageId.packageType === "mock" ? (
                <div className="flex flex-col gap-2">
                  <h1 className="text-[20px] font-medium">Selected Mocks</h1>
                  <div className="flex justify-between">
                    <h1 className="text-[20px]">Quantity:</h1>
                    <h1 className="font-medium">{selectedMocks.mockCount}</h1>
                  </div>
                  <div className="flex justify-between py-3 mt-2 border-t border-[#00000066]">
                    <h1 className="text-[20px]">Price:</h1>
                    <h1 className="font-bold text-[20px]">
                      ${selectedMocks.mockPrice}.00
                    </h1>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[#00000066]">
                    <h1 className="text-[20px] font-medium">Total:</h1>
                    <h1 className="font-bold text-[20px]">
                    ${selectedMocks.mockPrice + (selectedMocks.mockPrice * 0.15)}
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
  ${event.packageId.price + (event.packageId.price * 0.15)}
</h1>

                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <h1 className="text-center font-semibold text-[25px] pb-3">
                Pay Your Registration Fees
              </h1>
              <div>
                <div className="flex gap-5 py-3 mx-auto justify-center w-full items-center">
                  <button
                    className={`bg-[#2c5872] text-white px-5 py-2 rounded-md ${
                      activeAccordion === "e-transfer" ? "bg-[#1a3a53]" : ""
                    }`}
                    onClick={handleETransferClick}
                  >
                    E-Transfer
                  </button>
                  <button
                    className={`bg-[#2c5872] text-white px-5 py-2 rounded-md ${
                      activeAccordion === "square" ? "bg-[#1a3a53]" : ""
                    }`}
                    onClick={handleSquareImageClick}
                  >
                    Square
                  </button>
                </div>
                {activeAccordion === "e-transfer" && (
                  <div>
                    <div>
                      <h1 className="text-center">Our Bank Details</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row border rounded-lg p-2 mx-2 border-dashed border-[#2c5872]">
                      <img src={et} className="lg:w-[50%]" alt="" />
                      <div className="flex flex-col text-center w-full">
                        <h1 className="font-medium pb-3">Pay us on</h1>
                        <div className="flex justify-between items-center px-1">
                          <h1 className="text-[14px] font-medium">
                            Account Name :
                          </h1>
                          <h1>Dental Strivers</h1>
                        </div>
                        <div className="flex justify-between px-1">
                          <h1 className="text-[14px] font-medium">Account :</h1>
                          <h1>dental@gmail.com</h1>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-center">Your Details</h1>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="my-3 outline-none border w-[80%] border-[#00000073] rounded p-2"
                      />
                    </div>
                    <div className="capitalize">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          required
                          className="custom-checkbox"
                          name="consultationFeePaid"
                        />
                        <p>I paid registration fee.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          required
                          className="custom-checkbox"
                          name="accountNumberProvided"
                        />
                        <p>
                          I have read and understand the features included in
                          the selected package.
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
                          I agree with the{" "}
                          <Link to="/privacy-policy" className="text-blue-500">
                            privacy policy.
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-[#2c5872] text-white px-5 py-2 rounded-md"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                )}
                {activeAccordion === "square" && (
                  <div className="flex flex-col items-center mt-4">
                    <PaymentForm
                      applicationId="sandbox-sq0idb-XGlf2XRT6XhCZMXif5qlmQ"
                      cardTokenizeResponseReceived={handleCardTokenizeResponse}
                      locationId="LATG7YN8W4CTT"
                    >
                      {inputLoading ? (
                        <Loader />
                      ) : (
                        <CreditCard
                          buttonProps={{
                            css: {
                              backgroundColor: "#771520",
                              fontSize: "14px",
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "#530f16",
                              },
                            },
                          }}
                        />
                      )}
                    </PaymentForm>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
