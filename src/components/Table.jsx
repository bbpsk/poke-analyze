import React from 'react'
import {useSelector} from 'react-redux'
import { PokeStats } from './PokeStats';

const Table = () => {
    let index = [1,2,3,4,5,6];
    const pokes = useSelector(state => state.team);
    console.log(pokes)

    return (
      <table className="table table-striped mt-4"> 
        <thead className="gray">
        <tr>
            <th scope='col'>.</th>
            <th scope='col'>Pokemon</th>
            <th scope='col'>Strengths</th>
            <th scope='col'>Weaknesses</th>
        </tr>
        </thead>
        <tbody>
        {index.map(number => {
            return <tr key={number} className=''>
                <th scope='row'>#{number}</th>
            {pokes.length >= number 
                ? 
                <>
                <td>
                  <div className='d-flex'>
                    <div>
                        <p className=' fw-bold'>{pokes[number-1].name}</p>

                        <small>{pokes[number-1].types[0].type.name}</small>
                        {pokes[number-1].types.length > 1 
                            ? 
                            <small>/{pokes[number-1].types[1].type.name}</small> 
                            : <></>
                        }
                    </div>
                    <img src={pokes[number-1].sprites.front_default}/>
                  </div>
                </td> 
                <PokeStats number={number}/>
                </>
                : 
                <>
                <td></td> 
                <td></td>
                <td></td>
                </>
            }
        </tr>
        })}
        </tbody>
      </table>
    )
}

export default Table
