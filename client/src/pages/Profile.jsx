import React, { useEffect, useState } from 'react'
import student from "../assets/studentImg.jpg"
import admin from "../assets/admin.png"
import superadmin from "../assets/superadmin.png"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Profile = ({userId}) => {
  const id= userId;
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [role, setRole] = useState('');
  
  useEffect(()=>{
    axios.defaults.withCredentials=true;
    axios.get(`http://localhost:8000/api/auth/getSingleUser/${id}`,{withCredentials:true})
    .then((res)=>{
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setRole(res.data.user.role);
    })
    .catch((err)=>{

    })
  },[userId])
  return (
    <div className='profile-card '>
      {role === 'superadmin' && <h4 className='text-xl text-center font-medium mb-4'>Super Admin</h4>}
      {role === 'admin' && <h4 className='text-xl text-center font-medium mb-4'>Admin</h4>}
      {role === 'student' && <h4 className='text-xl text-center font-medium mb-4'>Student</h4>}

      <div className="profile mb-4">
      {role === 'superadmin' && <img src={superadmin} alt="" />}
      {role === 'admin' && <img src={admin} alt="" />}
      {role === 'student' && <img src={student} alt="" />}
        
      </div>
      <div className="text-center">
        <p>{username}</p>
        <p>{email}</p>
      </div>

      <div className=" rounded-mdw-full flex justify-center mt-4 mb-6">
        {(role==="admin" || role==="superadmin") && <Link to={`/view-post/${id}`}><button className=' h-9 bg-blue-600 px-2 py-1 w-60 rounded-md  hover:bg-blue-700 hover:scale-95 transition-all duration-300'>View History</button></Link>
      }
      </div>
    </div>
  )
}

export default Profile