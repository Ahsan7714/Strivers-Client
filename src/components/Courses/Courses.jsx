import React from 'react'
import './Courses.css'

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
            <h2 className=' font-semibold'>US And Canadian Universities Bench Exam Preparation.</h2>
            <button className='bg-gradient-to-r from-[#325040] to-[#65bdb1] text-white py-2 px-10  my-6 rounded-md'>Register</button>
           
          </div>
          <div class="product-card-b flex flex-col w-[350px]">
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
          </div>
          
        </div>
      </section>
    </div>
  </section>
  )
}

export default Courses