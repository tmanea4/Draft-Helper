/* Here we can get the rating for a given thingo */

// pos - string
// predicted - int
// averages - object

/* 
    This could potentially be changed so that it orders them 
    dynamically depending on which position averages the least
    but it's unlikely for the order to change from 
    mid > ruc > fwd > def 
    (mid/ruck can be similar but mid/ruck dpp is rare)
*/

export default function calcRating(pos, predicted, averages)
{
    if(pos.includes('fwd'))
    {
        return (predicted - averages.fwd).toFixed(2);
    }
    else if(pos.includes('def'))
    {
        return (predicted - averages.def).toFixed(2);
    }  
    else if (pos.includes('ruck'))
    {
        return (predicted - averages.ruck).toFixed(2);
    }
    else if(pos.includes('mid'))
    {
        return (predicted - averages.mid).toFixed(2);
    }    
    else 
    {
        console.error('Invalid position:', pos);
    }

    return -69.69;
}