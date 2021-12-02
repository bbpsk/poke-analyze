import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { clear } from '../reducers/teamReducer';
import { removeAll } from '../reducers/statsReducer';

const Buttons = () => {
    const dispatch = useDispatch();

    const clearTable = () => {
        dispatch(clear())
        dispatch(removeAll())
    }

    return (
      <div className='d-flex justify-content-evenly m-3'>
        <button className='btn btn-dark rounded-pill'>
            Analyze
        </button>
        <button className='btn btn-dark rounded-pill' onClick={clearTable}>
            Clear
        </button>
      </div>
    )
}

export default Buttons
