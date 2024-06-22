import './DraftList.css';

const DraftList = ({ positionAverages }) => {
    return (
        <div>
            <table className='draft-table'>
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

export default DraftList;