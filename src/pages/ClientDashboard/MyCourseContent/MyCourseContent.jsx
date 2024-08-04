import React, { useState, useEffect } from 'react';
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import WaterMark from './WaterMark'; // Import the WaterMark component
import './MyCourseContent.css';
import MobileNavbar from '../../../components/MobileNavbar/MobileNavbar';
import UserNavbar from '../../../components/UserNavbar/UserNavbar';
import { getContent } from '../../../store/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MyCourseContent = () => {
  const dispatch = useDispatch();
  const { courseId, packageId } = useParams();
  const { content } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const openModal = (pdfLink) => {
    setSelectedPdf(pdfLink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  useEffect(() => {
    dispatch(getContent({ courseId, packageId }));
  }, [dispatch, courseId, packageId]);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to hide the pop-out button
  const hidePopOutButton = () => {
    const iframe = document.querySelector('.video-wrapper iframe');
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDocument) {
        const style = document.createElement('style');
        style.innerHTML = `
          .ndfHFb-c4YZDc-LgbsSe-Bz112c {
            display: none !important;
            z-index: -1;
          }
        `;
        iframeDocument.head.appendChild(style);
      }
    }
  };

  useEffect(() => {
    const iframe = document.querySelector('.video-wrapper iframe');
    if (iframe) {
      iframe.onload = () => {
        setTimeout(hidePopOutButton, 500); // Delay to ensure iframe content is loaded
      };
    }
  }, []);

  return (
    <>
   
      <UserNavbar />
      <div className="flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] lg:h-[80vh] h-fit rounded-md">
        {screenSize > 786 ? <UserSidebar /> : <MobileNavbar />}
        <div className="main-content w-full p-7 h-full overflow-y-auto content-scrollbar">
          <h1 className="text-center text-[30px] font-bold">My Courses</h1>
          <div className="flex flex-col">
            {content && content.length > 0 ? (
              content.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <h1 className="py-2 px-3 text-[25px] font-semibold text-[#427590] border-b-2 border-[#427590]">
                    Week {item.weekNo}
                  </h1>
                  <div className="flex flex-col justify-start lg:ml-24">
                    <div className="p-5 my-4 flex flex-col gap-2 w-fit rounded-xl bg-gray-100">
                      <h1 className="text-[24px] font-medium text-center">Lecture No.{item.lectureNo}</h1>
                      <div className="flex flex-col">
                        <p className="font-medium text-[20px]">Topic :</p>
                        <p className="text-[18px]">{item.topic}</p>
                      </div>
                      {item.meetLink && (
                        <a
                          href={item.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Click to join class
                        </a>
                      )}
                      {item.pdfLink && (
                        <>
                          <button
                            onClick={() => openModal(item.pdfLink)}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                          >
                            View PDF
                          </button>
                        </>
                      )}
                      {item.mockLink && (
                        <a
                          href={item.mockLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Click to view recording
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No content available.</p>
            )}
             <div className="video-wrapper relative video-crop">
              <iframe
                src="https://drive.google.com/file/d/13cIoz3x88w23yR7od6liz6xGpChTQGRx/preview"
                width="100%"
                height="480"
                frameBorder="0"
                allowFullScreen
                className=' '
              ></iframe>
              <div className='watermark' >
                <p>Ahsan</p>
                <p>ahsan@gmail.com</p>

              </div>
              <div/>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      {isModalOpen && selectedPdf && (
        <div className="modal">
          <div className="modal-content h-[98vh]">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <WaterMark fileUrl={selectedPdf} />
          </div>
        </div>
      )}
    </>
  );
};

export default MyCourseContent;
