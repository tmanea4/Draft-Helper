// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerTable from './PlayerTable';
import PlayerRow from './PlayerRow';

const fetchData = async () => {
  const response = await axios.get('http://localhost:3001/api/rows');
  const data = response.data.map(row => new PlayerRow(row.id, row.name, row.age, row.average, row.predicted, row.price, row.pricedAt, row.position, row.drafted, row.ignored));
  return data;
};

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [averagePredicted, setAveragePredicted] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(data => {
        setRowData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handlePredictedUpdate = async (id, newPredicted) => {
    console.log(`Updating player with ID ${id} to new average ${newPredicted}`); // Log the data
    try {
      const response = await axios.put(`http://localhost:3001/api/rows/${id}`, { predicted: newPredicted });
      console.log(response.data); // Log the server response

      setRowData(prevData =>
        prevData.map(row => (row.id === id ? { ...row, predicted: newPredicted } : row))
      );
      fetchAveragePredicted();
    } catch (error) {
      console.error('Error updating average:', error);
      setError('Failed to update average. Please try again later.');
    }
  };

  const handleIgnoreUpdate = async (id, newIgnore) => {
    console.log(`Updating player with ID ${id} to new ignore ${newIgnore}`); // Log the data
    try {
      const response = await axios.put(`http://localhost:3001/api/rows/${id}`, { ignored: newIgnore });
      console.log(response.data); // Log the server response
  
      setRowData(prevData =>
        prevData.map(row => (row.id === id ? { ...row, ignored: newIgnore } : row))
      );
      fetchAveragePredicted();
    } catch (error) {
      console.error('Error updating ignore:', error);
    }
  };

  const fetchAveragePredicted = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/average-predicted');
      const average = response.data.average_predicted;
      console.log('Average of highest 8 predicted values (from frontend):', average);

      const response2 = await axios.get('http://localhost:3001/api/averages/def/6/mid/8/ruc/1/fwd/6');
      const average2 = response2.data;
      console.log(average2)
      
      setAveragePredicted(average2);
    } catch (error) {
      console.error('Error fetching average predicted:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAveragePredicted();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if(!averagePredicted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Player Data Table</h1>
      {averagePredicted && <p>{averagePredicted.def} {averagePredicted.mid} {averagePredicted.ruc} {averagePredicted.fwd}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PlayerTable rowData={rowData} onPredictedUpdate={handlePredictedUpdate} onIgnoreUpdate={handleIgnoreUpdate} averages={averagePredicted} />
    </div>
  );
};

export default App;
