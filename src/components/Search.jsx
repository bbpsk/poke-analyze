import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getPokemon, getTypes, selectMemebers } from '../store/teamSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const pokes = useSelector(selectMemebers);
    const status = useSelector(state => state.team.status);
    const error = useSelector(state => state.team.error);

    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
      if(status === 'has404Error'){
        setMessage(`${input} does not exist in the pokedex`);
      } else if(status === 'hasSearchError'){
        setMessage(error);
      } else setMessage('');

    }, [error, status]);
    
    const search = async () => {
        const keyword = input.toLowerCase().replace(' ', '-');
        try {
            const added = await dispatch(getPokemon(keyword)).unwrap();
            dispatch(getTypes(added.types));
            setInput('');
        } catch {
        }
    }

    return (
        <>
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
            <div className="text-danger px-lg-5 mx-lg-5 mt-1">{message}</div>
        </>
    )
}

export default SearchBar
