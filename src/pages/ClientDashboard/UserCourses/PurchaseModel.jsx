import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../../assets/bank1.png";
import stripe from "../../../assets/stripe.png";
import { Link } from "react-router-dom";
import "./PurchaseModel.css";
const PurchaseModel = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;
  const [isOutsideCanada, setIsOutsideCanada] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    bank: "",
    accountNo: "",
    phoneNo: "",
    time: "",
    package: "Premium",
    course : "",
  });
  const handleSubmit = (e) => {
    const { name, bank, accountNo, phoneNo, time } = formData;
    if (!name || !bank || !accountNo || !phoneNo || !time) {
      toast.error("Please fill in all the required fields.");
    }
    e.preventDefault();
    console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsOutsideCanada(!isOutsideCanada);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white py-6 rounded-md lg:w-[800px] w-[97%] lg:h-fit h-[90vh] overflow-y-auto shadow-lg">
        <div className=" relative">
          <IoCloseOutline
            className="text-[25px] cursor-pointer absolute top-2 right-2 lg:right-5 lg:top-0"
            onClick={onClose}
          />
        </div>
        <div className="flex items-center justify-center gap-3 text-center w-full mx-auto">
        <p className="text center font-bold py-2">
  You will be registered for the course within 24 hours after payment confirmation.
</p>

        </div>

        <div className=" bg-[#e9f7ef] flex justify-center items-center p-2 text-[17px] font-semibold">
        <h1>
  {!isOutsideCanada
    ? `Pay $${formData.package === "Basic" ? event.intbasic : formData.package === "Standard" ? event.intinter : formData.package === "Premium" ? event.intadvance : event.locfees} to register in this course`
    : `Pay $${formData.package === "Basic" ? event.locbasic : formData.package === "Standard" ? event.locinter : formData.package === "Premium" ? event.locadvance : event.intfees} to register in this course`}
</h1>

        </div>
        {/* section 2 */}
        <div className="flex lg:flex-row flex-col  justify-center items-center gap-6 py-4 lg:py-2">
          <div className="flex flex-col justify-center items-center text-[12px]">
            <p className="text-[#3eba6f] font-semibold">Our Bank Details</p>
            <div className=" bg-[#e9f7ef] rounded-3xl p-6 border-2  border-dashed border-[#3eba6f67]">
                {isOutsideCanada ? (
                    <img src={logo} alt="" className="w-[150px] h-[60px]" />
                ) : (
                    <img src={stripe} alt="" className="w-[150px] h-[60px]" />
                )}
              
            </div>
          </div>
          <div className="flex flex-col justify-start  text-[12px] ">
            <p className="text-[#3eba6f] pl-5 font-semibold">Send Us On</p>
            <div className=" bg-[#e9f7ef]  rounded-3xl p-4 border-2  border-dashed border-[#3eba6f67]">
              <div className="flex gap-4">
                <div>
                  <div className=" flex justify-between">
                    <div className="flex flex-col text-[15px]">
                      <p>Title</p>
                      <p>Account</p>
                    </div>
                    <div className="flex flex-col font-semibold text-[15px]">
                      <p>Dental Strivers</p>
                      <p>{isOutsideCanada ? "2239226" : "2239227"}</p>
                    </div>
                  </div>
                  <span className=" flex text-[15px] gap-2 pt-1">
                    <p>IBN</p>
                    <p className=" text-[15px]">
                      {isOutsideCanada
                        ? "PK33JSBL9181000002239266"
                        : "PK33JSBL9181000002239267"}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section 3 */}
        <form onSubmit={handleSubmit}>
          <div className="py-3">
            <p className="text-center text-[#38ce74]">Provide Information</p>
            <div className="bg-[#e9f7ef] flex flex-col gap-2 justify-center items-center border-2 border-dashed border-[#3eba6f67] py-4 lg:py-2 px-20 lg:px-5">
              <div className="consult-inputs flex gap-4 flex-col lg:flex-row">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-[#0000002c] outline-none"
                />
                <Select
                  name="bank"
                  onChange={handleChange}
                  value={formData.bank || "Select bank"}
                  className="text-black h-[33px] w-[200px] text-[10px] border-none rounded-2xl outline-none"
                >
                  <MenuItem value="Select bank" disabled>
                    Select Bank
                  </MenuItem>
                  <MenuItem value="easypaisa">
                    <img alt="" />
                  </MenuItem>
                  <MenuItem
                    value="Jazz cash"
                    className="text-[10px] font-semibold"
                  >
                    <div className=" flex gap-2">
                      <img alt="" />
                      <p>Stripe</p>
                    </div>
                  </MenuItem>

                  <MenuItem
                    value="bank"
                    className="text-[10px] flex gap-2 font-semibold"
                  >
                    <div className=" flex gap-2">
                      <img alt="" />
                      <p>Bank Account</p>
                    </div>
                  </MenuItem>
                </Select>
                <input
                  type="text"
                  placeholder="Enter Your Account No."
                  name="accountNo"
                  value={formData.accountNo}
                  onChange={handleChange}
                  required
                  className="border border-[#0000002c] outline-none"
                />
              </div>
              <div className="consult-inputs-1 flex gap-4 flex-col lg:flex-row">
                <p className="text-[20px] lg:w-[170px] lg:pl-4 ">Course Details</p>
                <Select
  name="course"
  onChange={handleChange}
  value={event.title || "Select Package"}
  className="text-black h-[33px] w-[200px] text-[10px] border-none rounded-2xl outline-none"
>
  <MenuItem value="Select Package" disabled>
    Select Package
  </MenuItem>
  <MenuItem value="Objective Structured Clinical Examination (OSCE)">
    Objective Structured Clinical Examination (OSCE)
  </MenuItem>
</Select>

                <Select
                  name="package"
                  onChange={handleChange}
                  value={formData.package || "Select Package"}
                  className="text-black h-[33px] w-[200px] text-[10px] border-none rounded-2xl outline-none"
                >
                  <MenuItem value="Select bank" disabled>
                  Select Package
                  </MenuItem>
                  <MenuItem
                    value="Basic"
                    className="text-[10px] font-semibold"
                  >
                    <div className=" flex gap-2">

                      <p>Basic</p>
                    </div>
                  </MenuItem>

                  <MenuItem
                    value="Standard"
                    className="text-[10px] flex gap-2 font-semibold"
                  >
                    <div className=" flex gap-2">
                      <p>Standard</p>
                    </div>
                  </MenuItem>
                  <MenuItem
                    value="Premium"
                    className="text-[10px] flex gap-2 font-semibold"
                  >
                    <div className=" flex gap-2">
                      <p>Premium</p>
                    </div>
                  </MenuItem>
                </Select>
              </div>
            </div>
          </div>

          <div className="capitalize pl-16">
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
              <p>I have read and understand the features included in the selected package.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                required
                className="custom-checkbox"
                name="contactInformationProvided"
              />
              <p>i agreed with the <Link to="/privacy-policy" className=" text-blue-500">privacy policy.</Link> </p>
            </div>
          </div>

          <div className="flex justify-center items-center py-3">
            <button
              className="bg-[red] text-white px-4 py-2 rounded-xl"
              type="submit"
            >
                Submit
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="cursor-pointer text-blue-500" onClick={handleToggle}>
            {isOutsideCanada
              ? "I am an international Student outside of Canada"
              : "I am a Canadian Student"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModel;
