import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getPokemon, getTypes, selectMemebers } from '../store/teamSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const pokes = useSelector(selectMemebers);
    const status = useSelector(state => state.team.status);

    const [input, setInput] = useState('');

    const search = async () => {
        const keyword = input.toLowerCase();
        
        const added = await dispatch(getPokemon(keyword));
        if(status === 'ok'){
            dispatch(getTypes(added.payload.types));
        }
        setInput('');
    }

    return (
        <div className ="d-flex px-lg-5 mx-lg-5 mt-3">
            <input id="input" type="text" className="form-control rounded-pill" 
                placeholder="Pokemon name" value={input} 
                onChange={(event) => setInput(event.target.value)}
            />
            <button className="btn btn-dark rounded-pill" 
                disabled={pokes.length === 6} onClick={search}>
                Add
            </button>
        </div>
    )
}

export default SearchBar
