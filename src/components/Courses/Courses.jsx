import React from 'react'
import './Courses.css'
import { Link } from 'react-router-dom'

const Courses = () => {
  return (
    <section className="pt-16 bg-gray-100">
    <div className="max-w-7xl mx-auto text-center ">
      <div className=" flex flex-col items-center justify-center gap-3"> 

      <h2 className="text-4xl font-bold">Our Courses</h2>
      <p className=" bg-[#508a7e] text-[#508a7e] w-20 h-1 text-center"></p>
      </div>
    </div>
    <div className=" flex flex-col justify-center items-center">
      <section class="health-products-b">
        <div class="product-grid-b">
          
          <div class="product-card-b w-[350px] ">
            <img
              src="https://acecourses.ca/images/1043.jpg"
              alt="Product 2"
            />
            <h2 className=' font-semibold'>AFK (Assessment of Fundamental Knowledge)            </h2>
            <div className=' my-6'>

            <Link to="/course-details" className='bg-gradient-to-r from-[#34647e] to-[#7fa8be] text-white py-2 px-10  my-6 rounded-md'>Explore Now</Link>
            </div>
           
          </div>
          {/* <div class="product-card-b flex flex-col w-[350px]">
            <div className=" flex-1">
            <img
              src="https://acecourses.ca/images/688.jpg"
              alt="Product 3"
            />
            </div>
            
            <div className=" flex-1">
            <h2 className=' font-semibold'>Coming soon</h2>
            <Link className='bg-gradient-to-r from-[#34647e] to-[#7fa8be] text-white py-2 px-10  my-6 rounded-md'>Explore Now</Link>
            </div>     
          </div> */}
          
        </div>
      </section>
    </div>
  </section>
  )
}

export default Courses