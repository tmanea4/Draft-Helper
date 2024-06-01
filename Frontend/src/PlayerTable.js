// PlayerTable.js
import React from 'react';
import './MyTable.css'
import PlayerRowComponent from './PlayerRowComponent';

const PlayerTable = ({ rowData, onAverageUpdate }) => {
  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>; // Display a loading message or component
  }

  return (
    <table className="my-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((row, index) => (
          <PlayerRowComponent key={index} data={row} onAverageUpdate={onAverageUpdate} />
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;
