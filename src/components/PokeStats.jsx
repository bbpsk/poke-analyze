import React from 'react'
import {useSelector} from 'react-redux'

export const PokeStats = ({number}) => {
    const stats = useSelector(state => state.stats);
    const pokes = useSelector(state => state.team);
    console.log(stats)

    return (
        <>
        {stats.length-1 >= number 
        ?
        <>
            <td>
                {stats[number].strengths.map(strength => {
                    return <p key={number+strength}>{strength}</p>
                })}
            </td>
            <td>
                {stats[number].weaknesses.map(weakness => {
                    if(stats[number].criticals.includes(weakness)){
                        return <p key={number+weakness} className='red'>{weakness}</p>
                    }
                    else return <p key={number+weakness}>{weakness}</p>
                })}
            </td>
        </>
        :
        <>
            <td></td>
            <td></td>
        </>
        }
        </> 
    )
}
