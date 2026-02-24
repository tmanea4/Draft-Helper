import './PositionAverageTable.css';

const FlexPos = ({ flexname }) => {

    const formattedFlexPoints = flexname.flexpoints.toFixed(2);

    return (
        <div className='nav-offset'>
            <table className='pos-avg-table2'>
                <thead>
                    <tr>
                        <th>{flexname.flexname}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formattedFlexPoints}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FlexPos;