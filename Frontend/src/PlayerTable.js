// PlayerTable.js
import React, { useState } from 'react';
import './MyTable.css'
import PlayerRowComponent from './PlayerRowComponent';

const PlayerTable = ({ rowData, onPredictedUpdate, onIgnoreUpdate, averages}) => {
  const [sortField, setSortField] = useState('rating');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    const newSortDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newSortDirection);
  };

  const sortedData = [...rowData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>; // Display a loading message or component
  }

  return (
    <table className="my-table">
      <thead>
        <tr>
        <th onClick={() => handleSort('name')}>
          Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('age')}>
          Age {sortField === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('average')}>
          Average {sortField === 'average' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('predicted')}>
          Predicted {sortField === 'predicted' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('price')}>
          Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('pricedAt')}>
          Priced At {sortField === 'pricedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('position')}>
          Position {sortField === 'position' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('draft')}>
          Draft {sortField === 'draft' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('ignore')}>
          Ignore {sortField === 'ignore' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('rating')}>
          Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <PlayerRowComponent key={index} data={row} onPredictedUpdate={onPredictedUpdate} onIgnoreUpdate={onIgnoreUpdate} averages={averages}  />
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;