// PlayerRowComponent.js
import React, { useState } from 'react';

const PlayerRowComponent = ({ data, onAverageUpdate }) => {
  const [average, setAverage] = useState(data.average);

  const handleAverageChange = (e) => {
    setAverage(e.target.value);
  };

  const handleAverageBlur = () => {
    onAverageUpdate(data.id, average);
  };

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.age}</td>
      <td>
        <input
          type="number"
          value={average}
          onChange={handleAverageChange}
          onBlur={handleAverageBlur}
        />
      </td>
    </tr>
  );
};

export default PlayerRowComponent;
