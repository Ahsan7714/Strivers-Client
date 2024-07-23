import React from 'react'
import "./WhyChooseUs.css"

const WhyChooseUs = () => {
  return (
    <section className="pt-16 bg-gray-100">
    <div className="max-w-7xl mx-auto text-center ">
      <div className=" flex flex-col items-center justify-center gap-3">
        <h2 className="text-4xl font-bold">Why Choose Dental Strivers?</h2>
        <p className=" bg-[#508a7e] text-[#508a7e] w-20 h-1 text-center"></p>
      </div>
    </div>
    <div className=" flex flex-col justify-center items-center">
      <section class="health-products-a">
        <div class="product-grid-a">
          <div class="product-card-a">
            <img
              src="https://images.pexels.com/photos/669228/pexels-photo-669228.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Product 2"
            />
            <h2>5-Month Comprehensive Course</h2>
            <p>A structured program to cover all essential topics.</p>
          </div>
          <div class="product-card-a">
            <img
              src="data:image/jpeg;base64,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"
              alt="Product 1"
            />
            <h2>Live Zoom Sessions</h2>
            <p> Interactive sessions with experienced instructors.</p>
          </div>
          <div class="product-card-a flex flex-col">
            <div className=" flex-1">
              <img
                src="https://media.istockphoto.com/id/1165702596/photo/pdf.jpg?b=1&s=612x612&w=0&k=20&c=dnf26xU4iuVsIURQngliQrDMG45SuFzkngUgQW0ABMc="
                alt="Product 3"
              />
            </div>

            <div className=" flex-1">
              <h2>Detailed PDF Notes</h2>
              <p>High-quality notes from live Zoom sessions.</p>
            </div>
          </div>
          <div class="product-card-a">
            <img
              src="https://images.pexels.com/photos/6929185/pexels-photo-6929185.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Product 4"
            />
            <h2>Expert Tutor Guidance</h2>
            <p>Benefit from the wisdom of seasoned tutors.</p>
          </div>
        </div>
      </section>
    </div>
  </section>
  )
}

export default WhyChooseUs