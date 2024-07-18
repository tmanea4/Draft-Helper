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
                        <th>Defend</th>
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
                        <th>Ruck</th>
                    </tr>
                    <tr>
                        <th>Forward</th>
                    </tr>               
                </tbody>
            </table>
        </div>
    );
}

export default DraftList;