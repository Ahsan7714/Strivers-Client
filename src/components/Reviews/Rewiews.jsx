import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import "./Reviews.css";
const reviews = [
    {
      "id": 1,
      "comment": "The course exceeded my expectations with comprehensive material and engaging instruction.",
      "rating": 5,
      "description": "Student",
      "user": {
        "id": 1,
        "name": "John Doe",
        "image": "https://example.com/avatar.jpg"
      }
    },
    {
      "id": 2,
      "comment": "I found the course incredibly insightful and well-organized. Highly recommend it!",
      "rating": 5,
      "description": "Student",
      "user": {
        "id": 2,
        "name": "Jane Smith",
        "image": "https://example.com/avatar2.jpg"
      }
    },
    {
      "id": 5,
      "comment": "The course content was thorough and the instructor was excellent. A fantastic experience.",
      "rating": 5,
      "description": "Student",
      "user": {
        "id": 3,
        "name": "Bob Johnson",
        "image": "https://example.com/avatar3.jpg"
      }
    }
  ];
  


const Rewiews = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
      const colors = ['#E5F1FF', '#FFFBE5', '#F4E5FF'];
  return (
    <div className=" py-14">
      <div className=" flex flex-col items-center justify-center gap-3">
        <h2 className="text-4xl font-bold text-center px-4">What our students says?</h2>
        <p className=" bg-[#508a7e] text-[#508a7e] w-20 h-1 text-center"></p>
      </div>
      <div className=' py-8 mx-auto ml-5'>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        containerClass="carousel-container"
      >
        {reviews && reviews.length > 0 ? reviews.map((card, index) => (
          <div
            className='carousel-item slide_1'
            key={card.id}
            style={{ background: colors[index % colors.length] }}
          >
            {/* <div className='comma-img'><img src={commaimg1} alt="" /></div> */}
            <div className='reviewCard-1'>
              <p>{card.comment}</p>
            </div>
            <div className='reviewCard-2'>
              <div className='reviewCardA-2'>
                <div className='reviewCardA-2-img'>
                  {/* <img src={card.user.image || image1} alt={card.user.name} className=' rounded-full h-[60px] w-[60px] object-cover' /> */}
                </div>
                <div className='reviewCardA-2-name'>
                  <h3>{card.user.name}</h3>
                  <span>{card.description}</span>
                  <div className='stars'>
                  <ReactStars
                      count={5}
                      value={card.rating}
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div>No Reviews Found</div>
        )}
      </Carousel>

      </div>
    </div>
  );
};

export default Rewiews;
