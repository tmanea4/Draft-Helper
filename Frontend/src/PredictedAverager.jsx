
export default function PredictedAverager(rowData)
{
    const testing = {};

    testing.def = getAverage(rowData, 'def', 48);
    testing.mid = getAverage(rowData, 'mid', 64);
    testing.ruck = getAverage(rowData, 'ruck', 8);
    testing.fwd = getAverage(rowData, 'fwd', 48);

    return testing;
}

function getAverage(players, position, number) {
    const top8Mids = players
        .filter(player => player.position === position) 
        .filter(player => player.ignored !== 1)
        .sort((a, b) => parseFloat(b.predicted) - parseFloat(a.predicted)) 
        .slice(0, number); 

    const sum = top8Mids
        .filter(player => player.drafted === 0)
        .reduce((sum, player) => sum + parseFloat(player.predicted), 0);

    const count = top8Mids.filter(player => player.ignored !== 1).length;

    return count > 0 ? sum / count : 0;
}
