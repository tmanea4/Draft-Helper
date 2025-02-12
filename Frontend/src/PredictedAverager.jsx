
export default function PredictedAverager(rowData, teamStructure) 
{
    const testing = {};

    testing.def = getAverage(rowData, 'def', teamStructure.defenders * teamStructure.players);
    testing.mid = getAverage(rowData, 'mid', teamStructure.midfielders * teamStructure.players);
    testing.ruck = getAverage(rowData, 'ruck', teamStructure.rucks * teamStructure.players);
    testing.fwd = getAverage(rowData, 'fwd', teamStructure.forwards * teamStructure.players);

    return testing;
}

function getAverage(players, position, number) {
    if(number === 0) {
        return 200;
    }

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
