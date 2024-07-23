import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='top-footer'>
        <div className='left-footer'>
          <h1 className="text-white font-semibold text-[25px]">Dental Strivers</h1>
        </div>
        <div className='right-footer'>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
     
      <div className='bottom-footer'>
      <p>
          Disclaimer: Dental Strivers Inc. is not affiliated, associated, authorized, endorsed, sponsored, supported or funded in any way by the National Dental Examining Board of Canada (NDEB). Test names and other trademarks such as “NDEB”, “BNED”, logos or design of the NDEB are the property of the NDEB and not trademarks of Dental Strivers Inc.
      <p className='text-white'>Copyright ©dentalstrivers 2024</p>
        </p>
      </div>
      {/* <div className='bottom-footer '>
      </div> */}
      
    </div>
  )
}

export default Footer
