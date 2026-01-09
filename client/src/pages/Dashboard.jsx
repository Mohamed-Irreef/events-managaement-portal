import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import student from "../assets/studentImg.jpg"
import admin from "../assets/admin.png"
import superadmin from "../assets/superadmin.png"
import totalImg from "../assets/totalImg.webp"

const Dashboard = () => {
  const [total, setTotal] = useState();
  const [students, setStudents] = useState();
  const [admins, setAdmins] = useState();
  const [superadmins, setSuperadmins] = useState();
  const [loading, setLoading] = useState(false);


 
  useEffect(()=>{
    setTimeout( ()=>{
      setLoading(true);
      axios.defaults.withCredentials=true;
      axios.get('http://localhost:8000/api/auth/dashboard', {withCredentials:true})
      .then((res)=>{
        console.log(res.data.counts);
        setStudents(res.data.counts.studentsCounts);
        setAdmins(res.data.counts.adminsCounts);
        setSuperadmins(res.data.counts.superadminsCounts);
        let total =students+admins+superadmins;
        setTotal(res.data.counts.studentsCounts + res.data.counts.superadminsCounts + res.data.counts.adminsCounts);
      })
      .catch((err)=>{
        console.log("Dashboard fetch Error: ", err);
      })
    },1000)
  },[])

  const data = [
    ["Task", "Hours per Day"],
    ["Students", students],
    ["Admins", admins],
    ["Super Admins", superadmins],

  ];

  const options = {
    
    titleTextStyle: {
      color: "black", // Change title color to white
      fontSize: 20, // Adjust font size if needed
      bold: true, // Make title bold
      alignment: "center", // Center the title
      
    },
     backgroundColor: 'black',
    //  color:"white",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#f0f0f5",
        fontSize: 14,
      },
      
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  return (
    <>
          {
            !loading ? <div className='text-center text-xl mt-48'>Loading...</div> :<div style={{ textAlign: "center", backgroundColor: "black", padding: "10px", marginTop:"50px" }}>
            <h2 style={{ color: "white", marginBottom:"50px",fontSize:"22px",  }}>Super Admin Dashboard</h2>
            
                <div className="w-full flex gap-20 justify-between">
        
                    <div className="w-1/5 ">
                      <Chart
                        width={480}
                        height={300}
                        chartType="PieChart"
                        data={data}
                        options={options}
                      />
                    </div>
                    <div className="dash-main float-right mt-4">
        
                        <div className="students dashboard-card flex flex-col justify-between items-center">
                          <div className="Image-div">
                            <img src={student} alt="" />
                          </div>
                          <div className="card-text">
                              <p>{students} Students</p>
                          </div>
                        </div>
        
        
                        <div className="admins dashboard-card flex flex-col gap-2 justify-between items-center">
                        <div className="Image-div">
                            <img src={admin} alt="" />
                          </div>
                          <div className="card-text">
                              <p>{admins} Admins</p>
                          </div>
                        </div>
        
        
                        <div className="superadmins dashboard-card flex flex-col gap-2 justify-between items-center">
                        <div className="Image-div">
                            <img src={superadmin} alt="" />
                          </div>
                          <div className="card-text">
                            <p>{superadmins} SuperAdmins</p>
                          </div>
                        </div>
        
        
                        <div className="Total mt-12 dashboard-card-total flex flex-col items-center justify-center border-2 border-white rounded-full">
                          <div className="text-2xl font-medium">
                            Total
                          </div>
                          <div className="card-text">
                            <p>{total} Users</p>
                          </div>
                        </div>
        
                    </div>
        
                </div>
        </div>
          }
    </>
  )
}

export default Dashboard