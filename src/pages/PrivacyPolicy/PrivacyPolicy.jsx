import React from "react";
import "./PrivacyPolicy.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="privacy-body mt-9 pb-9">
      <div className="container mx-auto">
        <h1 className="hone font-bold text-[30px] py-5 ">Privacy Policy</h1>

        <h2 className="htwo">Data Security</h2>
        <p className="p">
          At Dental Strivers, we are deeply committed to safeguarding the
          privacy and security of our users. We understand the importance of
          protecting your personal information and take extensive measures to
          ensure it remains secure. All data transmitted between our users and
          our platform is encrypted using industry-standard protocols. Our
          encryption methods and security protocols are designed to protect your
          data from unauthorized access, disclosure, alteration, and
          destruction.
        </p>
        <p className="p">
          We continuously review and enhance our security practices to stay
          ahead of potential threats. Our platform is built with robust security
          features, including secure servers, firewalls, and advanced encryption
          technologies, to ensure that your information is always protected. We
          also implement strict access controls and monitoring procedures to
          safeguard your data.
        </p>
        <p className="p">
          In addition to these technical measures, we provide regular training
          to our employees on data privacy and security best practices. We are
          committed to maintaining the confidentiality and integrity of your
          personal information and ensuring that our security measures are
          aligned with the latest industry standards.
        </p>

        <h2 className="htwo">Material Sharing Policy</h2>
        <p className="p">
          At Dental Strivers, we provide our registered users with exclusive
          access to valuable content, including Zoom links for live sessions,
          PDFs of lectures, and recorded lecture links. This content is an
          integral part of our educational offerings and is intended solely for
          the personal use of registered users.
        </p>
        <p className="p">
          Unauthorized sharing, distribution, or recording of this material is
          strictly prohibited. Any user found to be sharing our content,
          including Zoom links, PDFs, or recorded lectures, or engaging in
          activities such as recording and leaking our sessions, will face
          immediate and stringent consequences.
        </p>
        <p className="p">
          Upon detection of such activities, the user's registration will be
          immediately canceled, and they will be permanently banned from
          re-registering on our website. We employ advanced monitoring
          techniques to detect and prevent unauthorized sharing and ensure
          compliance with our policies.
        </p>
        <p className="p">
          By registering on our platform, you agree to adhere to these policies
          and respect the integrity of our educational materials. We take these
          measures to protect the quality and value of our content and to ensure
          that all users can benefit from our resources in a secure and fair
          environment.
        </p>
      </div>{" "}

      </div>
      
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
