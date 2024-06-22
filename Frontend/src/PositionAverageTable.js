import './PositionAverageTable.css';

const PositionAverageTable = ({ positionAverages }) => {
    return (
        <div className='nav-offset'>
            <table className='pos-avg-table'>
                <thead>
                    <tr>
                        <th>Defender</th>
                        <th>Midfield</th>    
                        <th>Ruck</th>
                        <th>Forward</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{positionAverages.def.toFixed(2)}</td>
                        <td>{positionAverages.mid.toFixed(2)}</td>
                        <td>{positionAverages.ruc.toFixed(2)}</td>
                        <td>{positionAverages.fwd.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PositionAverageTable;