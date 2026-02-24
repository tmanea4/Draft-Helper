
export default function PredictedAverager(rowData, teamStructure) 
{
    const testing = {};

    testing.def = getAverage(rowData, 'def', teamStructure.defenders * teamStructure.players);
    testing.mid = getAverage(rowData, 'mid', teamStructure.midfielders * teamStructure.players);
    testing.ruck = getAverage(rowData, 'ruck', teamStructure.rucks * teamStructure.players);
    testing.fwd = getAverage(rowData, 'fwd', teamStructure.forwards * teamStructure.players);

    const defenders = teamStructure.defenders * teamStructure.players;
    const midfielders = teamStructure.midfielders * teamStructure.players;
    const rucks = 10;
    const forwards = teamStructure.forwards * teamStructure.players;
    const total = teamStructure.players;
    // total = 10;

    testing.flexpoints = flexpoints(rowData, total);
    testing.flexname = flexname(rowData, total);

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

    const count = top8Mids
    .filter(player => player.ignored !== 1)
    .filter(player => player.drafted === 0)
    .length;

    // console.log(count)
    return count > 0 ? sum / count : 0;
}

function flexpoints(players, totalplayers) {
    const topplayers = players
        .filter(player => player.ignored !== 1)
        .filter(player => player.drafted === 0)
        .sort((a, b) => parseFloat(b.predicted) - parseFloat(a.predicted)) 
        .slice(0, totalplayers); 

        const sum = topplayers
        .filter(player => player.drafted === 0)
        .reduce((sum, player) => sum + parseFloat(player.predicted), 0);

        const highestPredictedPlayer = topplayers
        .filter(player => player.ignored === 0 && player.drafted === 0)
        .reduce((maxPlayer, player) => 
            parseFloat(player.predicted) > parseFloat(maxPlayer.predicted) ? player : maxPlayer, 
            { predicted: -Infinity }
        );

        const flexpoints = highestPredictedPlayer.predicted - sum / totalplayers;
    return flexpoints;
}

function flexname(players, totalplayers) {
    const topplayers = players
        .filter(player => player.drafted === 0)
        .filter(player => player.ignored !== 1)
        .sort((a, b) => parseFloat(b.predicted) - parseFloat(a.predicted)) 
        .slice(0, totalplayers); 

        const sum = topplayers
        .filter(player => player.drafted === 0)
        .reduce((sum, player) => sum + parseFloat(player.predicted), 0);

        const highestPredictedPlayer = topplayers
        .filter(player => player.ignored === 0 && player.drafted === 0)
        .reduce((maxPlayer, player) => 
            parseFloat(player.predicted) > parseFloat(maxPlayer.predicted) ? player : maxPlayer, 
            { predicted: -Infinity }
        );

    return highestPredictedPlayer.name;
}