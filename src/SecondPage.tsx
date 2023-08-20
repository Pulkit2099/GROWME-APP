import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';
import './Styles/SecondPage.css'; // Import your CSS file

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const navigate = useNavigate();
  const userDetails = localStorage.getItem('userDetails');
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    if (!userDetails) {
      alert('Please enter your details before accessing this page.');
      navigate('/');
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [navigate, userDetails]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('userDetails'); // Remove user details from localStorage
    navigate('/'); // Navigate back to the UserForm page
  };

  return (
    <div className="second-page-container">
      <h1 className="welcome-header">Welcome to the Second Page!</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="data-grid-container">
        <DataGrid rows={data} columns={columns} autoPageSize />
      </div>
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
