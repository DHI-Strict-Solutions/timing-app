import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        try {
          const res = await axios.get('/api/dashboard', config);
          setData(res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard. Here you can manage your schedules and availability.</p>
    </div>
  );
};

export default Dashboard;
