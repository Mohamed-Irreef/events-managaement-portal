import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = ({roleAuthorized,authorized, userId}) => {
  const [username, setUsername] = useState('');
  const [role,setRole] = useState('');
  useEffect(()=>{
    axios.defaults.withCredentials=true;
    axios.get(`http://localhost:8000/api/auth/getSingleUser/${userId}`,{withCredentials:true})
    .then((res)=>{
      console.log("User: ", res.data.user.username);
      setUsername(res.data.user.username);
      setRole(res.data.user.role);
    })
    .catch((err)=>{
      console.log("Username Error: ",err);
    })
  },[roleAuthorized])  
  return (
    <div className='homepage'>
      <div className="banner">
        {
          authorized? <>
              {role==="superadmin" && <div className="panel mt-4 text-2xl text-center font-medium  ">Super Admin Panel 👮🏽</div>}
              {role==="admin" && <div className="panel mt-4 text-2xl text-center font-medium ">Admin Panel 👩🏻‍💼</div>}
              {role==="student" && <div className="panel mt-4 text-2xl text-center font-medium">Student Panel 👩🏻‍🎓</div>}
              <div className='text-center mt-8 text-2xl'>Hi {username} <span className='hi'>👋</span>, Welcome to EduNex Platform – Unlock Limitless Opportunities!</div>
          </> :
          <>  
            <h2 className='home-welcome mt-4'>Empowering Education for a Smarter Tomorrow</h2>
            <p className='text-center italic'>“Manage, Learn, and Grow – Your One-Stop Educational Hub”</p>
          </>
        }
          
          
          
          
          <div className='actions w-full flex justify-center mt-20 '>
              <button className='py-2 px-4 bg-blue-600 font-medium rounded-lg hover:bg-blue-700 hover:scale-95 transition-all duration-300 mr-4'>🔍 Browse Events</button>
              <button className='py-2 px-4 bg-blue-600 font-medium rounded-lg hover:bg-blue-700 hover:scale-95 transition-all duration-300 mr-4'>📝 Apply Now</button>
              <button className='py-2 px-4 bg-blue-600 font-medium rounded-lg hover:bg-blue-700 hover:scale-95 transition-all duration-300 mr-4'>📢 Post an Event</button>
          </div>
          <div className='banner-content  w-4/5 right-0 left-0 m-auto mt-10'>
          <p className='text-center w-full'>Discover and apply for top educational events across India with ease. Our platform connects students to career-boosting opportunities while empowering admins and super admins to manage and post events seamlessly.</p>
          <p className='italic font-medium'>“Opportunities don’t happen, you create them!” 🚀</p>
          </div>
          

      </div>
    </div>
  )
}

export default Home