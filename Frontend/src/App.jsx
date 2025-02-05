// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import PlayerTable from './PlayerTable';
import PlayerRow from './PlayerRow';
import PositionAverageTable from './PositionAverageTable';
import DraftList from './DraftList';
import NavBar from './NavBar';

import './App.css';

const fetchData = async () => {
  const response = await axios.get('http://localhost:3000/api/rows');
  const data = response.data.map(row => new PlayerRow(row.id, row.name, row.age, row.average, row.predicted, row.price, row.position, row.drafted, row.ignored));
  return data;
};

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [averagePredicted, setAveragePredicted] = useState(null);
  const [user, setUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');


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
      const response = await axios.put(`http://localhost:3000/api/rows/${id}`, { predicted: newPredicted });
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

  const handleDraftedUpdate = async (id, newDrafted) => {
    newDrafted = newDrafted ? 1 : 0;
    console.log(`Updating player with ID ${id} to new drafted ${newDrafted}`); // Log the data
    try {
      const response = await axios.put(`http://localhost:3000/api/rows/${id}`, { drafted: newDrafted });
      console.log(response.data); // Log the server response
  
      setRowData(prevData =>
        prevData.map(row => (row.id === id ? { ...row, drafted: newDrafted } : row))
      );
      fetchAveragePredicted();
    } catch (error) {
      console.error('Error updating drafted:', error);
    }
  };

  const handleIgnoredUpdate = async (id, newIgnored) => {
    console.log(`Updating player with ID ${id} to new ignored ${newIgnored}`); // Log the data
    try {
      const response = await axios.put(`http://localhost:3000/api/rows/${id}`, { ignored: newIgnored });
      console.log(response.data); // Log the server response
  
      setRowData(prevData =>
        prevData.map(row => (row.id === id ? { ...row, ignored: newIgnored } : row))
      );
      fetchAveragePredicted();
    } catch (error) {
      console.error('Error updating ignored:', error);
    }
  };

  const fetchAveragePredicted = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/averages/def/48/mid/64/ruc/8/fwd/48');
      const average = response.data;
      setAveragePredicted(average);
    } catch (error) {
      console.error('Error fetching average predicted:', error);
    }
  };

  const fetchUserFromCookies = () => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null;
  };

  const saveUserToCookies = (user) => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Expires in 7 days
  };

  const handleButtonClick = () => {
    saveUserToCookies(userNameInput);
    setUser(userNameInput);
  };

  const handleInputChange = (event) => {
    setUserNameInput(event.target.value);
  };

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
  }

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

  if(!user) {
    if(fetchUserFromCookies() !== null) 
    {
      setUser(fetchUserFromCookies());
    }
    else
    {
      return (
        <div>
          <input type="text" placeholder="Enter User" value={userNameInput} onChange={handleInputChange}/>
          <button onClick={() => handleButtonClick()}>Set User</button>
        </div>
      )
    }
  }

  return (
    <div className = 'background'>
      <div>
        <NavBar user={user} logout={logout}/>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        {/* <PositionAverageTable positionAverages={averagePredicted} />   */}
        <PositionAverageTable positionAverages={averagePredicted} />  
        
      </div>   
      <div className="tables-container">
        <div></div>
        <PlayerTable rowData={rowData} onPredictedUpdate={handlePredictedUpdate} onDraftedUpdate={handleDraftedUpdate} averages={averagePredicted} onIgnoredUpdate={handleIgnoredUpdate}/>
        <div></div>
        <DraftList rowData={rowData} />    
        <div></div> 
      </div>
    </div>
  );
};

export default App;
