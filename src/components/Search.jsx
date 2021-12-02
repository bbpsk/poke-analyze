import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { add } from '../reducers/teamReducer';
import { storeStats } from '../reducers/statsReducer';
import { calcStats } from '../utils/calculations';

const SearchBar = () => {
    const dispatch = useDispatch();
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

    const search = async () => {
        let keyword = document.getElementById('input').value;
        keyword = keyword.toLowerCase();
        try{
            let {data: poke} = await axios.get(baseURL+keyword);
            console.log(poke);
            dispatch(add(poke));
            
            const stats = await calcStats(poke);
            console.log(stats);
            dispatch(storeStats(stats))
            
        } catch(err){
            console.log(err);
        }
    }
    return (
        <div className ="d-flex px-lg-5 mx-lg-5 mt-3">
            <input id="input" type="text" className="form-control rounded-pill" placeholder="Pokemon name"/>
            <button className="btn btn-dark rounded-pill" onClick={search}>Add</button>
        </div>
    )
}

export default SearchBar
