// PlayerTable.js
import React, { useState } from 'react';
import './MyTable.css'
import PlayerRowComponent from './PlayerRowComponent';
import calcRating from './RatingCalculator';

const PlayerTable = ({ rowData, onUpdate, averages}) => {
  const [sortField, setSortField] = useState('rating');
  const [sortDirection, setSortDirection] = useState('desc');

  /* Let's do some analysis on the data we have */
  rowData.forEach(data => {
    data.rating = calcRating(data.position, data.predicted, averages);
    data.value = (data.predicted - data.pricedAt).toFixed(2);
  });

  const handleSort = (field) => {
    const newSortDirection = sortField === field && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortDirection(newSortDirection);
  };


  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>; // Display a loading message or component
  }

  const sortedData = [...rowData].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
  
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);
  
    const isNumA = !isNaN(numA);
    const isNumB = !isNaN(numB);
  
    const isIgnoredA = a.ignored; // true if item is ignored
    const isIgnoredB = b.ignored; // true if item is ignored

    // Move ignored items to the bottom
    if (isIgnoredA && !isIgnoredB) return 1;
    if (!isIgnoredA && isIgnoredB) return -1;
  
    // Standard sorting logic
    if (isNumA && isNumB) {
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    } else {
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });
  

  return (
    <table className="player-table">
      <thead>
        <tr>
        <th onClick={() => handleSort('name')}>
          Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        {/* <th onClick={() => handleSort('age')}>
          Age {sortField === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th> */}
        <th onClick={() => handleSort('average')}>
          Average {sortField === 'average' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('predicted')}>
          Predicted {sortField === 'predicted' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        {/* <th onClick={() => handleSort('price')}>
          Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th> */}
        <th onClick={() => handleSort('pricedAt')}>
          Priced At {sortField === 'pricedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('position')}>
          Position {sortField === 'position' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('draft')}>
          Draft {sortField === 'draft' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('taken')}>
          Taken {sortField === 'taken' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('ignore')}>
          Ignore {sortField === 'ignore' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('rating')}>
          Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        <th onClick={() => handleSort('value')}>
          Value {sortField === 'value' && (sortDirection === 'asc' ? '↑' : '↓')}
        </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <PlayerRowComponent key={index} data={row} onUpdate={onUpdate} />
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;