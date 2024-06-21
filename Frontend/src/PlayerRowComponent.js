// PlayerRowComponent.js
import React, { useState } from 'react';
import './tableRows.css'

const PlayerRowComponent = ({ data, onPredictedUpdate, onIgnoreUpdate }) => {
  const [predicted, setPredicted] = useState(data.predicted);
  const [ignored, setIgnore] = useState(data.ignored);

  const handlePredictedChange = (e) => {
    data.predicted = e.target.value;
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
  
  var style = 'available_player';
  if(data.drafted === 1)
  {
    style = 'my_player';
  }
  else if(data.taken === 1)
  {
    style = 'taken_player';
  }
  else if(data.ignored === 1)
  {
     style = 'ignored_player';
  }

  return (
    <tr className = {style}>
      <td>{data.name}</td>
      <td>{data.age}</td>
      <td>{data.average}</td>
      <td>
        <input
          type="number"
          value={data.predicted}
          onChange={handlePredictedChange}
          onBlur={handlePredictedBlur}
          onKeyDown={handlePredictedKeyDown}
        />
      </td>
      <td>{data.price / 1000}</td>
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
      <td>{data.rating}</td>
    </tr>
  );  

};

export default PlayerRowComponent;
