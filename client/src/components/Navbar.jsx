import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import { HiH2 } from "react-icons/hi2";
import axios from "axios";
const Navbar = ({ authorized, setAuthorized, roleAuthorized }) => {
  const navigate= useNavigate();
  function logoutHandler() {
    // const isOk = confirm("this account will be logged out");
    // if (isOk) {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:8000/api/auth/logout", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Logout Response: ", res.data.message);
          setAuthorized(false);
          navigate('/')
        })
        .catch((err) => {
          console.log("Logout Error: ", err.response.data.message);
        });
    // }
  }
  // useEffect(() => {
  //   // location.reload();
  // }, [authorized]);
  return (
    <nav className="Navbar">
      <div className="logo">
        <h4 className="text-3xl font-medium">
          <span className="text-blue-700">E</span>du
          <span className="text-blue-700">N</span>ex
        </h4>
      </div>
      <ul className="Nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        {authorized && (
          <>
            <li>
              <Link to="/events">Events</Link>
            </li>

            {(roleAuthorized === 'admin' || roleAuthorized === 'superadmin') &&
            <>
                <li><Link to="/admins">Admins</Link></li>
                <li><Link to="/students">Students</Link></li>
            </>
            }
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>

      <div className="nav-buttons">
        {authorized && (
          <>
            {(roleAuthorized === 'superadmin' || roleAuthorized === 'admin') &&  <Link to="/create-event"><button className="events flex gap-1"><i class="ri-calendar-event-line"></i>Events</button></Link>}
            {(roleAuthorized === 'superadmin' || roleAuthorized === 'admin') &&  <Link to="/add"><button className="flex gap-1"><i className="ri-user-add-line"></i> Add</button></Link>}
            {roleAuthorized === 'superadmin' &&  <Link to="/dashboard"><button className="flex gap-1 dashboard"><i class="ri-dashboard-line"></i> Dashboard</button></Link>}

          </>
        )}

        {authorized ? (
          <button className="logout" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="flex gap-1 login">
              <i className="ri-login-box-line"></i> Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
