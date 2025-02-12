// import './PositionAverageTable.css';
import React, { useState } from 'react';

import './TeamStructure.css'

const RowEditor = ({position, teamStructure, onUpdate}) => {

    const [newvalue, setNewValue] = useState(teamStructure[position]);

    const handleChange = (e) => {
        setNewValue(e.target.value);
        onUpdate(position, newvalue);
    }

    const handleBlur = (e) => {
        if(newvalue > 0)
        {
            onUpdate(position, newvalue);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if(newvalue > 0)
            {
                onUpdate(position, newvalue);
            }
        }
    }

    return (
        <input
          className='pos_input'
          type="number"
          value={newvalue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
    );
}

const TeamStructure = ({ teamStructure, onUpdate }) => {

    const handleUpdate = (position, value) => {
        teamStructure[position] = value;
        onUpdate(teamStructure);
    }

    return (
        <div className='nav-offset'>
            <table className='pos-avg-table'>
                <thead>
                    <tr>
                        <th>Players</th>
                        <th>Defs</th>
                        <th>Mids</th>    
                        <th>Rucks</th>
                        <th>Fwds</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><RowEditor position='players' teamStructure={teamStructure} onUpdate={handleUpdate}></RowEditor></td>
                        <td><RowEditor position='defenders' teamStructure={teamStructure} onUpdate={handleUpdate}></RowEditor></td>
                        <td><RowEditor position='midfielders' teamStructure={teamStructure} onUpdate={handleUpdate}></RowEditor></td>
                        <td><RowEditor position='rucks' teamStructure={teamStructure} onUpdate={handleUpdate}></RowEditor></td>
                        <td><RowEditor position='forwards' teamStructure={teamStructure} onUpdate={handleUpdate}></RowEditor></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TeamStructure;