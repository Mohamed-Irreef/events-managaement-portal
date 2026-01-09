import React from "react";
import aboutImg from "../assets/about.png";
import about2Img from "../assets/abt2.png";
import BulbImg from "../assets/bulb.png";
import bookImg  from "../assets/book.png";
import abtBanner from "../assets/abt-banner.png";

const About = () => {
  return (
   <>
       <div className="about-page w-full p-4 px-10">
      <h4 className="mt-12 text-3xl px-10 flex  gap-4 items-center font-medium"><p className="head">Edunex Management Portal</p> <img className="h-10 bulb" src={BulbImg} alt="" /></h4>

      <div className="flex w-full justify-center  items-center px-8">
        <div className="left1-content w-1/2 ">
          <p className="text-justify para">
            EduNex is an innovative e-learning platform designed to empower
            students and educators with seamless access to quality education.
            Our platform bridges the gap between learners and instructors by
            providing a structured learning environment where students can
            explore courses, track progress, and engage with interactive
            content. At EduNex, we believe that education should be accessible,
            engaging, and impactful. Instructors can effortlessly upload
            educational materials in various formats, while learners can access
            these resources, monitor their progress, and enhance their skills
            with a personalized learning path. Whether you're a student looking
            to upskill or an instructor aiming to share knowledge, EduNex offers
            a feature-rich, user-friendly experience tailored to your needs.
            Join us in revolutionizing education, making learning smarter, more
            interactive, and truly limitless.
          </p>
        </div>
        <div className="right1-img w-1/2 flex justify-center items-center">
          <img src={aboutImg} alt="" className="w-2/4 h-80 imgAnimation"/>
        </div>
      </div>

      <div className="flex w-full justify-center  items-center px-10 mt-20">

      <div className="right1-img w-1/2 flex justify-center mt-20 items-center">
          <img src={about2Img} alt="" className="w-2/4 h-80 imgAnimation"/>
        </div>

        <div className="left1-content w-1/2 ">
          <h4 className="text-2xl mb-8 font-medium">What We Offer <i className="ri-question-mark text-red-500"></i></h4>
          <ul className="flex flex-col gap-6">
            <li><b><i class="ri-arrow-right-fill"></i> Comprehensive Learning Paths:</b> Students can enroll in courses, view registered materials, and track their learning journey.</li>
            <li><b><i class="ri-arrow-right-fill"></i> Instructor Dashboard:</b> Educators can upload educational content in various formats, manage students, and analyze learning progress.</li>
            <li><b><i class="ri-arrow-right-fill"></i> Interactive Learning Experience:</b> Our platform supports videos, documents, quizzes, and assignments to make learning more engaging.</li>
            <li><b><i class="ri-arrow-right-fill"></i> Real-time Progress Tracking:</b> Students can monitor their learning progress, review completed materials, and receive performance insights.</li>
            <li><b><i class="ri-arrow-right-fill"></i> Community Engagement:</b> EduNex fosters collaboration through discussion forums, peer-to-peer learning, and interactive sessions.</li>
          </ul>
        </div>
        
      </div>

      <div className="w-full ">
        <div className=" mt-28 text-3xl ml-4 font-medium">Why Choose EduNex<i className="ri-question-mark text-green-500"></i></div>
        

        <div className="w-full flex gap-40 items-center">

        <div className="w-2/3 left1-content">
          <ul className="flex flex-col gap-4">
          <li><b>✅ User-Friendly Interface</b> – Designed for both students and instructors, ensuring smooth navigation.</li>
          <li><b>✅ Personalized Learning Paths</b> – Learners get tailored course recommendations based on their interests and progress.</li>
          <li><b>✅ Secure & Scalable</b> – EduNex ensures data privacy and scalability to support a growing learning community.</li>
          <li><b>✅ Multi-Format Support</b> – Upload and access PDFs, videos, presentations, and more.</li>
          <li><b>✅ Innovative & Adaptive</b> – Our platform continuously evolves to incorporate the latest advancements in education technology.</li>
          </ul> 
        </div>
        <div className="w-1/3">
          <img className="book " src={bookImg} alt="" />
        </div>

        </div>

      </div>

      <div className="flex w-full justify-center  items-center px-10 mt-20 mb-20">

    <div className="right1-img w-1/2 flex justify-center mt-2 items-center">
        <img src={abtBanner} alt="" className="w-3/4 h-80 imgAnimation"/>
      </div>

      <div className="left1-content w-1/2  ">
        <h4 className="text-2xl mb-8 font-medium">Join Us on Our Journey</h4>
        <div className="flex flex-col gap-6">
        <p>
        EduNex is more than just a learning platform—it's a community of passionate learners and educators working together to make education more accessible, interactive, and impactful. Whether you are a student looking to enhance your skills or an instructor aiming to share knowledge, EduNex is here to support your journey.
        </p>
        <b className="">📚 EduNex – Learn. Grow. Succeed. 🚀</b>
        </div>
      </div>
  
</div>

    </div>

<div className="py-4 flex justify-center items-center footer">
<p>🔗 EduNex © 2025. All Rights Reserved.</p>
</div>
   </>
  );
};

export default About;
