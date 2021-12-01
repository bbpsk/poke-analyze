import React from 'react'
import axios from 'axios'

const SearchBar = () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

    const search = async () => {
        let keyword = document.getElementById('input').value;
        keyword = keyword.toLowerCase();
        try{
            let {data: poke} = await axios.get(baseURL+keyword);
            console.log(poke);

            for(let type of poke.types){
                console.log(type.type)
                //call another func for type analysis
                let {data} = await axios.get(type.type.url)
                console.log(data)
            }
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
