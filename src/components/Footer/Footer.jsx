import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="left-footer">
          <h1 className="text-white font-semibold text-[25px]">
            Dental Strivers
          </h1>
        </div>
        <div className="right-footer">
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" text-gray-100 py-2 px-3 border-[#2c5872] border-t bg-[#427590]">
      <p>
          Disclaimer: Dental Strivers Inc. is not affiliated, associated,
          authorized, endorsed, sponsored, supported or funded in any way by the
          National Dental Examining Board of Canada (NDEB). Test names and other
          trademarks such as “NDEB”, “BNED”, logos or design of the NDEB are the
          property of the NDEB and not trademarks of Dental Strivers Inc.
         
        </p>
      </div>

      <div className="bottom-footer">
      
        <p className="text-white">
            Copyright © 2024. Dental Strivers. All Rights Reserved.
          </p>
      </div>
      {/* <div className='bottom-footer '>
      </div> */}
    </div>
  );
};

export default Footer;
