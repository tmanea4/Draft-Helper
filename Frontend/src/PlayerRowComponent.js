// PlayerRowComponent.js
import React, { useState } from 'react';
import calcRating from './RatingCalculator';

const PlayerRowComponent = ({ data, onPredictedUpdate, onIgnoreUpdate, averages }) => {
  const [predicted, setPredicted] = useState(data.predicted);
  const [ignored, setIgnore] = useState(data.ignored);

    // console.log(averages)

  const handlePredictedChange = (e) => {
    setPredicted(e.target.value);
  };

  const handlePredictedBlur = () => {
    onPredictedUpdate(data.id, predicted);
  };

  const handlePredictedKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        onPredictedUpdate(data.id, predicted);
      }
  };

  const handleIgnoreChange = async (e) => {
    const newIgnoreValue = e.target.checked ? 1 : 0;
    onIgnoreUpdate(data.id, newIgnoreValue);
    setIgnore(newIgnoreValue);
  };
  
  const rating = calcRating(data.position, predicted, averages);

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.age}</td>
      <td>{data.average}</td>
      <td>
        <input
          type="number"
          value={predicted}
          onChange={handlePredictedChange}
          onBlur={handlePredictedBlur}
          onKeyDown={handlePredictedKeyDown}
        />
      </td>
      <td>{data.price}</td>
      <td>{data.pricedAt}</td>
      <td>{data.position}</td>
      <td>{data.drafted ? 'yes' : 'no'}</td>
      <td>
        <input
          type="checkbox"
          checked={ignored === 1}
          onChange={handleIgnoreChange}
        />
      </td>
      <td>{rating}</td>
    </tr>
  );  

};

export default PlayerRowComponent;
