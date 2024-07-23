import React, { useState } from 'react';
import './FAQs.css';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    "What is NDEB exam, and why is it important for aspiring dentists in Canada?",
    "Can I take the entire course from outside Canada?",
    "Do we get recordings of the sessions?",
  ];

  const answers = [
    "The NDEB (National Dental Examining Board of Canada) exam is a crucial licensing examination for dentists aspiring to practice in Canada. It assesses the competence of dentists in various areas of dental practice to ensure they meet the standards required for safe and effective patient care.",
    "Yes absolutely! All theory courses run virtually for the entire duration including mocks, except the clinical preparation courses that are entirely run in person at our Mississauga and Surrey centres.",
    "Yes! We understand the professional and personal commitments of the ITDs and in order to increase the flexibility in learning schedules, all theory sessions are recorded and can be accessed on the online platform for a set number of weeks, depending on the course.",
  ];

  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className='text-black'>
      <div className='bg-[#34647e] text-white mb-10 p-12'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-[35px]'>Have questions?</h1>
          <p className='text-[22px]'>Visit our FAQ section for quick answers to your questions.</p>
        </div>
      </div>

      <div className="accordion">
        {questions.map((question, index) => (
          <div key={index} className="accordion-item">
            <button className="accordion-question flex justify-between" onClick={() => handleClick(index)}>
              {question}
              {openIndex === index ? <IoIosArrowUp className="arrow-icon" /> : <IoIosArrowDown className="arrow-icon" />}
            </button>
            <div className={`accordion-answer ${openIndex === index ? 'open' : ''}`}>
              {answers[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
