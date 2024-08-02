import React, { useEffect, useState } from 'react';
import { contactUs, clearState } from '../../store/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const dispatch = useDispatch();
  const { error, loading, isContactUsSubmitted } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (isContactUsSubmitted) {
      // Clear form data if submission was successful
      toast.success("Contact Us Submitted Successfully")
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      dispatch(clearState());
    }
  }, [isContactUsSubmitted, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactUs(formData));
  };

  return (
    <div className="">
      <div className="bg-gray-100 flex justify-center mt-10 lg:mt-0" id="contact-us">
        <div className="flex lg:flex-row flex-col bg-white shadow-xl rounded-lg lg:w-[45%] w-[95%] lg:my-20">
          <div className="">
            <form className="flex flex-col px-8 gap-8 py-5" onSubmit={handleSubmit}>
              <div>
                <h1 className="text-[35px] text-[#10275b] font-bold py-4">
                  Contact us
                </h1>
                <p className="text-[18px] pb-3">
                  We're open for any suggestion or just to have a chat
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-[15px] text-[#80808096]"
                >
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your name"
                  className="outline-none border-b-2 border-[#00000046] py-2 w-[100%]"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[15px] text-[#80808096]"
                >
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Your Email"
                  className="outline-none border-b-2 border-[#00000046] py-2 w-[100%]"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-[15px] text-[#80808096]"
                >
                  Message*
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  cols="10"
                  rows="3"
                  placeholder="Enter your message"
                  className="outline-none border-b-2 border-[#00000046] py-2 w-[100%]"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#a0b36d] font-semibold text-white h-[50px] w-[160px] rounded-md shadow-lg font-poppins"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {/* {error && <p className="text-red-500">{error}</p>} */}
              {/* {isContactUsSubmitted && <p className="text-green-500">Message sent successfully!</p>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
