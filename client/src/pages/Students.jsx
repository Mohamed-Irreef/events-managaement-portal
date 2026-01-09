import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pending, setPending] = useState(true);
  const [inputText, setInputText] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();
  

  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  // Fetch students data with a delay
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/getAllStudents', { withCredentials: true });
        const studentsList = response.data.students;
        console.log('studentsList: ',studentsList)
        const formattedData = studentsList.map((student, index) => ({
          no: index + 1,
          ...student,
          actions: (
            <div className="actions">
              <button value={student._id} className="edit-btn" onClick={(e)=>{editHandler(e.target.value)}}>Edit</button>
              <button value={student._id} className="delete-btn" onClick={(e)=>{deleteHandler(e)}}>Delete</button>
            </div>
          ),
        }));


        // Simulate a loading delay
        setTimeout(() => {
          setStudentsData(formattedData);
          setFilteredList(formattedData); // Initialize filtered list with full data
          setPending(false);
        }, 500); // Adjust delay as needed
      } catch (err) {
        console.error('Error fetching students:', err);
        setPending(false);
      }
    };

    fetchStudents();
  }, []);


  
  async function deleteHandler(e){
    e.preventDefault();
    const id = e.target.value;
    await axios.delete(`http://localhost:8000/api/auth/delete-student/${id}`)
    .then(async (res)=>{
      const response = await axios.get('http://localhost:8000/api/auth/getAllStudents', { withCredentials: true });
        const studentsList = response.data.students;
        console.log('studentsList: ',studentsList)
        const formattedData = studentsList.map((student, index) => ({
          no: index + 1,
          ...student,
          actions: (
            <div className="actions">
              <button value={student._id} className="edit-btn" onClick={(e)=>{editHandler(e.target.value)}}>Edit</button>
              <button value={student._id} className="delete-btn" onClick={(e)=>{deleteHandler(e)}}>Delete</button>
            </div>
          ),
        }));
        setTimeout(() => {
          setStudentsData(formattedData);
          setFilteredList(formattedData); // Initialize filtered list with full data
          setPending(false);
        }, 50);
    })
    .catch((err)=>{
      confirm(`${err}`)
    })
  }

  // Define columns for the DataTable
  useEffect(() => {
    setColumns([
      { name: 'S.No', selector: (row) => row.no, style: { textAlign: 'center' } },
      { name: 'Students', selector: (row) => row.username, sortable: true, style: { textAlign: 'center' } },
      { name: 'Emails', selector: (row) => row.email, sortable: true, style: { textAlign: 'center' } },
      { name: 'Passwords', selector: (row) => row.password, style: { textAlign: 'center', color: 'black', fontSize: '17px' } },
      { name: 'Roles', selector: (row) => row.role, style: { textAlign: 'center' } },
      { name: 'Actions', selector: (row) => row.actions, style: { textAlign: 'center' } },
    ]);
  }, []);

  function editHandler(_id){
    let id = _id;
    navigate(`/edit-student/${id}`);  ///////////////////////////////////////// create new
  }
  // Handle search filter immediately
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputText(query);

    const filtered = studentsData.filter(
      (student) =>
        student.username.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
    setFilteredList(filtered);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '16px',
        '&:hover': {
          backgroundColor: '#f1f1f1',
          cursor: 'pointer',
        },
      },
    },
    headCells: { style: { fontSize: '17px' } },
    cells: { style: { textAlign: 'center' } },
  };

  return (
    <div className="datatable">
      <div className="w-full">
        <div className="table-title w-full text-center mb-8 text-xl font-medium text-white">
          <p>STUDENTS LIST</p>
        </div>
        <div className="Search List text-right mb-6 w-full">
          <input
            className="filter-input text-black"
            type="text"
            placeholder="Search name or email"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredList}
        fixedHeader
        fixedHeaderScrollHeight="700px"
        progressPending={pending}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
    </div>
  );
};

export default Students;

