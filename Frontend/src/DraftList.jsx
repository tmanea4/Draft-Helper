import './DraftList.css';


const DraftList = ({ rowData }) => {
    return (
        <div>
            <table className='draft-table'>
                <thead>
                    <tr>
                        <th className='draft-table-header'>Drafted Team</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Defenders</th>
                    </tr>
                    <tr>
                        <td>Midfielder 1</td>
                    </tr>
                    <tr>
                        <td>Midfielder 1</td>
                    </tr>
                    <tr>
                        <td>Midfielder 1</td>
                    </tr>
                    <tr>
                        <th>Midfield</th>
                    </tr>
                    <tr>
                        <th>Rucks</th>
                    </tr>
                    <tr>
                        <th>Forwards</th>
                    </tr>               
                </tbody>
            </table>
        </div>
    );
}

export default DraftList;