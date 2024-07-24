import React, { useState, useEffect } from 'react';
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import WaterMark from './WaterMark'; // Import the WaterMarkExample component
import './MyCourseContent.css';
import pdf from '../../../assets/ex.pdf';
import MobileNavbar from '../../../components/MobileNavbar/MobileNavbar';
import UserNavbar from '../../../components/UserNavbar/UserNavbar';

// Disable text selection and context menu (right-click)
const disableCopyPaste = {
  '*': {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  },
  canvas: {
    pointerEvents: 'none',
  },
};

const MyCourseContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] lg:h-[80vh] h-fit rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="main-content w-full p-7 h-full overflow-y-auto content-scrollbar">
          <h1 className="text-center text-[30px] font-bold">My Courses</h1>
          <div className="flex flex-col">
            <h1 className="py-2 px-3 text-[25px] font-semibold text-[#427590] border-b-2 border-[#427590]">
              Week 1
            </h1>
            <div className="flex flex-col justify-start lg:ml-24">
              <div className="p-5 my-4 flex flex-col gap-2 w-fit rounded-xl bg-gray-100">
                <h1 className="text-[24px] font-medium text-center">Lecture No.1</h1>
                <div className="flex flex-col">
                  <p className="font-medium text-[20px]">Topic :</p>
                  <p className="text-[18px]">Introduction of the Course</p>
                </div>
                <a
                  href="http://meet.google.com/hoj-dggp-czy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Click to join class
                </a>
              </div>
              <div className="p-5 my-4 flex flex-col gap-2 w-fit rounded-xl bg-gray-100">
                <h1 className="text-[24px] font-medium text-center"></h1>
                <div className="flex flex-col">
                  <p className="font-medium text-[20px]">Lecture 1 notes :</p>
                  <p className="text-[18px]"></p>
                </div>
                <button
                  onClick={openModal}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  View PDF
                </button>
              </div>
              <div className="p-5 my-4 flex flex-col gap-2 w-fit rounded-xl bg-gray-100">
                <h1 className="text-[24px] font-medium text-center">
                  Lecture No.1 Recording
                </h1>
                <div className="flex flex-col">
                  <p className="font-medium text-[20px]">Topic :</p>
                  <p className="text-[18px]">Introduction of the Course</p>
                </div>
                <a
                  href="http://meet.google.com/hoj-dggp-czy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Click to view recording
                </a>
              </div>
              <div>
                <iframe
                  src="https://zoom.us/clips/embed/DrUCalh8JC1PjeRxFqFB3zZ2BJBTiWKG_S55ebCjT4DZvIqvSNnjBpfgH9I8IBskdQrQRw.xPwx_5h0hsyg7MBk"
                  width="560"
                  height="315"
                  title="Lecture Recording"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content h-[98vh]">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <WaterMark fileUrl={pdf}  />
          </div>
        </div>
      )}
    </>
  );
};

export default MyCourseContent;
