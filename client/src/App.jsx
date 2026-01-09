import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Admins from './pages/Admins'
import Students from './pages/Students'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import AddUsers from './components/AddUsers'
import { useEffect, useState } from 'react'
import Help from './pages/Help'
import axios from 'axios'
import CreateEvent from './components/CreateEvent'
import EditStudentsHandler from './components/EditStudentsHandler'
import EditAdminsHandler from './components/EditAdminsHandler'
import Dashboard from './pages/Dashboard'
import EditEventForm from './components/EditEvent'
import ViewPost from './pages/ViewPost'
function App() {
 
  const [authorized,setAuthorized] = useState(false);
  const [userId, setUserId] = useState('');

  const [roleAuthorized,setRoleAuthorized] = useState('');
  useEffect(()=>{
    axios.defaults.withCredentials=true;
    axios.get('http://localhost:8000/api/auth/verify',{withCredentials:true})
    .then((res)=>{
      console.log('Verify Token Response (Role): ', res.data.role);
      console.log('Verify Token Response (Id): ', res.data.id);
      setAuthorized(true); //loggedin
      setUserId( res.data.id);
      setRoleAuthorized(res.data.role);
    })
    .catch((err)=>{
      console.log('Verify Token Response: ', err.response.data.role);
      setAuthorized(false);
    })
  });

  // useEffect(()=>{
   
  // },[authorized])
  
  return (
    <>
       <Router>
        <Navbar authorized={authorized} setAuthorized={setAuthorized} roleAuthorized={roleAuthorized}/>
          <Routes>
            <Route path='/' element={<Home userId={userId} roleAuthorized={roleAuthorized} authorized={authorized}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/login' element={<Login setAuthorized={setAuthorized}/>}/>
            {
              authorized && <>
                <Route path='/events' element={<Events roleAuthorized={roleAuthorized}/>}/>

                  {(roleAuthorized === 'admin' || roleAuthorized === 'superadmin') &&
                    <>
                        <Route path='/create-event' element={<CreateEvent userId={userId}/>}/>
                        <Route path='/admins' element={<Admins roleAuthorized={roleAuthorized}/>}/>
                        <Route path='/students' element={<Students/>}/>
                    </>
                  }
                  
                
                <Route path='/profile' element={<Profile userId={userId}/>}/>
               
                  
                    {(roleAuthorized === 'admin' || roleAuthorized === 'superadmin' ) && <Route path='/add' element={<AddUsers roleAuthorized={roleAuthorized} />}/>}
                    {roleAuthorized === 'superadmin' && <Route path='/dashboard' element={<Dashboard/>}/>}
                    {roleAuthorized === 'superadmin' && <Route path='/edit-admin/:id' element={<EditAdminsHandler/>}/>}
                    {(roleAuthorized === 'admin' || roleAuthorized === 'superadmin' ) && <Route path='/edit-student/:id' element={<EditStudentsHandler/>}/>}
                    {(roleAuthorized === 'admin' || roleAuthorized === 'superadmin' ) && <Route path='/edit-event/:id' element={<EditEventForm userId={userId}/>}/>}
                
                <Route path='help' element={<Help/>}/>
                <Route path='/view-post/:id' element={<ViewPost roleAuthorized={roleAuthorized}/>}/>
              </>

             
            }
          </Routes>
        
       </Router>
    </>
  )
}

export default App
