import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { clear } from '../reducers/teamReducer';
import { removeAll } from '../reducers/statsReducer';

const Buttons = () => {
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);

    const clearTable = () => {
        dispatch(clear())
        dispatch(removeAll())
    }
    const analyze = () => {
        const div = document.getElementById('results');
        let teamWeaks = []
        let teamStrs = []
        let criticals = []

        for(let member of stats){
            console.log(member)
            teamWeaks = teamWeaks.concat(member.weaknesses)
            teamStrs = teamStrs.concat(member.strengths)
        }
        console.log(teamWeaks)

        for(let weakness of teamWeaks){
            let count = teamWeaks.reduce((total, curr) => {
                if(curr === weakness) return total + 1
                return total + 0
            }, 0); //find how many times the weakness appears

            if(count >= (stats.length-1)/2){
                console.log(weakness, count)
                criticals.push(weakness)
            }
        }
        criticals = [...new Set(criticals)]
        console.log(criticals)
        div.innerText = `Half of your team or more is weak to: ${criticals}`
    }

    return (
      <div className='d-flex justify-content-evenly m-3'>
        <button className='btn btn-dark rounded-pill' onClick={analyze}>
            Analyze
        </button>
        <button className='btn btn-dark rounded-pill' onClick={clearTable}>
            Clear
        </button>
        <div id='results' className='mt-5'>
        </div>
      </div>
    )
}

export default Buttons
