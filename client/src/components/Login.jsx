import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setAuthorized}) => {

   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState('student');
    const navigate = useNavigate();
    const [ok,setOk] =useState(false);
    useEffect(()=>{
        setAuthorized(true)
      },[ok]);

    function addUserHandler(e) {
        e.preventDefault();
        const user ={
            email,
            password,
            role
        }

        axios.post('http://localhost:8000/api/auth/login',user,{withCredentials:true})
        .then((res)=>{
            setOk(true);
            navigate('/')
            // console.log('Response: ', res.data)
        })
        .catch((err)=>{
            confirm(`${err.response.data.message}`);
            // console.log('Error: ', err.response.data.message);
        })

        console.log('user: ',user);

    }

  return (
    <div className="addpopup-page" onSubmit={addUserHandler}>
       
            <form action="" className='AddPopup-container rounded-md'>
                <h4 className='text-center mb-4 mt-2 text-xl text-white font-medium'>Login</h4>
                
                <div className="input-box mb-2">
                    <label htmlFor="email" className='mb-2'>Email <span className='text-red-600'>*</span></label>
                    <input type="email" name='email' id='email' className='h-8 px-2 py-1 rounded-sm' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="input-box">
                    <label htmlFor="password" className='mb-2'>Password <span className='text-red-600'>*</span></label>
                    <input type="password" name='password' id='password' className='h-8 px-2 py-1 rounded-sm' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="flex gap-6 mt-4">
                    <label htmlFor="role" style={{color:'white'}}>Role <span className='text-red-600'>*</span></label>
                    <select name="role" id="role" onChange={(e)=>setRole(e.target.value)}>
                        {/* <option value="superadmin">Super Admin</option> */}
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <div className="form-button w-full mt-5">
                    <button type='submit' className='w-full border-2 px-2 py-1 mb-2'>Login</button>
                </div>

                <div className='login-info'>
                    <p className='text-sm text-white font-thin'>Don't Have an account ? <Link to='/help' className='text-blue-400'>Help</Link></p>
                    <p className='text-sm text-white font-thin'>Are you facing any issues in Login? <Link to='/help' className='text-blue-400'>Help</Link></p>
                </div>
            </form>
    
    </div>
  )
}

export default Login