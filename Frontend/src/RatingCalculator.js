/* Here we can get the rating for a given thingo */

// pos - string
// predicted - int
// averages - object

export default function calcRating(pos, predicted, averages)
{
    if(pos.includes('fwd'))
    {
        return (predicted - averages.fwd).toFixed(0);
    }
    else if(pos.includes('def'))
    {
        return (predicted - averages.def).toFixed(0);
    }  
    else if (pos.includes('ruc'))
    {
        return (predicted - averages.ruc).toFixed(0);
    }
    else if(pos.includes('mid'))
    {
        return (predicted - averages.mid).toFixed(0);
    }    
    else 
    {
        console.error('Invalid position:', pos);
    }

    return -69.69;
}