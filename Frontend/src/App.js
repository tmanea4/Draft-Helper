// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerTable from './PlayerTable';
import PlayerRow from './PlayerRow';

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rows');
        const data = response.data.map(row => new PlayerRow(row.id, row.name, row.age, row.average));
        setRowData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleAverageUpdate = async (id, newAverage) => {
    console.log(`Updating player with ID ${id} to new average ${newAverage}`); // Log the data
    try {
      const response = await axios.put(`http://localhost:3001/api/rows/${id}`, { average: newAverage });
      console.log(response.data); // Log the server response

      setRowData(prevData =>
        prevData.map(row => (row.id === id ? { ...row, average: newAverage } : row))
      );
    } catch (error) {
      console.error('Error updating average:', error);
      setError('Failed to update average. Please try again later.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Player Data Table</h1>
      <PlayerTable rowData={rowData} onAverageUpdate={handleAverageUpdate} />
    </div>
  );
};

export default App;
