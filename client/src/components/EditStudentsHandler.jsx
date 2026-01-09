import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditStudentsHandler = () => {
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState('student');
    const navigate = useNavigate();

    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/auth/edit-student/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log("Single Student: ", res.data.student);
            const student= res.data.student;
            setUsername(student.username);
            setEmail(student.email);
            setPassword(student.password);
            setRole(student.role);
        })
        .catch((err)=>{
            console.log('Single Student Error: ', err)
        })
    },[id])

    function cancelHandler(e){
        e.preventDefault();
        navigate('/students');
    }
    function saveHandler(e){
        e.preventDefault();
        console.log('Updated Users : ', {username,email,password,role});
        const updatedUser = {
            username,
            email,
            password,
            role
        }
        // Inner function
        const postHandler = async ()=>{
            axios.defaults.withCredentials=true;

            await axios.put(`http://localhost:8000/api/auth/update-student/${id}`,updatedUser,{withCredentials:true})
            .then((res)=>{
                const ok= confirm(res.data.message);
                if(ok){
                    navigate('/students');
                }

            })
            .catch((err)=>{
                
                console.log('Edit Error: ', err.message)
            })
        }
        postHandler();
        
    }

  return (
    <div className="addpopup-page" >
                
            <form action="" className='AddPopup-container rounded-md'>
                <h4 className='text-center mb-4 mt-2 text-xl text-white font-medium'>Edit Student</h4>
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
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-button flex w-full mt-6 gap-3">
                        <button className='w-full border-2 px-2 py-1 mb-4' onClick={cancelHandler}>Cancel</button>
                    <button type='submit' className='w-full border-2 px-2 py-1 mb-4' onClick={saveHandler}>Save</button>
                </div>
            </form>
    
    </div>
    
  )
}

export default EditStudentsHandler