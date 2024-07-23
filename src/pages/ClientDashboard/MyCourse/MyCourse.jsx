import React from 'react'
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import './MyCourse.css'
import { Link } from 'react-router-dom';
import MobileNavbar from '../../../components/MobileNavbar/MobileNavbar';
import UserNavbar from '../../../components/UserNavbar/UserNavbar';


const MyCourse = () => {
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
    <UserNavbar/>
    <div className=' flex lg:w-[80%] w-full lg:mx-auto my-5 border border-[#00000023] h-[80vh] rounded-md'>
    {screenSize > 786 ? (
          <UserSidebar/>
      ) : <MobileNavbar/>}
    <div className='main-content w-full p-7'>
      <h1 className=' text-center text-[30px] font-bold'>My Courses</h1>
      <section class="health-products-c">
        <div class="product-grid-c">
          
          <div class="product-card-c w-[300px] ">
            <img
              src="https://acecourses.ca/images/1043.jpg"
              alt="Product 2"
            />
            <h2 className=' font-semibold'>US And Canadian Universities Bench Exam Preparation.</h2>
            <div className='my-6'>

            <Link to="/user/my-course/content" className='bg-gradient-to-r from-[#427590] to-[#427590bd] text-white py-2 px-10   rounded-md'>View</Link>
            </div>
           
          </div>
          {/* <div class="product-card-c flex flex-col w-[300px]">
            <div className=" flex-1">
            <img
              src="https://acecourses.ca/images/688.jpg"
              alt="Product 3"
            />
            </div>
            
            <div className=" flex-1">
            <h2 className=' font-semibold'>Objective Structured Clinical Examination (OSCE)</h2>
            <button className='bg-gradient-to-r from-[#325040] to-[#65bdb1] text-white py-2 px-10  my-6 rounded-md'>Register</button>
            </div>     
          </div> */}
          
        </div>
      </section>
    </div>
    </div>
    <Footer/>
    
    </>
  )
}

export default MyCourse;