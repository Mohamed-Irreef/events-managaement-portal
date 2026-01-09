import React, { useState } from 'react'
import { use } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const AddUsers = ({roleAuthorized}) => {

    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState('student');
    const navigate = useNavigate();
    function addUserHandler(e) {
        e.preventDefault();
        const user ={
            username,
            email,
            password,
            role
        }
    axios.defaults.withCredentials=true;
    axios.post('http://localhost:8000/api/auth/add-user',user,{withCredentials:true})
    .then((res)=>{
        // console.log('Response: ', res.data)
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('student');
        // confirm(`${res.data.message}`);
        if(roleAuthorized === 'admin'){
            return navigate('/students')
        }
        navigate('/admins')
    })
    .catch((err)=>{
        console.log('Error: ', err);
        confirm(`${err.response.data.message}`)
    })

    }
  return (
    <div className="addpopup-page" onSubmit={addUserHandler}>
       
            <form action="" className='AddPopup-container rounded-md'>
                <h4 className='text-center mb-4 mt-2 text-xl text-white font-medium'>Add Users</h4>
                <div className="input-box">
                    <label htmlFor="username"  className=''>Username <span className='text-red-600'>*</span></label>
                    <input type="text" value={username} name='username' id='username' className='h-8 px-2 py-1 rounded-sm' placeholder='Enter name' onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div className="input-box">
                    <label htmlFor="email">Email <span className='text-red-600'>*</span></label>
                    <input type="email" value={email} name='email' id='email' className='h-8 px-2 py-1 rounded-sm' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="input-box">
                    <label htmlFor="password">Password <span className='text-red-600'>*</span></label>
                    <input type="password" value={password} name='password' id='password' className='h-8 px-2 py-1 rounded-sm' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="flex gap-6 mt-3">
                    <label htmlFor="role" style={{color:'white'}}>Role <span className='text-red-600'>*</span>    </label>
                    <select value={role} name="role" id="role" onChange={(e)=>setRole(e.target.value)}>
                        {/* <option value="superadmin">Super Admin</option> */}
                        <option value="student">Student</option>

                        {
                            roleAuthorized === 'superadmin' && (<option value="admin">Admin</option>)
                        }
                        
                    </select>
                </div>
                <div className="form-button w-full mt-6">
                    <button type='submit' className='w-full border-2 px-2 py-1 mb-4'>Add</button>
                </div>
            </form>
    
    </div>
  )
}

export default AddUsers