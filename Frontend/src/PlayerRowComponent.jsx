// PlayerRowComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './tableRows.css'

const PlayerRowComponent = ({ data, onUpdate }) => {
  const [predicted, setPredicted] = useState(data.predicted);
  const [drafted, setDrafted] = useState(data.drafted);
  const [ignored, setIgnored] = useState(data.ignored);

  const handlePredictedChange = (e) => {
    data.predicted = e.target.value;
    setPredicted(e.target.value);
  };

  const handlePredictedBlur = () => {
    onUpdate(data.id, predicted, data.drafted, data.ignored);
  };

  const handlePredictedKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        onUpdate(data.id, predicted, data.drafted, data.ignored);
      }
  };

  const handleDraftChange = async () => {
    const newDraftValue = data.drafted === 0 ? 1 : 0;
    data.drafted = newDraftValue;
    onUpdate(data.id, data.predicted, data.drafted, data.ignored);
    setDrafted(newDraftValue);
  };

  const handleTakenChange = async () => {
    const newDraftValue = data.drafted === 0 ? 2 : 0;
    data.drafted = newDraftValue;
    onUpdate(data.id, data.predicted, data.drafted, data.ignored);
    setDrafted(newDraftValue);
  };

  const handleIgnoredChange = async (e) => {
    const newIgnoreValue = e.target.checked ? 1 : 0;
    data.ignored = newIgnoreValue;
    onUpdate(data.id, data.predicted, data.drafted, data.ignored);
    setIgnored(newIgnoreValue);
  };

  var style = 'available_player';

  if(data.drafted === 1)
  {
    style = 'ignored_player';
  }
  else if(data.drafted === 2)
  {
    style = 'taken_player';
  }
  else if(data.drafted > 2)
  {
     style = 'my_player';
  }

  return (
    <tr className = {style}>
      <td>{data.name}</td>
      {/* <td>{data.age}</td> */}
      <td>{data.average}</td>
      <td>
        <input
          className='pred_input'
          type="number"
          value={data.predicted}
          onChange={handlePredictedChange}
          onBlur={handlePredictedBlur}
          onKeyDown={handlePredictedKeyDown}
        />
      </td>
      {/* <td>{data.price / 1000}</td> */}
      <td>{data.pricedAt}</td>
      <td>{data.position}</td>
      <td><button onClick={handleDraftChange}>{data.drafted === 1 ? 'Undraft' : 'Draft'}</button></td>
      <td><button onClick={handleTakenChange}>{data.drafted === 2 ? 'Undo' : 'Taken'}</button></td>
      <td>
        <input
          type="checkbox"
          checked={data.ignored === 1}
          onChange={handleIgnoredChange}
        />
      </td>
      <td>{data.rating}</td>
      <td>{data.value}</td>
    </tr>
  );  

};

export default PlayerRowComponent;
