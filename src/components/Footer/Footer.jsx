import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='top-footer'>
            <div className='left-footer'>
              <h1 className=" text-white font-semibold text-[25px]">Dental Strivers</h1>
            </div>
             <div className='right-footer'>
               <ul>
                 <li><Link to="/about-us">About US</Link></li>
                 <li><Link to="/">Contact Us</Link></li>
                 <li><Link to="/privacy-policy">Privacy Policy</Link></li>
               </ul>
             </div>
      </div>
      <div className='bottom-footer '>
              <p className=' text-white'>Copyright ©dentalstrivers 2024</p>
      </div>
    </div>
  )
}

export default Footer