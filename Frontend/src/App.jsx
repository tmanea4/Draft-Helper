// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import PlayerTable from './PlayerTable';
import PlayerRow from './PlayerRow';
import PositionAverageTable from './PositionAverageTable';
import DraftList from './DraftList';
import NavBar from './NavBar';
import PredictedAverager from './PredictedAverager';
import TeamStructure from './TeamStructure';

import './App.css';

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [averagePredicted, setAveragePredicted] = useState(null);
  const [user, setUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [dbExists, setDbExists] = useState(false);
  const [teamStructure, setTeamStructure] = useState(null);

  const updatePlayer = async (id, newPredicted, newDrafted, newIgnored) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/rows/${id}/${user}`, { predicted: newPredicted, drafted: newDrafted, ignored: newIgnored });
      setRowData(prevData =>
        prevData.map(row =>
          row.id === id
            ? { ...row, predicted: newPredicted, drafted: newDrafted, ignored: newIgnored }
            : row
        )
      );
      
      updateAveragePredicted();
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const fetchData = async (user) => {
    const response = await axios.get(`http://localhost:3000/api/rows/${user}`);
    const data = response.data.map(row => new PlayerRow(row.id, row.name, row.age, row.average, row.predicted, row.price, row.position, row.drafted, row.ignored));
    return data;
  };

  const updateAveragePredicted = () => {
      const aresponse = PredictedAverager(rowData, teamStructure);
      setAveragePredicted(aresponse);
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

  const testDbExists = async (user) => {
    const response = await axios.get(`http://localhost:3000/api/testtable/${user}`); 
    setDbExists(response.data);
  }

  const createTable = async (user) => {
    const response = await axios.put(`http://localhost:3000/api/createtable/${user}`); 
  }

  const updateTeamStucture = async (newTeamStructure) => {
    const response = await axios.put(`http://localhost:3000/api/team-structure/${user}`, newTeamStructure);
    setTeamStructure(newTeamStructure);
    updateAveragePredicted();
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
  
  useEffect(() => {
    setLoading(true);
    fetchData(user)
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

  useEffect(() => {
    if (teamStructure === null) {
      const fetchTeam = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/team-structure/${user}`);
          setTeamStructure(response.data);
        } catch (error) {
          console.error('Error fetching team structure:', error);
        }
      };
      fetchTeam();
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if(rowData.length === 0) {
    return <div>No data available</div>;
  }

  if(!averagePredicted) {
    updateAveragePredicted(rowData);  
  }

  if(user === null)
  {
    return <div>User does not exist</div>;
  }

  testDbExists(user); 

  if(!dbExists)
  {
    createTable(user);
  }

  return (
    <div className = 'background'>
      <div>
        <NavBar user={user} logout={logout}/>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <PositionAverageTable positionAverages={averagePredicted} />  
        <TeamStructure teamStructure={teamStructure} onUpdate={updateTeamStucture} />
        {/* There should be a thing here that customises positions/player numbers, maybe in a table */}
      </div>   
      <div className="tables-container">
        <div></div>
        <PlayerTable rowData={rowData} onUpdate={updatePlayer} averages={averagePredicted}/>
        <div></div>
        <DraftList rowData={rowData} />    
        <div></div> 
      </div>
    </div>
  );
};

export default App;
