// PlayerTable.js
import React from 'react';
import './MyTable.css'

const PlayerTable = ({ rowData }) => {
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
          <th>Draft</th>
          <th>Drafted</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.average}</td>
            <td><button>Draft</button></td>
            <td><button>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;
