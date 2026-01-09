import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const Admins = ({roleAuthorized}) => {
  const [adminsData, setAdminsData] = useState([]);
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

  // Fetch admins data with a delay
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/getAllAdmins', { withCredentials: true });
        const adminsList = response.data.admins;
        console.log('adminList: ',adminsList)
        const formattedData = adminsList.map((admin, index) => ({
          no: index + 1,
          ...admin,
          actions: (
            <div className="actions">
              <button  value={admin._id} className="edit-btn" onClick={(e)=>{editHandler(e.target.value)}}>Edit</button>
              <button value={admin._id} className="delete-btn" onClick={(e)=>{deleteHandler(e)}}>Delete</button>
            </div>
          ),
        }));


        // Simulate a loading delay
        setTimeout(() => {
          setAdminsData(formattedData);
          setFilteredList(formattedData); // Initialize filtered list with full data
          setPending(false);
        }, 500); // Adjust delay as needed
      } catch (err) {
        console.error('Error fetching admins:', err);
        setPending(false);
      }
    };

    fetchAdmins();
  }, []);


  
  async function deleteHandler(e){
    e.preventDefault();
    const id = e.target.value;
    await axios.delete(`http://localhost:8000/api/auth/delete-admin/${id}`)
    .then(async (res)=>{
      const response = await axios.get('http://localhost:8000/api/auth/getAllAdmins', { withCredentials: true });
        const adminsList = response.data.admins;
        console.log('adminList: ',adminsList)
        const formattedData = adminsList.map((admin, index) => ({
          no: index + 1,
          ...admin
          (roleAuthorized==='superadmin' && {actions: 
            <div className="actions">
              <button value={admin._id} className="edit-btn" onClick={(e)=>{editHandler(e.target.value)}}>Edit</button>
              <button value={admin._id} className="delete-btn" onClick={(e)=>{deleteHandler(e)}}>Delete</button>
            </div>})
          

        }));
        setTimeout(() => {
          setAdminsData(formattedData);
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
      { name: 'Admins', selector: (row) => row.username, sortable: true, style: { textAlign: 'center' } },
      { name: 'Emails', selector: (row) => row.email, sortable: true, style: { textAlign: 'center' } },
      { name: 'Passwords', selector: (row) => row.password, style: { textAlign: 'center', color: 'black', fontSize: '17px' } },
      { name: 'Roles', selector: (row) => row.role, style: { textAlign: 'center' } },
       roleAuthorized==='superadmin' && ({name: 'Actions', selector: (row) => row.actions, style: { textAlign: 'center' } })
    ]);
  }, []);

  function editHandler(_id){
    let id = _id;
    navigate(`/edit-admin/${id}`);
  }
  // Handle search filter immediately
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputText(query);

    const filtered = adminsData.filter(
      (admin) =>
        admin.username.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query)
    );
    setFilteredList(filtered);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '16px',
        backgroundColor:'white',
        '&:hover': {
          backgroundColor: '#f1f1f1',
          cursor: 'pointer',
        },
      },
    },
    headCells: { style: { fontSize: '17px',backgroundColor:'	#ffffffcc' } },
    cells: { style: { textAlign: 'center' } },
  };

  return (
    <div className="datatable " style={{width: roleAuthorized==='admin'&&`1200px`}}>
      <div className="w-full">
        <div className="table-title w-full text-center mb-8 text-xl font-medium text-white">
          <p>ADMINS LIST</p>
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

export default Admins;
