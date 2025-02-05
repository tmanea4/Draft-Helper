// PlayerRowComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './tableRows.css'

const PlayerRowComponent = ({ data, onPredictedUpdate, onDraftedUpdate, onIgnoredUpdate }) => {
  const [predicted, setPredicted] = useState(data.predicted);
  const [drafted, setDrafted] = useState(data.drafted);
  const [ignored, setIgnored] = useState(data.ignored);

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

  const handleDraftChange = async () => {
    const newDraftValue = !data.drafted;
    data.drafted = newDraftValue;
    onDraftedUpdate(data.id, newDraftValue);
    setDrafted(newDraftValue);
  };

  const handleIgnoredChange = async (e) => {
    const newIgnoreValue = e.target.checked ? 1 : 0;
    data.ignored = newIgnoreValue;
    onIgnoredUpdate(data.id, newIgnoreValue);
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
      <td><button onClick={handleDraftChange}>{data.drafted ? 'Undraft' : 'Draft'}</button></td>
      <td><button>{data.drafted ? 'Undo' : 'Taken'}</button></td>
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
