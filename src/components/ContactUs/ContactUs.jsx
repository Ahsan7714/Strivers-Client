import React from 'react'

const ContactUs = () => {
  return (
    <div className="">
    <div className="bg-gray-100 flex justify-center mt-10 lg:mt-0" id="contact-us">
      <div className="flex lg:flex-row flex-col bg-white shadow-xl rounded-lg lg:w-[45%] w-[95%]   lg:my-20 ">
        <div className=" ">
          <form className="flex flex-col px-8 gap-8 py-5">
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
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[100%]"
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
                type="text"
                name="email"
                id="email"
                required
                placeholder="Your Email"
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[100%]"
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
                className=" outline-none border-b-2 border-[#00000046]  py-2 w-[100%]"
              ></textarea>
            </div>

            <div>
              <button className="bg-[#a0b36d] font-semibold text-white h-[50px] w-[160px] rounded-md shadow-lg font-poppins">
                Send Message
              </button>
            </div>
          </form>
        </div>
    </div>
  </div>
</div>

  )
}

export default ContactUs